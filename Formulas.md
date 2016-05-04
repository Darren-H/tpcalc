biz-commute-emissions.js

      Functions
         annual_miles
      
         Formula:
            
            annual_miles = number_of_employees * roundTripMiles * 250
            
            
      emmisionsByGas
      
         co2
            mtCO2
            
               kgCO2perPassMi(car) = 0.391555556
               car = annual_miles(car) * kgCO2perPassMi(car) * 0.01
               
               kgCO2perPassMi(train) = 0.163
               train = annual_miles(train) * kgCO2perPassMi(train) * 0.01

               kgCO2perPassMi(bus) = 0.107
               bus = annual_miles(bus) * kgCO2perPassMi(bus) * 0.01

               kgCO2perPassMi(taxi) = 0.23
               taxi = annual_miles(taxi) * kgCO2perPassMi(taxi) * 0.01

               kgCO2perPassMi(walk) = 0
               walk = annual_miles(walk) * kgCO2perPassMi(walk) * 0.01

               kgCO2perPassMi(ferry) = 0.11516/0.621371
               ferry = annual_miles(ferry) * kgCO2perPassMi(ferry) * 0.01
            
         ch4
            gCH4
               car = annual_miles(car) * car.gCH4perPassMi
               train = annual_miles(train) * train.gCH4perPassMi
               bus = annual_miles(bus) * bus.gCH4perPassMi
               taxi = annual_miles(taxi) * taxi.gCH4perPassMi
               walk = annual_miles(walk) * walk.gCH4perPassMi
               ferry = annual_miles(ferry) * ferry.gCH4perPassMi
               car = annual_miles(car) * car.gCH4perPassMi   
            
         n2o
            gN2O
               car = annual_miles(car) * car.gN2OperPassMi
               train = annual_miles(train) * train.gN2OperPassMi
               bus = annual_miles(bus) * bus.gN2OperPassMi
               taxi = annual_miles(taxi) * taxi.gN2OperPassMi
               walk = annual_miles(walk) * walk.gN2OperPassMi
               ferry = annual_miles(ferry) * ferry.gN2OperPassMi
               car = annual_miles(car) * car.gN2OperPassMi   
               
      totalEmissions
         
         see: emmisionsByGas for co2, ch4 and n2o
         
         CO2e
            car = miles as mtCO2 + (gCH4.car * mtCH4toCO2e + gN2O.car * mtN2OtoCO2e ) / 1000 / 1000
            train = miles as mtCO2 + (gCH4.train * mtCH4toCO2e + gN2O.train * mtN2OtoCO2e ) / 1000 / 1000
            bus = miles as mtCO2 + (gCH4.bus * mtCH4toCO2e + gN2O.bus * mtN2OtoCO2e ) / 1000 / 1000
            taxi = miles as mtCO2 + (gCH4.taxi * mtCH4toCO2e + gN2O.taxi * mtN2OtoCO2e ) / 1000 / 1000
            walk = miles as mtCO2 + (gCH4.walk * mtCH4toCO2e + gN2O.walk * mtN2OtoCO2e ) / 1000 / 1000
            ferry = miles as mtCO2 + (gCH4.ferry * mtCH4toCO2e + gN2O.ferry * mtN2OtoCO2e ) / 1000 / 1000 
         
         
