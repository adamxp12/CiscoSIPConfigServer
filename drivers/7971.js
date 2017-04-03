// Cisco 7941 driver
// Cisco SIP Config Server https://github.com/adamxp12/CiscoSIPConfigServer
// Driver file created by Adam Blunt 2017

var driver = {};

// Numerical ID for this driver, we strongly recomend you use the phone model number as the is very little chance of conflicts
driver.id = 7941;

// Friendly name. as its displayed in menus
driver.name = "Cisco Unified 7971";

// Lines aka how many lines the phone can handle with out extra sidecars
driver.lines = 8

// file name for phone upgrade guide (stored in the inc folder) displayed when a new phone is added not running SIP firmware
driver.upgradeguide = "79x1upgrade.inc"

// URL where users can download firmware from, for legal reasons only use cisco.com URL's firmware is free for many older models
driver.firmwareurl = "https://software.cisco.com/download/release.html?mdfid=280083379&softwareid=282074288&os=&release=9.4(2)SR3&relind=AVAILABLE&rellifecycle=&reltype=latest&i=!pp";

// Driver features - NOTE THIS DOES NOT MAGICLY ENABLE FEATURES, THEY MUST EXIST IN XML TEMPLATE
driver.sidecar = false
driver.ntp = true
driver.services = true

// XML file template, yes this section is a splendid mess its why its last, this whole program was designd to hide this mess
// Avalible vars
// %timezone% - Timezone setting
// %ntpip% - NTP server IP/host
// %sipport% - The port your SIP server listens only
// %sipip% - SIP server IP
// %phonelabel% - Phone label
// %siplines% - Auto filled with the line config
// %servicesurl% - Services URL

driver.xmlconf = '<device>\
    <deviceProtocol>SIP</deviceProtocol>\
    <sshUserId>cisco</sshUserId>\
    <sshPassword>cisco</sshPassword>\
    <ipAddressMode>0</ipAddressMode>\
\
    <devicePool>\
        <dateTimeSetting>\
            <dateTemplate>D/M/Ya</dateTemplate>\
            <timeZone>%timezone%</timeZone>\
            <ntps>\
                <ntp>\
                    <name>%ntpip%</name>\
                    <ntpMode>Unicast</ntpMode>\
                </ntp>\
            </ntps>\
        </dateTimeSetting>\
\
        <callManagerGroup>\
            <members>\
                <member priority="0">\
                    <callManager>\
                        <ports>\
                            <ethernetPhonePort>2000</ethernetPhonePort>\
                            <sipPort>%sipport%</sipPort>\
                        </ports>\
                        <processNodeName>%sipip%</processNodeName>\
                    </callManager>\
                </member>\
            </members>\
        </callManagerGroup>\
    </devicePool>\
\
    <sipProfile>\
        <sipProxies>\
            <registerWithProxy>true</registerWithProxy>\
        </sipProxies>\
        <sipCallFeatures>\
            <cnfJoinEnabled>true</cnfJoinEnabled>\
            <rfc2543Hold>false</rfc2543Hold>\
            <callHoldRingback>2</callHoldRingback>\
            <localCfwdEnable>true</localCfwdEnable>\
            <semiAttendedTransfer>true</semiAttendedTransfer>\
            <anonymousCallBlock>2</anonymousCallBlock>\
            <callerIdBlocking>2</callerIdBlocking>\
            <dndControl>0</dndControl>\
            <remoteCcEnable>true</remoteCcEnable>\
        </sipCallFeatures>\
\
        <sipStack>\
            <sipInviteRetx>6</sipInviteRetx>\
            <sipRetx>10</sipRetx>\
            <timerInviteExpires>180</timerInviteExpires>\
            <timerRegisterExpires>3600</timerRegisterExpires>\
            <timerRegisterDelta>5</timerRegisterDelta>\
            <timerKeepAliveExpires>120</timerKeepAliveExpires>\
            <timerSubscribeExpires>120</timerSubscribeExpires>\
            <timerSubscribeDelta>5</timerSubscribeDelta>\
            <timerT1>500</timerT1>\
            <timerT2>4000</timerT2>\
            <maxRedirects>70</maxRedirects>\
            <remotePartyID>true</remotePartyID>\
            <userInfo>None</userInfo>\
        </sipStack>\
\
        <autoAnswerTimer>1</autoAnswerTimer>\
        <autoAnswerAltBehavior>false</autoAnswerAltBehavior>\
        <autoAnswerOverride>true</autoAnswerOverride>\
        <transferOnhookEnabled>false</transferOnhookEnabled>\
        <enableVad>false</enableVad>\
        <preferredCodec>g711ulaw</preferredCodec>\
        <dtmfAvtPayload>101</dtmfAvtPayload>\
        <dtmfDbLevel>3</dtmfDbLevel>\
        <dtmfOutofBand>avt</dtmfOutofBand>\
        <alwaysUsePrimeLine>false</alwaysUsePrimeLine>\
        <alwaysUsePrimeLineVoiceMail>false</alwaysUsePrimeLineVoiceMail>\
        <kpml>3</kpml>\
        <natEnabled>false</natEnabled>\
        <phoneLabel>%phonelabel%</phoneLabel>\
        <stutterMsgWaiting>0</stutterMsgWaiting>\
        <callStats>false</callStats>\
        <silentPeriodBetweenCallWaitingBursts>10</silentPeriodBetweenCallWaitingBursts>\
        <disableLocalSpeedDialConfig>false</disableLocalSpeedDialConfig>\
        <startMediaPort>10000</startMediaPort>\
        <stopMediaPort>20000</stopMediaPort>\
\
        <sipLines>\
        %siplines% \
</sipLines>\
\
        <voipControlPort>5060</voipControlPort>\
        <dscpForAudio>184</dscpForAudio>\
        <ringSettingBusyStationPolicy>0</ringSettingBusyStationPolicy>\
        <dialTemplate>dialplan.xml</dialTemplate>\
    </sipProfile>\
\
    <commonProfile>\
        <phonePassword></phonePassword>\
        <backgroundImageAccess>true</backgroundImageAccess>\
        <callLogBlfEnabled>1</callLogBlfEnabled>\
    </commonProfile>\
\
    <vendorConfig>\
        <disableSpeaker>false</disableSpeaker>\
        <disableSpeakerAndHeadset>false</disableSpeakerAndHeadset>\
        <pcPort>0</pcPort>\
        <settingsAccess>1</settingsAccess>\
        <garp>0</garp>\
        <voiceVlanAccess>0</voiceVlanAccess>\
        <videoCapability>0</videoCapability>\
        <autoSelectLineEnable>0</autoSelectLineEnable>\
        <webAccess>0</webAccess>\
        <spanToPCPort>1</spanToPCPort>\
        <loggingDisplay>1</loggingDisplay>\
        <loadServer></loadServer>\
        <sshAccess>0</sshAccess>\
    </vendorConfig>\
\
    <versionStamp>001</versionStamp>\
    <networkLocale>United_Kingdom</networkLocale>\
    <networkLocaleInfo>\
        <name>United_Kingdom</name>\
        <uid>64</uid>\
        <version>1.0.0.0-4</version> \
    </networkLocaleInfo>\
\
    <deviceSecurityMode>1</deviceSecurityMode>\
    <authenticationURL></authenticationURL>\
    <servicesURL></servicesURL>\
    <transportLayerProtocol>2</transportLayerProtocol>\
    <certHash></certHash>\
    <encrConfig>false</encrConfig>\
    <dialToneSetting>2</dialToneSetting>\
</device>\ ';

module.exports = driver;