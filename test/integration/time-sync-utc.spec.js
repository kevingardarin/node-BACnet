'use strict';

const utils = require('./utils');

describe('BACnet - timeSyncUTC integration', () => {
  it('should send a time UTC sync package', () => {
    const client = new utils.bacnetClient({apduTimeout: 200});
    client.timeSyncUTC('127.0.0.1', new Date());
    client.close();
  });
});