biz-fleet-emissions.js

      variables
      
         boatGallons : 	1,

         fuelEconomy.car = 23.5;
         fuelEconomy.truck = 25;
         fuelEconomy.deliverytruck = 7.3;
         fuelEconomy.semi = 5.8;
         fuelEconomy.boat = 0;
         fuelEconomy.ecar = 95;

         kgCO2pergal.gasoline = 8.81;
         kgCO2pergal.diesel = 10.15;
         kgCO2pergal.bioDieselB20 = 8.12;
         kgCO2pergal.bioDieselB100 = 0;
         kgCO2pergal.cng = 5.99;
         kgCO2pergal.e85 = 1.3215;

         gCH4permile.gasoline = 0.0704;
         gCH4permile.diesel = 0.0006;
         gCH4permile.bioDieselB20 = 0.0006;
         gCH4permile.bioDieselB100 = 0.0006;
         gCH4permile.cng = 0.737;
         gCH4permile.e85 = 0.0704;

         gN2Opermile.gasoline = 0.0647;
         gN2Opermile.diesel = 0.0012;
         gN2Opermile.bioDieselB20 = 0.0012;
         gN2Opermile.bioDieselB100 = 0.0012;
         gN2Opermile.cng = 0.05;
         gN2Opermile.e85 = 0.0647;

         milesPerGallon.car = 23.5;
         milesPerGallon.truck = 25;
         milesPerGallon.deliverytruck = 7.3;
         milesPerGallon.semi = 	5.8;
         
         
      gallonsUsed
      
         When the vehicle type is 'boat'
         
            boatGallons = 1;
            gallons = boatGallons;

         When the vehicle type is not 'boat'
            gallons = annual_miles / vehicle_fuelEconomy; // varies by Vehicle Type
    

      emissionsByGas - Function

         gallonsUsed = gallonsUsed(vehicleType);
         kgCO2pergal = fleetFactors.kgCO2pergal;
         gCH4permile = fleetFactors.gCH4permile(vehicleType);
         gN2Opermile = fleetFactors.gN2Opermile(vehicleType);
         annual_miles	= annual_miles;

         gasoline = gallonsUsed * kgCO2pergal.gasoline * 0.001;
         diesel = gallonsUsed * kgCO2pergal.diesel * 0.001;
         bioDieselB20 = gallonsUsed * kgCO2pergal.bioDieselB20 * 0.001;
         bioDieselB100 = gallonsUsed * kgCO2pergal.bioDieselB100 * 0.001;
         cng = gallonsUsed * kgCO2pergal.cng * 0.001;
         e85 = gallonsUsed * kgCO2pergal.e85 * 0.001;

         gasoline = annual_miles * gCH4permile.gasoline;
         diesel = annual_miles * gCH4permile.diesel;
         bioDieselB20 = annual_miles * gCH4permile.bioDieselB20;
         bioDieselB100 = annual_miles * gCH4permile.bioDieselB100;
         cng = annual_miles * gCH4permile.cng;
         e85 = annual_miles * gCH4permile.e85;

         gasoline = annual_miles * gN2Opermile.gasoline;
         diesel = annual_miles * gN2Opermile.diesel;
         bioDieselB20 = annual_miles * gN2Opermile.bioDieselB20;
         bioDieselB100 = annual_miles * gN2Opermile.bioDieselB100;
         cng = annual_miles * gN2Opermile.cng;
         e85 = annual_miles * gN2Opermile.e85;

         
      boatEmissionsByGas - Function

         factors = fleetFactors;
         gallons = boatGallons;
         kgCO2pergal = factors.kgCO2pergal;
         gCH4pergal = factors.gCH4pergal;
         gN2Opergal = factors.gN2Opergal;

         mtCO2.gasoline = gallons * factors.kgCO2pergal.gasoline / 1000;
         mtCO2.diesel = gallons * factors.kgCO2pergal.diesel / 1000;
         mtCO2.residualFuelOil = gallons * factors.kgCO2pergal.residualFuelOil / 1000;

         gCH4.gasoline = gallons * factors.gCH4pergal.gasoline;
         gCH4.diesel = gallons * factors.gCH4pergal.diesel;
         gCH4.residualFuelOil = gallons * factors.gCH4pergal.residualFuelOil;

         gN2O.gasoline = gallons * factors.gN2Opergal.gasoline;
         gN2O.diesel = gallons * factors.gN2Opergal.diesel;
         gN2O.residualFuelOil = gallons * factors.gN2Opergal.residualFuelOil;

      totalBoatEmissions - Function

         mtCO2 = boatEmissionsByGas('mtCO2');
         gCH4 = boatEmissionsByGas('gCH4');
         gN2O = boatEmissionsByGas('gN2O');
         
         CO2e.gasoline = (mtCO2.gasoline + ( gCH4.gasoline*mtCH4toCO2e + gN2O.gasoline*mtN2OtoCO2e ) / 1000 / 1000);
         
         CO2e.diesel = (mtCO2.diesel + ( gCH4.diesel*mtCH4toCO2e + gN2O.diesel*mtN2OtoCO2e )/ 1000 / 1000);
         
         CO2e.residualFuelOil = (mtCO2.residualFuelOil + ( gCH4.residualFuelOil*mtCH4toCO2e + gN2O.residualFuelOil * mtN2OtoCO2e ) / 1000 / 1000 )

            
      totalEcarEmissions - Function

         annual_miles = annual_miles;
         mpge = 	vehicle.fuelEconomy('ecar');
         zipCode = zipCode;
         vehicles =	vehicleCount;
         total = vehicles * ((annual_miles / mpge) * gasGallonEquiv * egridSubregionGas(zipSubregion(zipCode).egridSubregion).CO2e / 1000);
      

      totalEmissions - Function

         For ecars - see totalEcarEmissions Function
         
         For boat - see totalBoatEmissiions and totalEcarEmissions Functions
      
         mtCO2 	= emissionsByGas(vehicleType).mtCO2;
         gCH4 	= emissionsByGas(vehicleType).gCH4;
         gN2O 	= emissionsByGas(vehicleType).gN2O;

         CO2e.gasoline = vehicleCount * (mtCO2.gasoline + ( gCH4.gasoline * mtCH4toCO2e + gN2O.gasoline * mtN2OtoCO2e) / 1000 / 1000);
         CO2e.diesel = vehicleCount * (mtCO2.diesel + ( gCH4.diesel * mtCH4toCO2e + CO2e.gN2O.diesel * mtN2OtoCO2e ) / 1000 / 1000);
         CO2e.bioDieselB20 = vehicleCount * (mtCO2.bioDieselB20 + ( gCH4.bioDieselB20 * mtCH4toCO2e + gN2O.bioDieselB20 * mtN2OtoCO2e ) / 1000 / 1000);
         CO2e.bioDieselB100 = vehicleCount * (mtCO2.bioDieselB100 + ( gCH4.bioDieselB100 * mtCH4toCO2e + gN2O.bioDieselB100 * mtN2OtoCO2e ) / 1000 / 1000);
         CO2e.cng = vehicleCount * (mtCO2.cng + ( gCH4.cng*mtCH4toCO2e + gN2O.cng*mtN2OtoCO2e ) / 1000 / 1000);
         CO2e.e85 = vehicleCount * (mtCO2.e85 + ( gCH4.e85*mtCH4toCO2e + gN2O.e85*mtN2OtoCO2e ) / 1000 / 1000);
      
biz-server-emissions
    
      functions
      
         annUsage = number_of_servers * avgServerLoad * 24 * 365 / 1000
         
         totalEmissions = annual_usage * egridSubregionGas * 0.001;
         The details of egridSubregionGas can be found in the egridSubregion spreadsheet.
         The egridSubregion is calculated using a zipcode through zipSubregion.
         
         
biz-shipping-emissions

         air.factor =  1.527;  // kg CO2 per ton-mile
         air.shipments = 0;
         air.miles =   0;    // Miles
         air.pounds =  0;   // Pounds

         truck.factor =  0.297;  // kg CO2 per ton-mile
         truck.shipments = 0;
         truck.miles =   0;  // Miles
         truck.pounds =  0; // Pounds

         train.factor =  0.0252;   // kg CO2 per ton-mile
         train.shipments = 0;
         train.miles =   0;  // Miles
         train.pounds =  0; // Pounds

      
         air =     (air.factor * air.pounds/2000 * air.shipments * air.miles) / 1000 / 2204.6,
         truck =   (truck.factor * truck.pounds/2000 * truck.shipments * truck.miles) / 1000 / 2204.6,
         train =   (train.factor * train.pounds/2000 * train.shipments * train.miles) / 1000 / 2204.6
         
         
