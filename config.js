// Cisco SIP Config Server
// Application Configuration
// Modify acordingly
var config = {};
config.tftp = {};
// Do not modify above lines


// The port to listen on, typiclly should be above 1000 as you need to run the server as root to go below 1000
// We recomend setting up a nginx proxy if you need to listen on port 80 or want SSL encryption
// Default: 3000
config.webport = 3000;

// === TFTP ====

// Enable built in TFTP server. In some rare instances you might want to bypass the built in TFTP server for a standalone one
// We recomend you stick with the built in server
// Default: ture
config.tftp.enable = true;

// TFTP Path. if you would like to relocate the folder that the built in TFTP server and configs are saved then feel free to modify
// NOTE: this path must be writeble by the user executing the server, for ease of setup we recomend staying with Default
// You should really only change this if using an external TFTP server
// Default: ./tftpboot
config.tftp.path = "./tftpboot";


// That's all
// Do not modify below this line
module.exports = config;