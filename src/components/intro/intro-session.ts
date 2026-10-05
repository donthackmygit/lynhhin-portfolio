export const INTRO_STORAGE_KEY = "portfolio-intro-seen";

let seenInMemory = false;

export function hasSeenIntro() {
  if (seenInMemory) return true;
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  seenInMemory = true;
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
  } catch {
    // Keep navigation usable when browser storage is unavailable.
  }
}
