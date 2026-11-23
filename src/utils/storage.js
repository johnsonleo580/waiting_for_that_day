import { defaultSettings } from '../data/messages';

const SETTINGS_KEY = 'wedding_settings';
const OVERRIDES_KEY = 'wedding_custom_overrides';
const OPENED_DAYS_KEY = 'wedding_opened_days';

export function getSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch (e) {
    return defaultSettings;
  }
}

export function saveSettings(newSettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function getCustomOverrides() {
  try {
    const saved = localStorage.getItem(OVERRIDES_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
}

export function saveCustomOverride(dateStr, noteData) {
  try {
    const current = getCustomOverrides();
    current[dateStr] = noteData;
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(current));
    return true;
  } catch (e) {
    console.error('Failed to save override:', e);
    return false;
  }
}

export function deleteCustomOverride(dateStr) {
  try {
    const current = getCustomOverrides();
    delete current[dateStr];
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(current));
    return true;
  } catch (e) {
    return false;
  }
}

export function getOpenedDays() {
  try {
    const saved = localStorage.getItem(OPENED_DAYS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function markDayAsOpened(dayNumber) {
  try {
    const current = getOpenedDays();
    if (!current.includes(dayNumber)) {
      current.push(dayNumber);
      localStorage.setItem(OPENED_DAYS_KEY, JSON.stringify(current));
    }
  } catch (e) {
    console.error('Failed to mark opened day:', e);
  }
}

export function unmarkDayAsOpened(dayNumber) {
  try {
    const current = getOpenedDays();
    const updated = current.filter(d => d !== dayNumber);
    localStorage.setItem(OPENED_DAYS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to unmark day:', e);
  }
}

export function resetOpenedDays() {
  try {
    localStorage.removeItem(OPENED_DAYS_KEY);
  } catch (e) {
    console.error('Failed to reset opened days:', e);
  }
}