biz-siteemissions

      DEFAULT zipCode = 94105

      variables
 
         fuel.electricity.amount = 	0;
         fuel.electricity.units = 	'kwh';
         fuel.electricity.interval = 	'month';
         fuel.electricity.method = 	'energy';


         fuel.naturalGas.amount = 	0;
         fuel.naturalGas.units = 	'kcf';
         fuel.naturalGas.interval = 	'month';
         fuel.naturalGas.method = 	'energy';


         fuel.heatingOil.amount = 	0;
         fuel.heatingOil.units = 	'gallons';
         fuel.heatingOil.interval = 	'month';
         fuel.heatingOil.method = 	'energy';


         fuel.propane.amount = 	0;
         fuel.propane.units = 	'gallons';
         fuel.propane.interval = 	'month';
         fuel.propane.method = 	'energy';

         fuel.gasoline.amount = 	0;
         fuel.gasoline.units = 	'gallons';
         fuel.gasoline.interval = 	'month';
         fuel.gasoline.method = 	'energy';

         fuel.diesel.amount = 	0;
         fuel.diesel.units = 	'gallons';
         fuel.diesel.interval = 	'month';
         fuel.diesel.method = 	'energy';


      methodTypes = (
            'energy',  	// When the user uses an energy unit
            'dollars'	// When the user uses money as a measurement
         ),

      fuelTypes = (
            'electricity',
            'naturalgas',
            'heatingoil',
            'propane',
            'gasoline',
            'diesel'
         ),

      unitTypes = (
            'kwh',
            'therms',
            'mcf',
            'ccf',
            'mmbtu',
            'gallons',
            'lbs'
         ),

      functions
      
         residentialCost

            electricity = homeEnergyPrices.electricity(state(zipCode)) / 100;
            naturalGas = homeEnergyPrices.naturalGas(state(zipCode));
            heatingOil = homeEnergyPrices.heatingOil;
            propane = homeEnergyPrices.propane;
            gasoline = homeEnergyPrices.gasoline;
            diesel = homeEnergyPrices.diesel;
            

      annualUsageByEnergy - Function
         monthMultiplier - if users are entering annual figures, this is 1, if they are entering monthly figures this is 12;
         

            Electricity Usage
               usage = (fuel.amount * monthMultiplier);
               
            Natural Gas Usage
               usage = fuel.amount * monthMultiplier * standardCubicFeet(fuel.units)/1000; // Convert to kcf from scf

             Heating Oil Usage
               usage = (fuel.amount * monthMultiplier);

            Propane Usage
               usage = (fuel.amount * monthMultiplier);

            Gasoline Usage
               usage = (fuel.amount * monthMultiplier);
            
            Diesel Usage
               usage = (fuel.amount * monthMultiplier);

            default:
               usage = 0;


      Function - annualUsageByDollars

         monthMultiplier - if users are entering annual figures, this is 1, if they are entering monthly figures this is 12;

         The cost variable comes from the residentialCost function.
         
         usage = amount / cost * monthMultiplier;
         
      homeEnergyFactors Function.

         electricity.CO2 = oSubregion.CO2 / 2.20462 / 1000
         electricity.CH4 = oSubregion.CH4 / 2.20462
         electricity.N2O = oSubregion.N2O / 2.20462

         naturalGas.CO2  = 53.38; 	// kg/kcf
         naturalGas.CH4  = 4.76;	// g/kcf
         naturalGas.N2O  = .10; 	// g/kcf

         heatingOil.CO2  = 10.15; 	// kg/gal
         heatingOil.CH4  = 1.46; 	// g/gal
         heatingOil.N2O  = .09;		// g/gal

         propane.CO2  = 5.79; 	// kg/gal
         propane.CH4  = .48;	// g/gal
         propane.N2O  = .01; 	// g/gal

         gasoline.CO2  = 8.81; 	// kg/gal
         gasoline.CH4  = 1.20; 	// g/gal
         gasoline.N2O  = .07; 	// g/gal

         diesel.CO2  = 10.15; 	// kg/gal
         diesel.CH4  = 1.46; 	// g/gal
         diesel.N2O  = .09;		// g/gal

      homeEmissionsByGas Function.

         factors comes from the homeEnergyFactors above
         
            electricity.CO2 = factors.electricity.CO2 * annualUsage('electricity') / 1000;
            electricity.CH4 = factors.electricity.CH4 * annualUsage('electricity');
            electricity.N2O = factors.electricity.N2O * annualUsage('electricity');

            naturalGas.CO2 = factors.naturalGas.CO2 * annualUsage('naturalGas') / 1000;
            naturalGas.CH4 = factors.naturalGas.CH4 * annualUsage('naturalGas');
            naturalGas.N2O = factors.naturalGas.N2O * annualUsage('naturalGas');

            heatingOil.CO2 = factors.heatingOil.CO2 * annualUsage('heatingOil') / 1000;
            heatingOil.CH4 = factors.heatingOil.CH4 * annualUsage('heatingOil');
            heatingOil.N2O = factors.heatingOil.N2O * annualUsage('heatingOil');

            propane.CO2 = factors.propane.CO2 * annualUsage('propane') / 1000;
            propane.CH4 = factors.propane.CH4 * annualUsage('propane');
            propane.N2O = factors.propane.N2O * annualUsage('propane');

            gasoline.CO2 = factors.gasoline.CO2 * annualUsage('gasoline') / 1000;
            gasoline.CH4 = factors.gasoline.CH4 * annualUsage('gasoline');
            gasoline.N2O = factors.gasoline.N2O * annualUsage('gasoline');

            diesel.CO2 = factors.diesel.CO2 * annualUsage('diesel') / 1000;
            diesel.CH4 = factors.diesel.CH4 * annualUsage('diesel');
            diesel.N2O = factors.diesel.N2O * annualUsage('diesel');

               
      totalEmissions Function.

         homeEmissions comes from the homeEmissionsByGas function.
         
         eElectricity, eNaturalGas, eHeatingOil, ePropane, eGasoline and eDiesel come from homeEmmissions.

         electricity = eElectricity.CO2 + ( eElectricity.CH4 * mtCH4toCO2e + eElectricity.N2O * mtN2OtoCO2e )/ 1000 / 1000;
         naturalGas = eNaturalGas.CO2 + ( eNaturalGas.CH4 * mtCH4toCO2e + eNaturalGas.N2O * mtN2OtoCO2e ) / 1000 / 1000;
         heatingOil = eHeatingOil.CO2 + ( eHeatingOil.CH4 * mtCH4toCO2e + eHeatingOil.N2O * mtN2OtoCO2e ) / 1000 / 1000;
         propane = ePropane.CO2 + ( ePropane.CH4 * mtCH4toCO2e + ePropane.N2O * mtN2OtoCO2e ) / 1000 / 1000;
         gasoline = eGasoline.CO2 + ( eGasoline.CH4 * mtCH4toCO2e + eGasoline.N2O * mtN2OtoCO2e ) / 1000 / 1000;
         diesel = eDiesel.CO2 + ( eDiesel.CH4 * mtCH4toCO2e + eDiesel.N2O * mtN2OtoCO2e ) / 1000 / 1000;
      
      
biz-travel-emissions
      Functions
      

      flightannual_miles - Function

            Annual Miles by Flight Percent
               shortHaul = oShortHaul.percent / 100 * annual_miles;
               medHaul = oMedHaul.percent / 100 * annual_miles;
               longHaul = oLongHaul.percent / 100 * annual_miles;

            Annual Miles By Flight Miles
               shortHaul = employees * oShortHaul.annual_miles;
               medHaul = employees * oMedHaul.annual_miles;
               longHaul = employees * oLongHaul.annual_miles;

            Annual Miles by Flight Count
               miletokm = 0.621371 // 1 mile = 0.621371 km
               shortHaul = oShortHaul.staffFlights * 2 * oShortHaul.km * miletokm;
               medHaul = oMedHaul.staffFlights * 2 * oMedHaul.km * miletokm;
               longHaul = oLongHaul.staffFlights * 2 * oLongHaul.km * miletokm;

                  
      totalEmissions - Function

         shortHaulPassMi =  0.27594301
         medHaulPassMi = 	0.156106416
         longHaulPassMi = 	0.182161704

            When calculated by Flight Miles or Flight Percent
            
               rfi = 2.7 // The refractive forcing index. Used with flight calculations
               CO2e.shortHaul = flightannual_miles('shortHaul') * fShortHaul / 1000 * rfi;
               CO2e.medHaul = flightannual_miles('medHaul') * fMedHaul / 1000 * rfi;
               CO2e.longHaul = flightannual_miles('longHaul') * fLongHaul / 1000 * rfi;
         
            When calculated by Fuel

               CO2e.jetFuel = fuel.jetFuel * transportFactors.jetFuel / 1000;
               CO2e.aviationGas = fuel.aviationGas * transportFactors.aviationGas / 1000;
               
            When calculated by Itinerary
                  itinerary = itinerary.annual_miles * transportFactors.defaultFactor / 1000;
         
