const FAST_DATE = 'fast_date';

export function getFastStartingDate() {
    return getLocalStorageItem(FAST_DATE);
};

export function updateFastStartingDate(startingDate) {
    setLocalStorageItem(FAST_DATE, startingDate);
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
