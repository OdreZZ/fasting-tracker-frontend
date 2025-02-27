const FAST_DATE = "fast_date";
const GOAL_DATE = "goal_date";
const SETTINGS = "settings";

export function getFastStartingDate() {
    return getLocalStorageItem(FAST_DATE);
};

export function updateFastStartingDate(startingDate) {
    setLocalStorageItem(FAST_DATE, startingDate);
};

export function getFastGoalDate() {
    return getLocalStorageItem(GOAL_DATE);
};

export function updateFastGoalDate(endDate) {
    setLocalStorageItem(GOAL_DATE, endDate);
};

export function getCachedSettings() {
    return getLocalStorageItem(SETTINGS);
};

export function updateCachedSettings(settings) {
    setLocalStorageItem(SETTINGS, settings);
};

function getLocalStorageItem(key, defaultValue=false) {
    if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key);

        if (item !== null) {
            try {
                return JSON.parse(item);
            } catch {
                return item;
            }
        }
    }

    return defaultValue;
};

function setLocalStorageItem(key, item) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(item));
    }
};
