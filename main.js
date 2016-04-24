/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

var mraa = require('mraa'); 
var request = require('request');

var myOnboardLedRed = new mraa.Gpio(4);
myOnboardLedRed.dir(mraa.DIR_OUT);

var myOnboardSound = new mraa.Gpio(8);
myOnboardSound.dir(mraa.DIR_OUT);

var myOnboardLedBlue = new mraa.Gpio(3);
myOnboardLedBlue.dir(mraa.DIR_OUT); 






//function periodicActivity()
//{
//  myOnboardLedRed.write(ledState? 1:0);//if ledState is true then write a '1' (high) otherwise write a '0' (low)
//  myOnboardLedBlue.write(ledState? 1:0);
//  myOnboardSound.write(ledState? 1:0);    
//  ledState = !ledState; //invert the ledState
//  setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)  
//    
//}

"use strict";

var B = 3975;
var currentTemp;
var mraa = require("mraa");

//GROVE Kit A0 Connector --> Aio(0)
var myAnalogPin = new mraa.Aio(0);

/*
Function: startSensorWatch(socket)
Parameters: socket - client communication channel
Description: Read Temperature Sensor and send temperature in degrees of Fahrenheit every 4 seconds
*/
function getTemp(socket) {
        var a = myAnalogPin.read();
        console.log("Analog Pin (A0) Output: " + a);
        //console.log("Checking....");
        
        var resistance = (1023 - a) * 10000 / a; //get the resistance of the sensor;
        //console.log("Resistance: "+resistance);
        var celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;//convert to temperature via datasheet ;
        //console.log("Celsius Temperature "+celsius_temperature); 
        var fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;
    
        currentTemp = fahrenheit_temperature;
         if(currentTemp<= 55){
             myOnboardLedRed.write( 0);//if ledState is true then write a '1' (high) otherwise write a '0' (low)
             myOnboardLedBlue.write( 0);
             myOnboardSound.write( 0);  
         }else{
             myOnboardLedRed.write( 1);//if ledState is true then write a '1' (high) otherwise write a '0' (low)
             myOnboardLedBlue.write( 1);
             myOnboardSound.write( 1);                         
                                   
}
    
        console.log("Fahrenheit Temperature: " + fahrenheit_temperature);
}

console.log("Sample Reading Grove Kit Temperature Sensor");

setInterval(getTemp, 1000);


//request('http://donttrashdrones.azurewebsites.net/', function(error, res, body){
//    console.log(body);
    
//});