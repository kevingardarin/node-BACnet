<a name="0.0.1"></a>

### Features

* **client:** implement missing un/confirmed event handler
* **services:** implement EventEnrollmentSummary service

### Bug Fixes

* **apdu:** rename wrongly named `adpu` modules and files to `apdu
* **asn1:** correct encoding of object-types > 512
* **asn1:** correct error object structure
* **client:** correct deviceCommunicationControl example
* **service:** correct atomicWriteFile service functionality
* **services:** correct readRangeAcknowledge implementation

### BREAKING CHANGES

* **apdu:** The `adpuTimeout` constructor parameter has been renamed to `apduTimeout`. See docs.

* **apdu:** The `maxAdpu` callback parameter inside the `iAm` event has been renamed to `maxApdu`. See docs.

* **enum:** The optional input parameter type `MaxSegments` has been renamed to `MaxSegmentsAccepted` and has renamed values. See documentation.

* **enum:** The optional input parameter type `MaxApdu` has been renamed to `MaxApduLengthAccepted` and has renamed values. See documentation.

* **enum:** The values of the input parameter type `ApplicationTags` has changed by dropping it's `BACNET_APPLICATION_TAG_*` prefix. See documentation.

* **enum:** The values of the input parameter type `ReinitializedStates` has changed by dropping it's `BACNET_REINIT_*` prefix. See documentation.


