'use strict';

const utils = require('./utils');

describe('BACnet - addListElement integration', () => {
  it('should return a timeout error if no device is available', (next) => {
    const client = new utils.bacnetClient({apduTimeout: 200});
    client.addListElement('127.0.0.1', {type: 19, instance: 101}, {id: 80, index: 0}, [
      {type: 1, value: true}
    ], (err, value) => {
      expect(err.message).toEqual('ERR_TIMEOUT');
      expect(value).toBeUndefined();
      client.close();
      next();
    });
  });
});
