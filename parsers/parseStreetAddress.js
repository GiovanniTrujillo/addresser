//@ts-check
import allStates from '../data/states.json';
import {usStreetTypes} from '../data/us-street-types.js';
import allCities from '../data/cities.json';
import { usLine2Prefixes } from '../data/us-line2-prefixes.js';
import { usStreetDirectional } from '../data/us-street-directional.js';

import { Helpers as H } from '../utils/dataHelpers.js';
/**
 * @typedef  {{
* zipCode?: string,
* zipCodePlusFour?: string,
* stateAbbreviation?: string,
* stateName?: string,
* placeName?: string,
* addressLine2?: string,
* addressLine1: string,
* streetNumber: string,
* streetName: string,
* streetDirection?: string,
* streetSuffix?: string,
* formattedAddress: string,
* id: string,
* }} ParsedAddress
*/

/**
 * 
 * @param {*} address 
 * @returns 
 */
export function parseAddress(address){
    // Validate a non-empty string was passed
    if (!address) {
      throw 'Argument must be a non-empty string.';
    }
    // Deal with any repeated spaces
    address = address.replace(/  +/g, ' ');
    // Assume comma, newline and tab is an intentional delimiter
    var addressParts = address.split(/,|\t|\n/);
    /**@type {ParsedAddress} */
    var result = {};

    /**Allow no country selected */

    // Check if the last section contains country reference (Just supports US for now)
    var countrySection = addressParts[addressParts.length-1].trim();
    if (countrySection === 'US' || countrySection === 'USA' || countrySection === 'United States' || countrySection === 'Canada') {
      addressParts.splice(-1,1);
    }

    /**DONT ASSUME LAST PART HAS STATE/ZIP */


    // Assume the last address section contains state, zip or both
    var stateString = addressParts[addressParts.length-1].trim();
    // Parse and remove zip or zip plus 4 from end of string
    if (stateString.match(/\d{5}$/)) {
      result.zipCode = stateString.match(/\d{5}$/)[0];
      stateString = stateString.substring(0, stateString.length - 5).trim();
    } else if (stateString.match(/\d{5}-\d{4}$/)) {
      var zipString = stateString.match(/\d{5}-\d{4}$/)[0];
      result.zipCode = zipString.substring(0,5);
      result.zipCodePlusFour = zipString;
      stateString = stateString.substring(0, stateString.length - 10).trim();
    } else if(stateString.match(/[A-Z]\d[A-Z] ?\d[A-Z]\d/)){
      result.zipCode = stateString.match(/[A-Z]\d[A-Z] ?\d[A-Z]\d/)[0];
      stateString = stateString.substring(0, stateString.length - result.zipCode.length).trim();
    }


    // Parse and remove state
    if (stateString.length > 0) { // Check if anything is left of last section
      addressParts[addressParts.length-1] = stateString;
    } else {
      addressParts.splice(-1,1);
      stateString = addressParts[addressParts.length-1].trim();
    }
    // First check for just an Abbreviation
    if (stateString.length == 2 && H.getKeyByValue(allStates,stateString.toUpperCase())) {
      result.stateAbbreviation = stateString.toUpperCase();
      result.stateName = H.toTitleCase(H.getKeyByValue(allStates,stateString.toUpperCase()));
      stateString = stateString.substring(0, stateString.length - 2);
    } else {
      // Next check if the state string ends in state name or abbeviation
      // (state abbreviation must be preceded by a space to ensure accuracy)
      for (var key in allStates) {
        var re = new RegExp(" " + allStates[key] + "$|" + key + "$", "i");
        if (stateString.match(re)) {
          stateString = stateString.replace(re,"");
          result.stateAbbreviation = allStates[key];
          result.stateName = H.toTitleCase(key);
          break;
        }
      }
    }
    if (!result.stateAbbreviation || result.stateAbbreviation.length != 2) {
      throw 'Can not parse address. State not found.';
    }

    // Parse and remove city/place name
    var placeString = "";
    if (stateString.length > 0) { // Check if anything is left of last section
      addressParts[addressParts.length-1] = stateString;
      placeString = addressParts[addressParts.length-1];
    } else {
      addressParts.splice(-1,1);
      placeString = addressParts[addressParts.length-1].trim();
    }
    result.placeName = "";

    allCities[result.stateAbbreviation].some(function(element) {
      var re = new RegExp(element + "$", "i");
      if (placeString.match(re)) {
        placeString = placeString.replace(re,""); // Carve off the place name
        
        result.placeName = element;
        return element; // Found a winner - stop looking for cities
      }
    });
    if (!result.placeName) {
      result.placeName = H.toTitleCase(placeString);
      placeString = "";
    }



    /**** STREET ADDRESS SECTION  ******/




    // Parse the street data
    var streetString = "";
    var usStreetDirectionalString = Object.keys(usStreetDirectional).map(x => usStreetDirectional[x]).join('|');
    var usLine2String = Object.keys(usLine2Prefixes).join('|');

    if (placeString.length > 0) { // Check if anything is left of last section
      addressParts[addressParts.length-1] = placeString;
    } else {
      addressParts.splice(-1,1);
    }

    if (addressParts.length > 2) {
      throw 'Can not parse address. More than two address lines.';
    } else if (addressParts.length === 2) {
      // check if the secondary data is first
      var re = new RegExp('^(' + usLine2String + ')\\b','i');
      if (addressParts[0].match(re)) {
        var tmpString = addressParts[1];
        addressParts[1] = addressParts[0];
        addressParts[0] = tmpString;
      }
      //Assume street line is first
      result.addressLine2 = addressParts[1].trim();
      addressParts.splice(-1,1);
    }
    if (addressParts.length === 1) {
      streetString = addressParts[0].trim();
      // If no address line 2 exists check to see if it is incorrectly placed at the front of line 1
      if (typeof result.addressLine2 === "undefined") {
        var re = new RegExp('^(' + usLine2String + ')\\s\\S+','i');
        if (streetString.match(re)) {
          result.addressLine2 = streetString.match(re)[0];
          streetString = streetString.replace(re,"").trim(); // Carve off the line 2 data
        }
      }
      //Assume street address comes first and the rest is secondary address
      var reStreet = new RegExp('\.\*\\b(?:' + 
        Object.keys(usStreetTypes).join('|') + ')\\b\\.?' + 
        '( +(?:' + usStreetDirectionalString + ')\\b)?', 'i');
      var rePO = new RegExp('(P\\.?O\\.?|POST\\s+OFFICE)\\s+(BOX|DRAWER)\\s\\w+', 'i');
      var reAveLetter = new RegExp('\.\*\\b(ave.?|avenue)\.\*\\b[a-zA-Z]\\b', 'i');
      var reNoSuffix = new RegExp('\\b\\d+[a-z]?\\s[a-zA-Z0-9_ ]+\\b', 'i');
      if (streetString.match(reAveLetter)) {
        result.addressLine1 = streetString.match(reAveLetter)[0];
        streetString = streetString.replace(reAveLetter,"").trim(); // Carve off the first address line
        if (streetString && streetString.length > 0) {
          // Check if line2 data was already parsed
          if (result.hasOwnProperty('addressLine2') && result.addressLine2.length > 0) {
            throw 'Can not parse address. Too many address lines. Input string: ' + address;
          } else {
            result.addressLine2 = streetString;
          }
        }
        
        var streetParts = result.addressLine1.split(' ');

        // Assume type is last and number is first   
        result.streetNumber = streetParts[0]; // Assume number is first element

        // Normalize to Ave
        streetParts[streetParts.length-2] = streetParts[streetParts.length-2].replace(/^(ave.?|avenue)$/i, 'Ave');

        //result.streetSuffix = H.toTitleCase(usStreetTypes[streetParts[streetParts.length-1].toLowerCase()]);
        result.streetName = streetParts[1]; // Assume street name is everything in the middle
        for (var i = 2; i <= streetParts.length-1; i++) {
          result.streetName = result.streetName + " " + streetParts[i];
        }
        result.streetName = H.toTitleCase(result.streetName);
        result.addressLine1 = [result.streetNumber, result.streetName].join(" ");
      } else if (streetString.match(reStreet)) {
        result.addressLine1 = streetString.match(reStreet)[0];
        streetString = streetString.replace(reStreet,"").trim(); // Carve off the first address line
        if (streetString && streetString.length > 0) {
          // Check if line2 data was already parsed
          if (result.hasOwnProperty('addressLine2') && result.addressLine2.length > 0) {
            throw 'Can not parse address. Too many address lines. Input string: ' + address;
          } else {
            result.addressLine2 = streetString;
          }
        }
        var streetParts = result.addressLine1.split(' ');

        // Check if directional is last element
        var re = new RegExp('\.\*\\b(?:' + usStreetDirectionalString + ')$', 'i');
        if (result.addressLine1.match(re)) {
          result.streetDirection = streetParts.pop().toUpperCase();
        }
        
        // Assume type is last and number is first   
        result.streetNumber = streetParts[0]; // Assume number is first element
        
        // If there are only 2 street parts (number and name) then its likely missing a "real" suffix and the street name just happened to match a suffix
        if (streetParts.length > 2) {
          // Remove '.' if it follows streetSuffix
          streetParts[streetParts.length-1] = streetParts[streetParts.length-1].replace(/\.$/, '');
          result.streetSuffix = H.toTitleCase(usStreetTypes[streetParts[streetParts.length-1].toLowerCase()]);
        }
        
        result.streetName = streetParts[1]; // Assume street name is everything in the middle
        for (var i = 2; i < streetParts.length-1; i++) {
          result.streetName = result.streetName + " " + streetParts[i];
        }
        result.streetName = H.toTitleCase(result.streetName);
        result.addressLine1 = [result.streetNumber, result.streetName].join(" ");
        
        if (result.hasOwnProperty('streetSuffix')) {
          result.addressLine1 = result.addressLine1 + ' ' + result.streetSuffix;
        }
        if (result.streetDirection) {
          result.addressLine1 = result.addressLine1 + ' ' + result.streetDirection;
        }
      } else if (streetString.match(rePO)) {
        result.addressLine1 = streetString.match(rePO)[0];
        streetString = streetString.replace(rePO,"").trim(); // Carve off the first address line
      } else if (streetString.match(reNoSuffix)) {
        // Check for a line2 prefix followed by a single word. If found peel that off as addressLine2
        var reLine2 = new RegExp('\\s(' + usLine2String + ')\\.?\\s[a-zA-Z0-9_\-]+$','i');
        if (streetString.match(reLine2)) {
          result.addressLine2 = streetString.match(reLine2)[0].trim();
          streetString = streetString.replace(reLine2,"").trim(); // Carve off the first address line
        }
        
        result.addressLine1 = streetString.match(reNoSuffix)[0];
        streetString = streetString.replace(reNoSuffix,"").trim(); // Carve off the first address line
        var streetParts = result.addressLine1.split(' ');

        // Assume type is last and number is first   
        result.streetNumber = streetParts[0]; // Assume number is first element
        streetParts.shift(); // Remove the first element
        result.streetName = streetParts.join(' '); // Assume street name is everything else
      } else {
        throw 'Can not parse address. Invalid street address data. Input string: ' + address;
      }
    } else {
      throw 'Can not parse address. Invalid street address data. Input string: ' + address;
    }

    var addressString = result.addressLine1;
    if (result.hasOwnProperty('addressLine2')) {
      addressString += ', ' + result.addressLine2;
    }
    if (addressString && result.hasOwnProperty("placeName") && result.hasOwnProperty("stateAbbreviation") && result.hasOwnProperty("zipCode")) {
      var idString = addressString + ", " + result.placeName + ", " + result.stateAbbreviation + " " + result.zipCode;
      result['formattedAddress'] = idString;
      result['id'] = encodeURI(idString.replace(/ /g, '-').replace(/\#/g, '-').replace(/\//g, '-').replace(/\./g, '-'));
    }
      
    return result;
}