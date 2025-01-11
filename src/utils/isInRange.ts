export const isWithinRange = function (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  rangeInMeters = 100,
) {
  const EARTH_RADIUS = 6371; // Earth radius in kilometers

  // Convert degrees to radians
  const toRadians = (degree: number) => (degree * Math.PI) / 180;

  // Differences in radians
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  // Convert latitudes to radians
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) *
      Math.sin(dLng / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distance = EARTH_RADIUS * c;

  // Convert distance to meters
  const distanceInMeters = distance * 1000;

  // Check if within the range
  return distanceInMeters <= rangeInMeters;
};
