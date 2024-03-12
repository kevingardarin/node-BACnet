'use strict';

const baAsn1 = require('../asn1');
const baEnum = require('../enum');

module.exports.encode = (buffer, deviceId, maxApdu, segmentation, vendorId) => {
  baAsn1.encodeApplicationObjectId(buffer, baEnum.ObjectType.DEVICE, deviceId);
  baAsn1.encodeApplicationUnsigned(buffer, maxApdu);
  baAsn1.encodeApplicationEnumerated(buffer, segmentation);
  baAsn1.encodeApplicationUnsigned(buffer, vendorId);
};

module.exports.decode = (buffer, offset) => {
  // Vérifie si le buffer commence par les octets 81 et 04 (on prend que les IAM de ForeignDevice)
  if (buffer[0] === 0x81 && buffer[1] === 0x04) {
        let result;
        let apduLen = 0;
        const orgOffset = offset;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + apduLen);
        apduLen += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.OBJECTIDENTIFIER) return;
        result = baAsn1.decodeObjectId(buffer, offset + apduLen);
        apduLen += result.len;
        if (result.objectType !== baEnum.ObjectType.DEVICE) return;
        const deviceId = result.instance;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + apduLen);
        apduLen += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.UNSIGNED_INTEGER) return;
        result = baAsn1.decodeUnsigned(buffer, offset + apduLen, result.value);
        apduLen += result.len;
        const maxApdu = result.value;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + apduLen);
        apduLen += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.ENUMERATED) return;
        result = baAsn1.decodeEnumerated(buffer, offset + apduLen, result.value);
        apduLen += result.len;
        if (result.value > baEnum.Segmentation.NO_SEGMENTATION) return;
        const segmentation = result.value;
        result = baAsn1.decodeTagNumberAndValue(buffer, offset + apduLen);
        apduLen += result.len;
        if (result.tagNumber !== baEnum.ApplicationTags.UNSIGNED_INTEGER) return;
        result = baAsn1.decodeUnsigned(buffer, offset + apduLen, result.value);
        apduLen += result.len;
        if (result.value > 0xFFFF) return;
        const ipOctets = buffer.slice(4, 8).toString('hex').match(/.{1,2}/g);
        const ipAddress = ipOctets.map(hex => parseInt(hex, 16)).join('.');
        const port = buffer.slice(8, 10).readUInt16BE();
        let network = null
        let sadr = null
        if (buffer[11] === 0x28) {
            network = buffer.slice(15, 17).readUInt16BE();
            sadr = parseInt(buffer[18], 16);
        }
        return {
            len: offset - orgOffset,
            address: ipAddress,
            port: port,
            deviceId: deviceId,
            maxApdu: maxApdu,
            segmentation: segmentation,
            sadr: sadr,
            network: network,
        };
    } else {
        return;
    }
};
