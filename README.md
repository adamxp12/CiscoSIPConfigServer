# CiscoSIPConfigServer
A nodejs admin panel/tftp server allowing simple configuration of Cisco Unified IP phones in a SIP system

NOTICE: THIS IS FAR FROM COMPLETATION AND SHOULD NOT BE USED IN A PRODUCTION ENVIROMENT
INFACT AT MOMENT ITS MEARLY A WEB UI WITH NO INTERACTION WITH THE PHONES WIP!!!!

Notice2: I have a strong dislike towards cisco's prcing and support, why is it acceptible for them to sell a 24 port 10/100 switch for £500 in 2017, scam of the century and thats not including any support which is extra, they lock away firmware and stuff.

also try buying a CME licence, not possible which is why I am making this as their hardware is good but they wont sell me their terribly outdated hardware/software for a price humans can afford

# Todo List
* XML generation
* TFTP server
* Background creation
* Ringtone generator

# Phone compatibility
The following phones I own so I can test (once complete) for compatibility
* Cisco 7912 (no chance, See below)
* Cisco 7911 - Should work
* Cisco 7941 - Should work
* Cisco 7961 - dont own but basicly a 7941 with more buttons so WILL work
* Cisco 7971 - Should work

I know the project is not even functional yet but to save me from hurting my brain I am going to form a list of phones that I know will probably not be compatible.

The majority of phones on this list are incompitble for trivial reasons be it not using the XML config that I am used to in which case it might be simple to add support (although the 7940/7960 are rubbish to get now seeing as the 7941/7961 are same if not cheaper)
* Cisco 7912 - Uses some cryptic config file compilier, really whats wrong with a normal TXT or XML file
* Cisco 7905 - Same as above
* Cisco 7940/7960 - Non XML bassed config and also non standard POE so cant test one if I do get one
* Cisco IP Communicator - Cant download it due to no contract (stupid cisco) and the old copy I got refuses to acess my TFTP server, can only assume its designed to require some licence key thats costs £4k because Cisco shame as it looks better than most softphones.
* Any Cisco phone with lack of SIP firmware like 7925

This list will probably grow as I find more cisco phones that are SIP compatible but too much work to implement.
