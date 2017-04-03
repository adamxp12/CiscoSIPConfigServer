// Cisco phone drivers init
// If you want to add new phone drivers to Cisco Sip Config Server then you need to make a .js file like the ones provided
// they are commented to help you, then just tack it onto this loader file.

// If for some reason you want to disable a driver just give its line to forward slashes like the lines above
// you can also rename the .js files and change them here if you want to dupplicate a driver for debugging or something

var drivers = {};

// Line format
// drivers.ciscoXXXX = require('./file.js');

drivers.cisco7941 = require('./7941.js');
drivers.cisco7961 = require('./7961.js');
drivers.cisco7971 = require('./7971.js');

module.exports = drivers;