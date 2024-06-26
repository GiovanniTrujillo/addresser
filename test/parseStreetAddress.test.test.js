//@ts-check
import { describe, expect, it } from 'vitest';
import { Parsers } from '../index.js';


describe('#parseStreetAddress', ()=>{
    it('should parse a simple address', function() {
        var result = Parsers.parseStreetAddress("123 Main St");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse a street name with two words', function() {
        var result = Parsers.parseStreetAddress("123 Fat Duck St");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Fat Duck");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Fat Duck St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse a street address with double spaces', function() {
        var result = Parsers.parseStreetAddress("123 Main  St");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse a street address with zip code in standard format', function() {
        var result = Parsers.parseStreetAddress("123 Main  St");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse a street address with zip code plus four in standard format', function() {
        var result = Parsers.parseStreetAddress("123 Main  St");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse a street address with a state name', function() {
        var result = Parsers.parseStreetAddress("123 Main  St");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse a street address with a lowercase state name', function() {
        var result = Parsers.parseStreetAddress("123 Main  St");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse a street address with a lowercase state abbeviation', function() {
        var result = Parsers.parseStreetAddress("123 Main  St");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse a street address with a delimited zip code', function() {
        var result = Parsers.parseStreetAddress("123 Main  St");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });

    it('should validate input is not undefined', function() {
        expect(Parsers.parseStreetAddress.bind(Parsers.parseStreetAddress)).to.throw('Argument must be a non-empty string.');
    });
    it('should validate input is a non-empty string', function() {
        expect(Parsers.parseStreetAddress.bind(Parsers.parseStreetAddress, "")).to.throw('Argument must be a non-empty string.');
    });

    it('should parse an address with same street and city name', function() {
        var result = Parsers.parseStreetAddress("400 South Orange Ave");
        expect(result.streetNumber).to.equal("400");
        expect(result.streetName).to.equal("South Orange");
        expect(result.streetSuffix).to.equal("Ave");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("400 South Orange Ave");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse an address with no city delimiter', function() {
        var result = Parsers.parseStreetAddress("1301 Columbia College Drive");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Columbia College");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("1301 Columbia College Dr");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse an address with a secondary value on same section with city', function() {
        var result = Parsers.parseStreetAddress("1301 Columbia College Drive Unit 101");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Columbia College");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.addressLine1).to.equal("1301 Columbia College Dr");
        expect(result.addressLine2).to.equal("Unit 101");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
    });
    it('should parse an address with a secondary value on separate line', function() {
        var result = Parsers.parseStreetAddress("1301 Columbia College Drive, APT A");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Columbia College");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("1301 Columbia College Dr");
        expect(result.addressLine2).to.equal("APT A");
    });
    it('should parse an address with a glen plus haven suffix', function() {
        var result = Parsers.parseStreetAddress("1301 Glen Haven");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Glen");
        expect(result.streetSuffix).to.equal("Hvn");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("1301 Glen Hvn");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse an address with a direction following the street type', function() {
        var result = Parsers.parseStreetAddress("1301 Acme Street E");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Acme");
        expect(result.streetSuffix).to.equal("St");
        expect(result.streetDirection).to.equal("E");
        expect(result.addressLine1).to.equal("1301 Acme St E");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse an address with a lowercase direction following the street type', function() {
        var result = Parsers.parseStreetAddress("1301 Acme Street e");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Acme");
        expect(result.streetSuffix).to.equal("St");
        expect(result.streetDirection).to.equal("E");
        expect(result.addressLine1).to.equal("1301 Acme St E");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse an address with line 2 incorrectly placed before line 1', function() {
        var result = Parsers.parseStreetAddress("UNIT 101, 1301 Acme Street E");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Acme");
        expect(result.streetSuffix).to.equal("St");
        expect(result.streetDirection).to.equal("E");
        expect(result.addressLine1).to.equal("1301 Acme St E");
        expect(result.addressLine2).to.equal("UNIT 101");
    });
    it('should parse an address with secondary address at the beginning of line 1', function() {
        var result = Parsers.parseStreetAddress("UNIT 101, 1301 Acme Avenue");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Acme");
        expect(result.streetSuffix).to.equal("Ave");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("1301 Acme Ave");
        expect(result.addressLine2).to.equal("UNIT 101");
    });
    it('should parse an address with a trailing directional, all caps, and no delimiters', function() {
        var result = Parsers.parseStreetAddress("300 BOYLSTON ST E");
        expect(result.streetNumber).to.equal("300");
        expect(result.streetName).to.equal("Boylston");
        expect(result.streetSuffix).to.equal("St");
        expect(result.streetDirection).to.equal("E");
        expect(result.addressLine1).to.equal("300 Boylston St E");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });

    it('should parse an address with a trailing country', function() {
        var result = Parsers.parseStreetAddress("300 BOYLSTON AVE");
        expect(result.streetNumber).to.equal("300");
        expect(result.streetName).to.equal("Boylston");
        expect(result.streetSuffix).to.equal("Ave");
        expect(result.addressLine1).to.equal("300 Boylston Ave");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });

    it('should parse a valid address for a small city not in us-cities.json file', function() {
        var result = Parsers.parseStreetAddress("5555 Duffek Dr");
        expect(result.streetNumber).to.equal("5555");
        expect(result.streetName).to.equal("Duffek");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.addressLine1).to.equal("5555 Duffek Dr");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });

    it('should parse an address with a dot after street abbreviation', function() {
        var result = Parsers.parseStreetAddress("200 SUMMIT LAKE DR.");
        expect(result.streetNumber).to.equal("200");
        expect(result.streetName).to.equal("Summit Lake");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.addressLine1).to.equal("200 Summit Lake Dr");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });

    it('should parse an address with a newline separator', function() {
        var result = Parsers.parseStreetAddress("200 SUMMIT LAKE DR.\n");
        expect(result.streetNumber).to.equal("200");
        expect(result.streetName).to.equal("Summit Lake");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.addressLine1).to.equal("200 Summit Lake Dr");
        expect(result).to.not.have.property('addressLine2');
    });

    it('should parse an address with a PO BOX', function() {
        var result = Parsers.parseStreetAddress("PO BOX 538\n");
        expect(result.addressLine1).to.equal("PO BOX 538");
        expect(result).to.not.have.property('addressLine2');
        expect(result).to.not.have.property('streetNumber');
        expect(result).to.not.have.property('streetName');
        expect(result).to.not.have.property('streetSuffix');
    });

    it('should parse an address with a PO BOX written as P.O. DRAWER', function() {
        var result = Parsers.parseStreetAddress("P.O. DRAWER 538\n");
        expect(result.addressLine1).to.equal("P.O. DRAWER 538");
        expect(result).to.not.have.property('addressLine2');
        expect(result).to.not.have.property('streetNumber');
        expect(result).to.not.have.property('streetName');
        expect(result).to.not.have.property('streetSuffix');
    });

    it('should provide an id for a valid address', function() {
        var result = Parsers.parseStreetAddress("PO BOX 538\n");
        expect(result.addressLine1).to.equal("PO BOX 538");
        expect(result.addressLine2).toBeUndefined();
        expect(result.id).to.equal('PO-BOX-538');
    });
    
    it('should provide an id for a valid address with second address line', function() {
        var result = Parsers.parseStreetAddress("123 Main St Unit 101");
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.addressLine2).to.equal("Unit 101");
        expect(result.id).to.equal('123-Main-St,-Unit-101');
    });
    

    it('should parse a street address ending in pass', function() {
        var result = Parsers.parseStreetAddress("15001 Strathaven Pass");
        expect(result.streetNumber).to.equal("15001");
        expect(result.streetName).to.equal("Strathaven");
        expect(result.streetSuffix).to.equal("Pass");
        expect(result.addressLine1).to.equal("15001 Strathaven Pass");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    
    it('should parse a street address with "Ave C" style street name', function() {
        var result = Parsers.parseStreetAddress("826 N Ave C");
        expect(result.streetNumber).to.equal("826");
        expect(result.streetName).to.equal("N Ave C");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("826 N Ave C");
        expect(result).to.not.have.property('addressLine2');;
    });
    it('should parse a street address with "Avenue N" style street name', function() {
        var result = Parsers.parseStreetAddress("826 N Avenue N");
        expect(result.streetNumber).to.equal("826");
        expect(result.streetName).to.equal("N Ave N");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("826 N Ave N");
        expect(result).to.not.have.property('addressLine2');;
    });
    
    it('should parse a street address with "Ave. b" style street name', function() {
        var result = Parsers.parseStreetAddress("826 N Ave. b");
        expect(result.streetNumber).to.equal("826");
        expect(result.streetName).to.equal("N Ave B");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("826 N Ave B");
        expect(result).to.not.have.property('addressLine2');;
    });
    
    it('should parse a street address with "Ave. b" style street name with non delimited second address line', function() {
        var result = Parsers.parseStreetAddress("826 N Ave. b Unit 101");
        expect(result.streetNumber).to.equal("826");
        expect(result.streetName).to.equal("N Ave B");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("826 N Ave B");
        expect(result.addressLine2).to.equal("Unit 101");
    });
    
    it('should parse a street address without a normal suffix like 123 Texas Gold', function() {
        var result = Parsers.parseStreetAddress("12939 Texas Gold");
        expect(result.streetNumber).to.equal("12939");
        expect(result.streetName).to.equal("Texas Gold");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal('12939 Texas Gold');
        expect(result).to.not.have.property('addressLine2');;
    });
    
    it('should parse a street address without a normal suffix and 2nd address line like 123 Texas Gold Unit 101', function() {
        var result = Parsers.parseStreetAddress("12939 Texas Gold Unit 101");
        expect(result.streetNumber).to.equal("12939");
        expect(result.streetName).to.equal("Texas Gold");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("12939 Texas Gold");
        expect(result.addressLine2).to.equal("Unit 101");
    });
    
    it('should parse an Interstate address with a # unit', function() {
        var result = Parsers.parseStreetAddress("10701 S Interstate 35 # 35");
        expect(result.streetNumber).to.equal("10701");
        expect(result.streetName).to.equal("S Interstate 35");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("10701 S Interstate 35");
        expect(result.addressLine2).to.equal("# 35");
    });
    
    it('should parse FM number style road names', function() {
        var result = Parsers.parseStreetAddress("11434 W FM 471");
        expect(result.streetNumber).to.equal("11434");
        expect(result.streetName).to.equal("W FM 471");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("11434 W FM 471");
        expect(result).to.not.have.property("addressLine2");        
    });
    
    it('should parse street name ending in Oak', function() {
        var result = Parsers.parseStreetAddress("24330 Invitation Oak");
        expect(result.streetNumber).to.equal("24330");
        expect(result.streetName).to.equal("Invitation Oak");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("24330 Invitation Oak");
        expect(result).to.not.have.property("addressLine2");        
    });
    
    it('should parse street name thats just a number', function() {
        var result = Parsers.parseStreetAddress("506 W 1100");
        expect(result.streetNumber).to.equal("506");
        expect(result.streetName).to.equal("W 1100");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("506 W 1100");
        expect(result).to.not.have.property("addressLine2");        
    });

    it('should parse street name that ends in Run', function() {
        var result = Parsers.parseStreetAddress("25403 Longbranch Run");
        expect(result.streetNumber).to.equal("25403");
        expect(result.streetName).to.equal("Longbranch Run");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("25403 Longbranch Run");
        expect(result).to.not.have.property("addressLine2");        
    });
    
    it('should parse street name that ends in Chase', function() {
        var result = Parsers.parseStreetAddress("22923 Cardigan Chase");
        expect(result.streetNumber).to.equal("22923");
        expect(result.streetName).to.equal("Cardigan Chase");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("22923 Cardigan Chase");
        expect(result).to.not.have.property("addressLine2");        
    });
    
    it('should parse street name that ends in Chase', function() {
        var result = Parsers.parseStreetAddress("7114 Sunny Day");
        expect(result.streetNumber).to.equal("7114");
        expect(result.streetName).to.equal("Sunny Day");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("7114 Sunny Day");
        expect(result).to.not.have.property("addressLine2");        
    });
    
    it('should parse street name that has a leading directional and is just a number', function() {
        var result = Parsers.parseStreetAddress("110 N 2500");
        expect(result.streetNumber).to.equal("110");
        expect(result.streetName).to.equal("N 2500");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("110 N 2500");
        expect(result).to.not.have.property("addressLine2");        
    });
    
    it('should parse "123 Rue Dauphine style address', function() {
        var result = Parsers.parseStreetAddress("625 Rue Dauphine");
        expect(result.streetNumber).to.equal("625");
        expect(result.streetName).to.equal("Rue Dauphine");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("625 Rue Dauphine");
        expect(result).to.not.have.property("addressLine2");        
    });

    it('should parse "67A Alameda De Las Pulgas style address', function() {
        var result = Parsers.parseStreetAddress("67A Alameda De Las Pulgas");
        expect(result.streetNumber).to.equal("67A");
        expect(result.streetName).to.equal("Alameda De Las Pulgas");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("67A Alameda De Las Pulgas");
        expect(result).to.not.have.property("addressLine2");        
    });

    it('should parse "630A Pinellas Bwy S Apt 3202 style address', function() {
        var result = Parsers.parseStreetAddress("630A Pinellas Bwy S Apt 3202");
        expect(result.streetNumber).to.equal("630A");
        expect(result.streetName).to.equal("Pinellas Bwy S");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("630A Pinellas Bwy S");
        expect(result.addressLine2).to.equal("Apt 3202");       
    });

    it('should parse "24497A Tupelo Sr style address', function() {
        var result = Parsers.parseStreetAddress("24497A Tupelo Sr");
        expect(result.streetNumber).to.equal("24497A");
        expect(result.streetName).to.equal("Tupelo Sr");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("24497A Tupelo Sr");
        expect(result).to.not.have.property("addressLine2");      
    });

    it('should parse North Chesterfield city address with Turn suffix', function() {
        var result = Parsers.parseStreetAddress("1300 Providence Ridge Turn");
        expect(result.streetNumber).to.equal("1300");
        expect(result.streetName).to.equal("Providence Ridge");
        expect(result.streetSuffix).to.equal("Turn");
        expect(result.addressLine1).to.equal("1300 Providence Ridge Turn");
        expect(result).to.not.have.property("addressLine2");        
    });

    it('should parse North Chesterfield city address with Apartment line 2', function() {
        var result = Parsers.parseStreetAddress("5210 Castlewood Rd Apt E");
        expect(result.streetNumber).to.equal("5210");
        expect(result.streetName).to.equal("Castlewood");
        expect(result.streetSuffix).to.equal("Rd");
        expect(result.addressLine1).to.equal("5210 Castlewood Rd");
        expect(result.addressLine2).to.equal("Apt E");       
    });

    it('should parse Oberlin city address', function() {
        var result = Parsers.parseStreetAddress("186 N Harrisburg St Apt 3");
        expect(result.streetNumber).to.equal("186");
        expect(result.streetName).to.equal("N Harrisburg");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("186 N Harrisburg St");
        expect(result.addressLine2).to.equal("Apt 3");        
    });

    it('should parse West Reading city address', function() {
        var result = Parsers.parseStreetAddress("400 Franklin St Apt 205");
        expect(result.streetNumber).to.equal("400");
        expect(result.streetName).to.equal("Franklin");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("400 Franklin St");
        expect(result.addressLine2).to.equal("Apt 205");        
    });

    it('should parse West Pittston city address', function() {
        var result = Parsers.parseStreetAddress("315 Salem St Apt A");
        expect(result.streetNumber).to.equal("315");
        expect(result.streetName).to.equal("Salem");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("315 Salem St");
        expect(result.addressLine2).to.equal("Apt A");        
    });

    it('should parse Steelton city address', function() {
        var result = Parsers.parseStreetAddress("485 State St Apt B");
        expect(result.streetNumber).to.equal("485");
        expect(result.streetName).to.equal("State");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("485 State St");
        expect(result.addressLine2).to.equal("Apt B");        
    });

    it('should parse East Cambridge city address', function() {
        var result = Parsers.parseStreetAddress("11 Bristol St Apt 2");
        expect(result.streetNumber).to.equal("11");
        expect(result.streetName).to.equal("Bristol");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("11 Bristol St");
        expect(result.addressLine2).to.equal("Apt 2");        
    });

    it('should parse a South Chesterfield city address', function() {
        var result = Parsers.parseStreetAddress("19917 Oakland Ave Unit 1");
        expect(result.streetNumber).to.equal("19917");
        expect(result.streetName).to.equal("Oakland");
        expect(result.streetSuffix).to.equal("Ave");
        expect(result.addressLine1).to.equal("19917 Oakland Ave");
        expect(result.addressLine2).to.equal("Unit 1");        
    });

    it('should parse a East Rochester city address', function() {
        var result = Parsers.parseStreetAddress("802 Spruce St Unit A");
        expect(result.streetNumber).to.equal("802");
        expect(result.streetName).to.equal("Spruce");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("802 Spruce St");
        expect(result.addressLine2).to.equal("Unit A");        
    });
    
    
    it('should parse a Spring Lake Park city address', function() {
        var result = Parsers.parseStreetAddress("8070 Central Ave NE Unit 8070-206");
        expect(result.streetNumber).to.equal("8070");
        expect(result.streetName).to.equal("Central");
        expect(result.streetSuffix).to.equal("Ave");
        expect(result.addressLine1).to.equal("8070 Central Ave NE");
        expect(result.addressLine2).to.equal("Unit 8070-206");        
    });
    
    
    it('should parse street name of N Portola with unit name', function() {
        var result = Parsers.parseStreetAddress("47 N Portola, # 35");
        expect(result.streetNumber).to.equal("47");
        expect(result.streetName).to.equal("N Portola");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("47 N Portola");
        expect(result.addressLine2).to.equal("# 35");
    });
    
    it('should parse a street name with no suffix but the street name itself matches a suffix', function() {
        var result = Parsers.parseStreetAddress("1010 PINE, 9E-6-01\n");
        expect(result.streetNumber).to.equal("1010");
        expect(result.streetName).to.equal("Pine");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("1010 Pine");
        expect(result.addressLine2).to.equal("9E-6-01");
    });
    
    it('should return a formattedAddress field', function() {
        var result = Parsers.parseStreetAddress("12939 Texas Gold");
        expect(result.streetNumber).to.equal("12939");
        expect(result.streetName).to.equal("Texas Gold");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("12939 Texas Gold");
        expect(result).to.not.have.property('addressLine2')
        expect(result.formattedAddress).to.equal("12939 Texas Gold");
    });
    
    it('should return a formattedAddress field when a second address line is provided', function() {
        var result = Parsers.parseStreetAddress("12939 Live Oak Street Unit 101");
        expect(result.streetNumber).to.equal("12939");
        expect(result.streetName).to.equal("Live Oak");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("12939 Live Oak St");
        expect(result.addressLine2).to.equal("Unit 101");
        expect(result.formattedAddress).to.equal("12939 Live Oak St, Unit 101");
    });
    
    it('should parse a simple Canadian Address without zip Code', function() {
        var result = Parsers.parseStreetAddress("123 Main St");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    
    it('should parse a simple Canadian Address with zip Code', function() {
        var result = Parsers.parseStreetAddress("123 Main St");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
    it('should parse a simple Canadian Address with Trailing Country', function() {
        var result = Parsers.parseStreetAddress("123 Main St");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
    });
})