evt-bottles-emmisions
      
      factor = 82.8; // g CO2/water bottlke
      
      CO2e = count * factor / 1000 / 1000;

evt-ground-emmissions

      Mileage = attendees * oneWayMileage * 2;

      Emissions By Gas

            
         kgCO2perPassMi = 0.391555556
         mtCO2.car = mileage('car') * kgCO2perPassMi * .001
         
         kgCO2perPassMi = 0.163
         mtCO2.train = mileage('train') * kgCO2perPassMi * .001
         
         kgCO2perPassMi = 0.107
         mtCO2.bus = mileage('bus') * kgCO2perPassMi * .001
         
         kgCO2perPassMi = 0.23
         mtCO2.taxi = mileage('taxi') * kgCO2perPassMi * .001
         
         kgCO2perPassMi = 0.11516 / 0.621371
         mtCO2.ferry = mileage('ferry') * kgCO2perPassMi * .001

         
         gCH4perPassMi = 0.0147
         gCH4.car = mileage('car') * gCH4perPassMi
         
         kgCO2perPassMi = 0.004
         train = mileage('train') * gCH4perPassMi
         
         kgCO2perPassMi = 0.0006
         gCH4.bus = mileage('bus') * gCH4perPassMi
         
         kgCO2perPassMi = 0.02
         gCH4.taxi = mileage('taxi') * gCH4perPassMi
         
         kgCO2perPassMi = 0
         gCH4.ferry = mileage('ferry') * gCH4perPassMi

         
         gN2OperPassMi = 0.0079
         gN20.car = mileage('car') * gN2OperPassMi
         
         gN2OperPassMi = 0.002
         gN20.train = mileage('train') * gN2OperPassMi
         
         gN2OperPassMi = 0.0005
         gN20.bus = mileage('bus') * gN2OperPassMi
         
         gN2OperPassMi = 0.021
         gN20.taxi = mileage('taxi') * gN2OperPassMi
         
         gN2OperPassMi = 0
         gN20.ferry = mileage('ferry') * gN2OperPassMi

               
         mtCH4toCO2e = 21; // 1 mt CH4 = 21 mt CO2e
         mtN2OtoCO2e = 310; // 1 mt N2O = 310 mt CO2e

         mtCO2 = 2086.208002368;
         gCH4 = 78.3216;
         gN2O = 42.0912;
         
         car = mtCO2 + (gCH4 * mtCH4toCO2e + gN2O * mtN2OtoCO2e ) / 1000 / 1000;
         
         train = mtCO2 + (gCH4 * mtCH4toCO2e + gN2O * mtN2OtoCO2e ) / 1000 / 1000;
         
         bus = mtCO2 + (gCH4 * mtCH4toCO2e + gN2O * mtN2OtoCO2e ) / 1000 / 1000;
         
         taxi = mtCO2 + (gCH4 * mtCH4toCO2e + gN2O * mtN2OtoCO2e ) / 1000 / 1000;
         
         ferry = mtCO2 + (gCH4 * mtCH4toCO2e + gN2O * mtN2OtoCO2e ) / 1000 / 1000;
         
evt-hotel-emissions

      electricity - Function // kWh/room

         kwhRoom = CBECSelectricity * aveRoomSize / kwhtobtu * 1000 / 365;

      gas - Function // btu/room

         btuRoom = CBECSgas * 1000 * aveRoomSize / 365;


      egridSubregion - Function
         See: egridSubregion spreadsheet
      
      electricityFactor 
         factor = egridSubregionGas(egridSubregion(zip));


      totalEmissions - Function

         gasFactor = 0.055;
         elect, eFactor, gas are loaded from the functions above.

         CO2e = attendees * aveNights * 0.001 * ( elec * eFactor.CO2e + gas * gasFactor * 0.001);
      
evt-meals-emissions


      totalEmissions - Function
         factors.vegetarian = 3.54; // lb CO2e
         factors.omnivorous = 5.27; // lb CO2e

         veggie = totalMeals * percentVeggie / 100 * factors.vegetarian;
         omnivorous = totalMeals * (100 - percentVeggie) / 100 * factors.omnivorous;
         lbCO2e = veggie + omnivorous;
         mtCO2e = lbCO2e / 2204.6;

      
      
evt-travel-emissions

      Defaults
         averageMiles = 0
         attendees = 1
         flightDuration 1
               
            rfi = 2.7 // The refractive forcing index. Used with flight calculations
            
            // Units: kg/Passenger Mile
            shortHaulPassMi =  0.27594301
            medHaulPassMi = 	0.156106416
            longHaulPassMi = 	0.182161704

         Mileage
            miletokm = 0.621371 // 1 mile = 0.621371 km
            
            
         Total Emissions
            
            METHOD 'flightDuration'
               
               Short Haul
                  mileage('shortHaul') * shortHaulPassMi / 1000 * rfi
                  
               Medium Haul
                  mileage('medHaul') * medHaulPassMi / 1000 * rfi
                  
               Long Haul
                  mileage('longHaul') * longHaulPassMi / 1000 * rfi
         
             METHOD 'averageDistance':
               CO2e = mileage * shortHaulPassMi / 1000 * rfi;

