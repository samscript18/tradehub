export enum KycIdType {
   NIC = 'National Identification Card',
   INTERNATIONAL_PASSPORT = 'International Passport',
   DRIVERS_LICENSE = 'Drivers License',
   VOTERS_CARD = 'Voters Card',
   TIN = 'Tax Identification Number',
}

export enum KycStatus {
   PENDING = 'pending',
   SUCCESSFUL = 'successful',
   FAILED = 'failed',
}
