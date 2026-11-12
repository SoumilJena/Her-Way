import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterListings,
  validateInviteCode,
  getTierDetails,
  formatINR,
  createBookingObject,
  createCheckInRequestObject,
} from './safety';
import { LISTINGS, GUARDIANS } from '../data/mockData';

test('filterListings handles All Cities and all categories', () => {
  const all = filterListings(LISTINGS, 'All', 'All Cities');
  assert.equal(all.length, 6);

  const jaipurOnly = filterListings(LISTINGS, 'All', 'Jaipur');
  assert.equal(jaipurOnly.length, 1);
  assert.equal(jaipurOnly[0].city, 'Jaipur');

  const under1500 = filterListings(LISTINGS, 'Under ₹1,500', 'All Cities');
  assert.ok(under1500.length > 0);
  under1500.forEach((item) => assert.ok(item.price <= 1500));

  const tours = filterListings(LISTINGS, 'Group Tours', 'All Cities');
  assert.ok(tours.length >= 2);
  tours.forEach((item) => assert.equal(item.type, 'tour'));

  const policeVerified = filterListings(LISTINGS, 'Police Verified', 'All Cities');
  assert.ok(policeVerified.length >= 5);
});

test('validateInviteCode validates HERWAY2026 correctly case-insensitively', () => {
  assert.equal(validateInviteCode('HERWAY2026'), true);
  assert.equal(validateInviteCode('herway2026'), true);
  assert.equal(validateInviteCode('  HERWAY2026  '), true);
  assert.equal(validateInviteCode('INVALID123'), false);
  assert.equal(validateInviteCode(''), false);
});

test('getTierDetails returns expected labels and progress values', () => {
  const guest = getTierDetails('guest');
  assert.equal(guest.label, 'Guest Explorer');
  assert.equal(guest.progressPercent, 20);

  const explorer = getTierDetails('new_explorer');
  assert.equal(explorer.label, 'New Explorer — Probation');
  assert.equal(explorer.progressPercent, 60);

  const guardian = getTierDetails('verified_guardian');
  assert.equal(guardian.label, 'Verified Guardian');
  assert.equal(guardian.progressPercent, 100);
});

test('formatINR formats currency strings correctly', () => {
  assert.equal(formatINR(1200), '₹1,200');
  assert.equal(formatINR(2800), '₹2,800');
});

test('createBookingObject creates a valid booking record with confirmed status', () => {
  const booking = createBookingObject(LISTINGS[0], '2026-11-20', 1);
  assert.ok(booking.id.startsWith('bk-'));
  assert.equal(booking.listingTitle, LISTINGS[0].title);
  assert.equal(booking.status, 'confirmed');
  assert.equal(booking.contactEmergencyShared, true);
});

test('createCheckInRequestObject creates a valid check-in with a 4-digit security PIN', () => {
  const checkIn = createCheckInRequestObject(GUARDIANS[0], 'escort', 'Need walking escort');
  assert.ok(checkIn.id.startsWith('chk-'));
  assert.equal(checkIn.guardianName, GUARDIANS[0].name);
  assert.equal(checkIn.pinCode.length, 4);
});
