export function unlockedArrayToSet(arr) {
  return new Set(arr || []);
}

export function setToUnlockedArray(set) {
  return Array.from(set || []);
}
