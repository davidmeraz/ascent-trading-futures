import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for localStorage abstraction.
 * Provides reactive state synced with localStorage, including cross-tab support.
 *
 * @param {string} key - The localStorage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {[value, setValue, removeValue]}
 */
export function useStorage(key, defaultValue = null) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored !== null ? JSON.parse(stored) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    const set = useCallback((newValue) => {
        try {
            const resolved = typeof newValue === 'function' ? newValue(value) : newValue;
            localStorage.setItem(key, JSON.stringify(resolved));
            setValue(resolved);
            // Dispatch storage event so other components/tabs can react
            window.dispatchEvent(new Event('storage'));
        } catch (error) {
            console.error(`Failed to set localStorage key "${key}":`, error);
        }
    }, [key, value]);

    const remove = useCallback(() => {
        try {
            localStorage.removeItem(key);
            setValue(defaultValue);
            window.dispatchEvent(new Event('storage'));
        } catch (error) {
            console.error(`Failed to remove localStorage key "${key}":`, error);
        }
    }, [key, defaultValue]);

    // Sync across tabs / components
    useEffect(() => {
        const handleStorageChange = () => {
            try {
                const stored = localStorage.getItem(key);
                setValue(stored !== null ? JSON.parse(stored) : defaultValue);
            } catch {
                setValue(defaultValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key, defaultValue]);

    return [value, set, remove];
}

/**
 * Simple non-reactive read from localStorage.
 * Safe against corrupted data.
 */
export function getStorageValue(key, defaultValue = null) {
    try {
        const stored = localStorage.getItem(key);
        return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
        return defaultValue;
    }
}
