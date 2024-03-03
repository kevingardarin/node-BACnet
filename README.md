# Node BACnet

A BACnet protocol stack written in pure JavaScript. BACnet is a protocol to
interact with building automation devices defined by ASHRAE.

## Usage

Add Node BACnet to your project by using:

In your package.json :
``` sh
"dependencies": {
    "BACnet": "git+https://github.com/kevingardarin/node-BACnet.git",
},
```
And execute :
``` sh
npm install
```

### Features

The BACnet standard defines a wide variety of services as part of it's
specification. While Node BACnet tries to be as complete as possible,
following services are already supported at this point in time:

| Service                        | Handle                                                                       |
|--------------------------------|:----------------------------------------------------------------------------:|
| Who Is                         | yes                                                                          |
| I Am                           | yes                                                                          |
| Who Has                        | yes                                                                          |
| I Have                         | yes                                                                          |
| Time Sync                      | yes                                                                          |
| UTC Time Sync                  | yes                                                                          |
| Read Property                  | yes                                                                          |
| Read Property Multiple         | yes                                                                          |
| Read Range                     | yes                                                                          |
| Write Property                 | yes                                                                          |
| Write Property Multiple        | yes                                                                          |
| Add List Element               | yes                                                                          |
| Remove List Element            | yes                                                                          |
| Create Object                  | yes                                                                          |
| Delete Object                  | yes                                                                          |
| Subscribe COV                  | yes                                                                          |
| Subscribe Property             | yes                                                                          |
| Atomic Read File               | yes                                                                          |
| Atomic Write File              | yes                                                                          |
| Reinitialize Device            | yes                                                                          |
| Device Communication Control   | yes                                                                          |
| Get Alarm Summary²             | yes                                                                          |
| Get Event Information          | yes                                                                          |
| Get Enrollment Summary²        | yes                                                                          |
| Acknowledge Alarm              | yes                                                                          |
| Confirmed Event Notification   | yes                                                                          |
| Unconfirmed Event Notification | yes                                                                          |
| Unconfirmed Private Transfer   | yes                                                                          |
| Confirmed Private Transfer     | yes                                                                          |

### Example

``` js
const bacnet = require('BACnet');

// Initialize BACnet
const client = new bacnet({apduTimeout: 6000});

// Discover Devices
client.on('iAm', (device) => {
  console.log('address: ', device.address);
  console.log('deviceId: ', device.deviceId);
  console.log('maxApdu: ', device.maxApdu);
  console.log('segmentation: ', device.segmentation);
  console.log('vendorId: ', device.vendorId);
});
client.whoIs();

// Read Device Object
const requestArray = [{
  objectId: {type: 8, instance: 4194303},
  properties: [{id: 8}]
}];
client.readPropertyMultiple('192.168.1.43', requestArray, (err, value) => {
  console.log('value: ', value);
});
```

**Note:** This is not an official product of the BACnet Advocacy Group. BACnet®
is a registered trademark of American Society of Heating, Refrigerating and
Air-Conditioning Engineers (ASHRAE).