evt-venue-emissions

      
     Defaults
        zipCode = 94111;
        venueSize = 500;  // square feet
        days = 2;
        CBECSGreenE = 0.049;

     electricityFactor - Function

       factor = egridSubregionGas(egridSubregion(zip));

       gasFactor = 0.055;

     totalEmissions - Function

      CO2e = (venueSize * days * electricityFactor(zipCode).CO2e * CBECSGreenE) / 2204.6;

     
   home-energy-prices

      DEFAULTS
      
      naturalGas
      // State averages - 12/2012 thru 11/2013
      // units: 	Dollars per Thousand Cubic Feet, except where noted)
      // source: 	http://www.eia.gov/dnav/ng/ng_pri_sum_a_EPG0_PRS_DMcf_m.htm
         AL = 18.11;
         AK = 8.94;
         AZ = 16.67;
         AR = 13.4;
         CA = 10.12;
         CO = 9.38;
         CT = 14.63;
         DE = 17;
         DC = 14.08;
         FL = 19.5;
         GA = 18.21;
         HI = 49.23;
         ID = 8.57;
         IL = 10.63;
         IN = 10.6;
         IA = 10.59;
         KS = 13.23;
         KY = 13.28;
         LA = 12.32;
         ME = 15.89;
         MD = 14.16;
         MA = 14.14;
         MI = 10.46;
         MN = 9.53;
         MS = 10.28;
         MO = 15.16;
         MT = 9.12;
         NE = 10.76;
         NV = 10.76;
         NH = 15.59;
         NJ = 12.03;
         NM = 10.97;
         NY = 14.94;
         NC = 16.33;
         ND = 9.5;
         OH = 13.77;
         OK = 14.58;
         OR = 11.65;
         PA = 14.19;
         RI = 15.64;
         SC = 18.55;
         SD = 9.84;
         TN = 11.69;
         TX = 12.15;
         UT = 9.12;
         VT = 18.12;
         VA = 14.22;
         WA = 12.23;
         WV = 12.27;
         WI = 9.65;
         WY = 10.28;
         noneSpecified = 12.21

      electricity
      // State averages on 2/2013
      // units= 	TOTAL ELECTRIC POWER INDUSTRY AVERAGE REVENUE PER KILOWATTHOUR BY STATE (cents per kilowatthour)
      // source= 	http=//www.eia.gov/electricity/monthly/update/resources/data/february2013_emu.zip
         AK = 15.85;
         AL = 8.81;
         AR = 7.13;
         AZ = 8.7;
         CA = 12.69;
         CO = 8.81;
         CT = 15.6;
         DC = 11.97;
         DE = 10.81;
         FL = 10.54;
         GA = 8.8;
         HI = 33.61;
         IA = 7.08;
         ID = 6.61;
         IL = 8.63;
         IN = 8.17;
         KS = 8.83;
         KY = 6.97;
         LA = 6.94;
         MA = 14.07;
         MD = 11.36;
         ME = 12.42;
         MI = 10.56;
         MN = 8.61;
         MO = 7.53;
         MS = 8.55;
         MT = 8.12;
         NC = 8.97;
         ND = 7.52;
         NE = 7.78;
         NH = 14.33;
         NJ = 13.61;
         NM = 8.5;
         NV = 8.63;
         NY = 14.41;
         OH = 8.75;
         OK = 7.49;
         OR = 8.3;
         PA = 10.08;
         RI = 13.77;
         SC = 8.81;
         SD = 8.12;
         TN = 8.88;
         TX = 8.71;
         UT = 7.31;
         VA = 9.19;
         VT = 14.4;
         WA = 7.07;
         WI = 10.23;
         WV = 8.21;
         WY = 7.15;

      heatingOil = 4.08767;
      // U.S. Average: 	Weekly Heating Oil - 2/11/2013 thru 3/18/2013
      // units: 			Dollars per Gallon Excluding Taxes
      // source:			http://www.eia.gov/dnav/pet/pet_pri_wfr_a_epd2f_prs_dpgal_w.htm


      propane = 2.4885;
      // U.S. Average: 	Weekly Heating Propane Prices - 2/11/2013 thru 3/18/2013
      // units: 			Dollars per Gallon Excluding Taxes
      // source: 			http://www.eia.gov/dnav/pet/pet_pri_wfr_a_EPLLPA_PRS_dpgal_w.htm


      gasoline = 3.49;
      // U.S. Average: 	Regular Motor Gasoline, All Areas, Retail Price - 1/2013 thru 1/2014
      // units: 			Dollars per Gallon Including Taxes
      // source: 			http://www.eia.gov/petroleum/data.cfm#prices


      diesel = 3.49;
      // U.S. Average: 	On-Highway Diesel Fuel Price - 1/2013 thru 1/2014
      // units: 			Dollars per Gallon Including Taxes
      // source: 			http://www.eia.gov/petroleum/data.cfm#prices

   }



