
import { get } from 'svelte/store';
import {
    LOGGING_LEVEL,
    logging_level,
} from './data-store'

let cachedCsrfToken = null;
const API_DOMAIN = import.meta.env.VITE_API_DOMAIN

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

export async function getOrRefreshCsrfToken() {
    if (cachedCsrfToken) return cachedCsrfToken;

    try {
        const response = await fetch(`${API_DOMAIN}/ensure-csrf/?_=${Date.now()}`, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store',
        });

        if (!response.ok) throw new Error('CSRF setup failed');

        const data = await response.json();
        cachedCsrfToken = data.csrftoken;

        if (get(logging_level)
             <= LOGGING_LEVEL['info']) {
            console.log('[CSRF] Token received from server:', cachedCsrfToken);
            console.log('[CSRF] Cookie value:', getCookie('csrftoken'));
        }

        return cachedCsrfToken;
    } catch (err) {
        console.error('[CSRF] Refresh failed:', err);
        return null;
    }
}