ind-air-emmissions

      flightannual_miles - Function
            
            When users enter annual miles the values are used as entered.

            When users enter the Flight Count method the following calculations are used:
            
               miletokm = 0.621371 // 1 mile = 0.621371 km
               
               
               
               annual_miles.shortHaul = ShortHaul.annual_flights * 2 * ShortHaul.km * miletokm;
               annual_miles.medEcon = MedEcon.annual_flights * 2 * MedEcon.km * miletokm;
               annual_miles.medFirst = MedFirst.annual_flights * 2 * MedFirst.km * miletokm;
               annual_miles.longEcon = LongEcon.annual_flights * 2 * LongEcon.km * miletokm;
               annual_miles.longEconPlus = LongEconPlus.annual_flights * 2 * LongEconPlus.km * miletokm;
               annual_miles.longBusiness = LongBusiness.annual_flights * 2 * LongBusiness.km * miletokm;
               annual_miles.longFirst = LongFirst.annual_flights * 2 * LongFirst.km * miletokm;

      totalEmissions - Function
         
            fShortHaul = transportFactors.shortHaul / miletokm;
            fMedEcon = transportFactors.medEcon / miletokm;
            fMedFirst = transportFactors.medFirst / miletokm;
            fLongEcon = transportFactors.longEcon / miletokm;
            fLongEconPlus = transportFactors.longEconPlus / miletokm;
            fLongBusiness = transportFactors.longBusiness / miletokm;
            fLongFirst = transportFactors.longFirst / miletokm;

         switch(calculateBy) {
            
            rfi = 2.7 // The refractive forcing index. Used with flight calculations
            
            Calculating by Flight Miles and Flight Count

               CO2e.shortHaul = flightannual_miles('shortHaul') * fShortHaul / 1000 * rfi;
               CO2e.medEcon = flightannual_miles('medEcon') * fMedEcon / 1000 * rfi;
               CO2e.medFirst = flightannual_miles('medFirst') * fMedFirst / 1000 * rfi;
               CO2e.longEcon = flightannual_miles('longEcon') * fLongEcon / 1000 * rfi;
               CO2e.longEconPlus = flightannual_miles('longEconPlus') * fLongEconPlus / 1000 * rfi;
               CO2e.longBusiness = flightannual_miles('longBusiness') * fLongBusiness / 1000 * rfi;
               CO2e.longFirst = flightannual_miles('longFirst') * fLongFirst / 1000 * rfi;
            
            Calculating by Fuel

               CO2e.jetFuel = fuel.jetFuel * transportFactors.jetFuel / 1000 * rfi;
               CO2e.aviationGas = fuel.aviationGas * transportFactors.aviationGas / 1000 * rfi;

            Calculating by Itinerary

               CO2e.itinerary : 	itinerary.annual_miles / miletokm * transportFactors.defaultFactor / 1000 * rfi

ind-home-emmissions

      residentialCost - Function
      
            cost.electricity = homeEnergyPrices.electricity(state(zipCode)) / 100;
            cost.naturalGas = homeEnergyPrices.naturalGas(state(zipCode));
            cost.heatingOil = homeEnergyPrices.heatingOil;
            cost.propane = homeEnergyPrices.propane;
            cost.gasoline = homeEnergyPrices.gasoline;
            cost.diesel = homeEnergyPrices.diesel;

      annualUsage - Function
         See the annualUsageByDollars Function and the annualUsageByEnergy Function

         annualUsageByEnergy - function

            electricity.usage = (fuel.amount * monthMultiplier);
            
            naturalgas.usage = fuel.amount * monthMultiplier * standardCubicFeet(fuel.units)/1000; // Convert to kcf from scf

            heatingoil.usage = (fuel.amount * monthMultiplier);
            
            propane.usage = (fuel.amount * monthMultiplier);

            gasoline.usage = (fuel.amount * monthMultiplier);
            
            diesel.usage = (fuel.amount * monthMultiplier);

         annualUsageByDollars - Function

            cost = result of the residentialCost function.
            usage =  amount / cost(fuelType) * monthMultiplier;

      homeEnergyFactors - Function

         oSubregion - See Spreadheet

         electricity.CO2 = oSubregion.CO2 / 2.20462 / 1000;
         electricity.CH4 = oSubregion.CH4 / 2.20462;
         electricity.N2O = oSubregion.N2O / 2.20462;

         naturalGas.CO2 = 53.38; 	// kg/kcf
         naturalGas.CH4 = 4.76;	// g/kcf
         naturalGas.N2O = .10; 	// g/kcf

         heatingOil.CO2 = 10.15; 	// kg/gal
         heatingOil.CH4 = 1.46;	// g/gal
         heatingOil.N2O = .09;		// g/gal

         propane.CO2 = 5.79; 	// kg/gal
         propane.CH4 = .48;	// g/gal
         propane.N2O = .01; 	// g/gal

         gasoline.CO2 = 8.81; 	// kg/gal
         gasoline.CH4 = 1.20; 	// g/gal
         gasoline.N2O = .07; 	// g/gal

         diesel.CO2 = 10.15; 	// kg/gal
         diesel.CH4 = 1.46; 	// g/gal
         diesel.N2O = .09;		// g/gal

      homeEmissionsByGas - Function

         factors = see homeEnergyFactors Function
         annualUsage = see annualUsage Function
         
         electricity.CO2 = factors.electricity.CO2 * annualUsage('electricity') / 1000;
         electricity.CH4 = factors.electricity.CH4 * annualUsage('electricity');
         electricity.N2O = factors.electricity.N2O * annualUsage('electricity');

         naturalGas.CO2 = factors.naturalGas.CO2 * annualUsage('naturalGas') / 1000;
         naturalGas.CH4 = factors.naturalGas.CH4 * annualUsage('naturalGas');
         naturalGas.N2O = factors.naturalGas.N2O * annualUsage('naturalGas');

         heatingOil.CO2 = factors.heatingOil.CO2 * annualUsage('heatingOil') / 1000;
         heatingOil.CH4 = factors.heatingOil.CH4 * annualUsage('heatingOil');
         heatingOil.N2O = factors.heatingOil.N2O * annualUsage('heatingOil');

         propane.CO2 = factors.propane.CO2 * annualUsage('propane') / 1000;
         propane.CH4 = factors.propane.CH4 * annualUsage('propane');
         propane.N2O = factors.propane.N2O * annualUsage('propane');

         gasoline.CO2 = factors.gasoline.CO2 * annualUsage('gasoline') / 1000;
         gasoline.CH4 = factors.gasoline.CH4 * annualUsage('gasoline');
         gasoline.N2O = factors.gasoline.N2O * annualUsage('gasoline');

         diesel.CO2 = factors.diesel.CO2 * annualUsage('diesel') / 1000;
         diesel.CH4 = factors.diesel.CH4 * annualUsage('diesel');
         diesel.N2O = factors.diesel.N2O * annualUsage('diesel');

      totalEmissions - Function

         homeEmissions = See homeEmissionsByGas Function

         eElectricity = homeEmissions.electricity;
         eNaturalGas =  homeEmissions.naturalGas;
         eHeatingOil = homeEmissions.heatingOil;
         ePropane = homeEmissions.propane;
         eGasoline = homeEmissions.gasoline;
         eDiesel = homeEmissions.diesel;

         mtCH4toCO2e = 21; // 1 mt CH4 = 21 mt CO2e
         mtN2OtoCO2e = 310; // 1 mt N2O = 310 mt CO2e

         electricity = Electricity.CO2 + ( eElectricity.CH4 * mtCH4toCO2e + eElectricity.N2O * mtN2OtoCO2e ) / 1000 / 1000;
         natural_gas = NaturalGas.CO2 + ( eNaturalGas.CH4 * mtCH4toCO2e + eNaturalGas.N2O * mtN2OtoCO2e ) / 1000 / 1000;
         heating_oil = HeatingOil.CO2 + ( eHeatingOil.CH4 * mtCH4toCO2e + eHeatingOil.N2O * mtN2OtoCO2e ) / 1000 / 1000;
         propane = Propane.CO2 + ( ePropane.CH4 * mtCH4toCO2e + ePropane.N2O * mtN2OtoCO2e ) / 1000 / 1000;
         gasoline = Gasoline.CO2 + ( eGasoline.CH4 * .mtCH4toCO2e + eGasoline.N2O * mtN2OtoCO2e ) / 1000 / 1000;
         diesel = Diesel.CO2 + ( eDiesel.CH4 * mtCH4toCO2e + eDiesel.N2O * mtN2OtoCO2e ) / 1000 / 1000;

      
ind-transit-emmissions


      annual_miles - Function

         Calculating by week
            annual_miles = 50 * oMethod.milesPer;

         Calculating by month
            annual_miles = 12 * oMethod.milesPer;
            
         Calculating by Year
            annual_miles = oMethod.milesPer;

      emissionsByGas - Function

         mtCO2.train = 	transit.annual_miles('train') * fTrain.kgCO2perPassMi * .001;
         mtCO2.bus = transit.annual_miles('bus') * fBus.kgCO2perPassMi * .001;
         mtCO2.taxi = transit.annual_miles('taxi') * fTaxi.kgCO2perPassMi * .001;
         mtCO2.ferry = 	transit.annual_miles('ferry') * fFerry.kgCO2perPassMi * .001;

         gCH4.train = 	transit.annual_miles('train') * fTrain.gCH4perPassMi;
         gCH4.bus = transit.annual_miles('bus') * fBus.gCH4perPassMi;
         gCH4.taxi = transit.annual_miles('taxi') * fTaxi.gCH4perPassMi;
         gCH4.ferry = 	transit.annual_miles('ferry') * fFerry.gCH4perPassMi;

         gN2O.train = 	transit.annual_miles('train') * fTrain.gN2OperPassMi;
         gN2O.bus = transit.annual_miles('bus') * fBus.gN2OperPassMi;
         gN2O.taxi = transit.annual_miles('taxi') * fTaxi.gN2OperPassMi;
         gN2O.ferry = 	transit.annual_miles('ferry') * fFerry.gN2OperPassMi;

      totalEmissions - Function
      
         CO2e.train = mtCO2.train + (gCH4.train * mtCH4toCO2e + gN2O.train * mtN2OtoCO2e ) / 1000 / 1000;
         CO2e.bus = mtCO2.bus + (gCH4.bus * mtCH4toCO2e + gN2O.bus * mtN2OtoCO2e ) / 1000 / 1000;
         CO2e.taxi = mtCO2.taxi + (gCH4.taxi * mtCH4toCO2e + gN2O.taxi * mtN2OtoCO2e ) / 1000 / 1000;
         CO2e.ferry = mtCO2.ferry + (gCH4.ferry * mtCH4toCO2e + gN2O.ferry * mtN2OtoCO2e ) / 1000 / 1000;

ind-vehicle-emissions

         car.annual_miles.gasoline = 10000;
         car.annual_miles.diesel = 10000;
         car.annual_miles.bioDieselB20 = 10000;
         car.annual_miles.bioDieselB100 = 10000;
         car.annual_miles.cng = 10000;
         car.annual_miles.e85 = 10000;

         car.fuelEconomy.gasoline = 23.5;
         car.fuelEconomy.diesel = 23.5;
         car.fuelEconomy.bioDieselB20 = 23.5;
         car.fuelEconomy.bioDieselB100 = 23.5;
         car.fuelEconomy.cng = 23.5;
         car.fuelEconomy.e85 = 23.5;

         boat.annGallons = 500;
         boat.fuel = 'diesel';

         ecar.annual_miles = 5000;
         ecar.mpge = 95;
         ecar.zipCode = 94710;
      
      factors - Function

         gCH4permile_gasoline = that.gasolineFactors.gCH4permile(year,vehicleClass);
         gN2Opermile_gasoline = that.gasolineFactors.gN2Opermile(year,vehicleClass);
         gCH4permile_diesel = that.dieselFactors.gCH4permile(year,vehicleClass);
         gN2Opermile_diesel = that.dieselFactors.gN2Opermile(year,vehicleClass);

         kgCO2pergal.gasoline = 8.81;
         kgCO2pergal.diesel = 10.15;
         kgCO2pergal.bioDieselB20 = 8.12;
         kgCO2pergal.bioDieselB100 = 0;
         kgCO2pergal.cng = 5.99;
         kgCO2pergal.e85 = 1.3215;
         kgCO2pergal.residualFuelOil = 0.3;


         gCH4permile.gasoline = gCH4permile_gasoline;
         gCH4permile.diesel = gCH4permile_diesel;
         gCH4permile.bioDieselB20 = gCH4permile_diesel;
         gCH4permile.bioDieselB100 = gCH4permile_diesel;
         gCH4permile.cng = 0.737;
         gCH4permile.e85 = gCH4permile_gasoline;


         gN2Opermile.gasoline = gN2Opermile_gasoline;
         gN2Opermile.diesel = gN2Opermile_diesel;
         gN2Opermile.bioDieselB20 = gN2Opermile_diesel;
         gN2Opermile.bioDieselB100 = gN2Opermile_diesel;
         gN2Opermile.cng = 0.05;
         gN2Opermile.e85 = gN2Opermile_gasoline

         gCH4pergal.gasoline = 0.64;
         gCH4pergal.diesel = 0.74;
         gCH4pergal.residualFuelOil = 0.86

         gN2Opergal.gasoline = 0.22;
         gN2Opergal.diesel = 0.26;
         gN2Opergal.residualFuelOil = 0.3

           
     gasolineFactors 
       
       gCH4permile - Function


           When the user selects Car

             CH4
               '1900' : 0.0704,
               '1993' : 0.0704,
               '1994' : 0.0531,
               '1995' : 0.0358,
               '1996' : 0.0272,
               '1997' : 0.0268,
               '1998' : 0.0249,
               '1999' : 0.0216,
               '2000' : 0.0178,
               '2001' : 0.011,
               '2002' : 0.0107,
               '2003' : 0.0114,
               '2004' : 0.0145,
               '2005' : 0.0147,

           When the user selects Truck, van or SUV

             CH4
               '1900' : 0.0813,
               '1993' : 0.0813,
               '1994' : 0.0646,
               '1995' : 0.0517,
               '1996' : 0.0452,
               '1997' : 0.0452,
               '1998' : 0.0391,
               '1999' : 0.0321,
               '2000' : 0.0346,
               '2001' : 0.0151,
               '2002' : 0.0178,
               '2003' : 0.0155,
               '2004' : 0.0152,
               '2005' : 0.0157,
               
           When the user selects motorcycle
             CH4 = .07

       gN2Opermile - Function

         vehicleClass = ( vehicleClass == undefined ) ? 'car' : vehicleClass;
         year = ( year * 1 < 1993 ) ? '1993' : year;
         year = ( year * 1 > 2005 ) ? '2005' : year;

           When the user selects Car

             CH4
               '1900' : 0.0647,
               '1993' : 0.0647,
               '1994' : 0.056,
               '1995' : 0.0473,
               '1996' : 0.0426,
               '1997' : 0.0422,
               '1998' : 0.0393,
               '1999' : 0.0337,
               '2000' : 0.0273,
               '2001' : 0.0158,
               '2002' : 0.0153,
               '2003' : 0.0135,
               '2004' : 0.0083,
               '2005' : 0.0079

           When the user selects Truck, van or SUV

             CH4            
               '1900' : 0.1035,
               '1993' : 0.1035,
               '1994' : 0.0982,
               '1995' : 0.0908,
               '1996' : 0.0871,
               '1997' : 0.0871,
               '1998' : 0.0728,
               '1999' : 0.0564,
               '2000' : 0.0621,
               '2001' : 0.0164,
               '2002' : 0.0228,
               '2003' : 0.0114,
               '2004' : 0.0132,
               '2005' : 0.0101

            When the user selects motorcycle
               CH4 =  .007;
               
     dieselFactors
       
       gCH4permile Function

           When the user selects Car
             CH4
               early : .0006,
               middle : .0005,
               recent : .0005,

           When the user selects Truck, van, SUV or motorcycle
             CH4 
               early : .0011,
               middle : .0009,
               recent : .001,
             
       
       gN2Opermile - Function


           When the user selects Car
             N2O
               early : .0012,
               middle : .001,
               recent : .001,

           When the user selects Truck, van, SUV or motorcycle
             N2O
               early : .0017,
               middle : .0014,
               recent : .0015,


      carGallonsUsed - Function

         gallons.gasoline = car.annual_miles.gasoline / car.fuelEconomy.gasoline;
         gallons.diesel = car.annual_miles.diesel / car.fuelEconomy.diesel;
         gallons.bioDieselB20 - car.annual_miles.bioDieselB20 / car.fuelEconomy.bioDieselB20;
         gallons.bioDieselB100 = car.annual_miles.bioDieselB100 / car.fuelEconomy.bioDieselB100;
         gallons.cng = car.annual_miles.cng / car.fuelEconomy.cng;
         gallons.e85 = car.annual_miles.e85 / car.fuelEconomy.e85;

      carEmissionsByGas Function

       gallonsUsed = See carGallonsUsed Function;
       factors = See factors Function
       kgCO2pergal = factors.kgCO2pergal;
       gCH4permile = factors.gCH4permile;
       gN2Opermile = factors.gN2Opermile;
       annual_miles  = car.annual_miles;


       mtCO2.gasoline = gallonsUsed.gasoline * kgCO2pergal.gasoline * 0.001;
       mtCO2.diesel = gallonsUsed.diesel * kgCO2pergal.diesel * 0.001;
       mtCO2.bioDieselB20 = gallonsUsed.bioDieselB20 * kgCO2pergal.bioDieselB20 * 0.001;
       mtCO2.bioDieselB100 = gallonsUsed.bioDieselB100 * kgCO2pergal.bioDieselB100 * 0.001;
       mtCO2.cng = gallonsUsed.cng * kgCO2pergal.cng * 0.001;
       mtCO2.e85 = gallonsUsed.e85 * kgCO2pergal.e85 * 0.001;

       gCH4.gasoline = annual_miles.gasoline * gCH4permile.gasoline * 0.001;
       gCH4.diesel = annual_miles.diesel * gCH4permile.diesel * 0.001;
       gCH4.bioDieselB20 = annual_miles.bioDieselB20 * gCH4permile.bioDieselB20 * 0.001;
       gCH4.bioDieselB100 = annual_miles.bioDieselB100 * gCH4permile.bioDieselB100 * 0.001;
       gCH4.cng = annual_miles.cng * gCH4permile.cng * 0.001;
       gCH4.e85 = annual_miles.e85 * gCH4permile.e85 * 0.001;

       gN2O.gasoline = annual_miles.gasoline * gN2Opermile.gasoline * 0.001;
       gN2O.diesel = annual_miles.diesel * gN2Opermile.diesel * 0.001;
       gN2O.bioDieselB20 = annual_miles.bioDieselB20 * gN2Opermile.bioDieselB20 * 0.001;
       gN2O.bioDieselB100 = annual_miles.bioDieselB100 * gN2Opermile.bioDieselB100 * 0.001;
       gN2O.cng = annual_miles.cng * gN2Opermile.cng * 0.001;
       gN2O.e85 = annual_miles.e85 * gN2Opermile.e85 * 0.001;

     boatEmissionsByGas - Function

         factors - See factors Function;
         boat = boat;
         fuel  = boat.fuel;
         kgCO2pergal = factors.kgCO2pergal;
         gCH4pergal = factors.gCH4pergal;
         gN2Opergal = factors.gN2Opergal;

         mtCO2.gasoline = boat.annGallons * kgCO2pergal.gasoline / 1000;
         mtCO2.diesel = boat.annGallons * kgCO2pergal.diesel / 1000;
         mtCO2.residualFuelOil =   boat.annGallons * kgCO2pergal.residualFuelOil / 1000;

         gCH4.gasoline = boat.annGallons * gCH4pergal.gasoline;
         gCH4.diesel = boat.annGallons * gCH4pergal.diesel;
         gCH4.residualFuelOil = boat.annGallons * gCH4pergal.residualFuelOil;

         gN2O.gasoline = boat.annGallons * gN2Opergal.gasoline;
         gN2O.diesel = boat.annGallons * gN2Opergal.diesel;
         gN2O.residualFuelOil = boat.annGallons * gN2Opergal.residualFuelOil;

     totalEmissions - Function

         If the user selects a Car, Motorcycle, Truck, SUV or Van see the totalCarEmissions  Function

         If the user selects a boat see the totalBoatEmissions Function
         
         If the user selects ecar see the totalEcarEmissions Function


      totalCarEmissions - Function
      
         mtCO2   = carEmissionsByGas('CO2');
         gCH4  = carEmissionsByGas('CH4');
         gN2O  = carEmissionsByGas('N2O');
       
         CO2e.gasoline = mtCO2.gasoline + ( gCH4.gasoline * mtCH4toCO2e + gN2O.gasoline * mtN2OtoCO2e ) / 1000;
         CO2e.diesel = mtCO2.diesel + ( gCH4.diesel * mtCH4toCO2e + gN2O.diesel * mtN2OtoCO2e ) / 1000;
         CO2e.bioDieselB20 = mtCO2.bioDieselB20 + ( gCH4.bioDieselB20 * mtCH4toCO2e + gN2O.bioDieselB20 * mtN2OtoCO2e ) / 1000;
         CO2e.bioDieselB100 = mtCO2.bioDieselB100 + ( gCH4.bioDieselB100 * mtCH4toCO2e + gN2O.bioDieselB100 * mtN2OtoCO2e ) / 1000;
         CO2e.cng = mtCO2.cng + ( gCH4.cng * mtCH4toCO2e + gN2O.cng * mtN2OtoCO2e ) / 1000;
         CO2e.e85 = mtCO2.e85 + ( gCH4.e85 * mtCH4toCO2e + gN2O.e85 * mtN2OtoCO2e ) / 1000;

     totalBoatEmissions - Function

       mtCO2     = See boatEmissionsByGas Function
       gCH4    = See boatEmissionsByGas Function
       gN2O    = See boatEmissionsByGas Function
       boatFuel  = boat.fuel;

         CO2e.gasoline = mtCO2.gasoline + ( gCH4.gasoline * mtCH4toCO2e + gN2O.gasoline * mtN2OtoCO2e ) / 1000 / 1000;
         CO2e.diesel = mtCO2.diesel + ( gCH4.diesel * mtCH4toCO2e + gN2O.diesel * mtN2OtoCO2e ) / 1000 / 1000;
         CO2e.residualFuelOil = mtCO2.residualFuelOil + ( gCH4.residualFuelOil * mtCH4toCO2e + gN2O.residualFuelOil * mtN2OtoCO2e ) / 1000 / 1000;

     totalEcarEmissions - Function

       mpge = ecar.mpge;
       zipCode = ecar.zipCode;
       total = (annual_miles / mpge) * gasGallonEquiv * egridSubregionGas(zipSubregion(zipCode).egridSubregion).CO2e / 1000;
