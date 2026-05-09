// api.js
import { get } from 'svelte/store';
import {
    LOGGING_LEVEL,
    logging_level,
} from './data-store';
import { getOrRefreshCsrfToken } from './csrf';


const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

function getParams(data) {
	// Build params for request
	var default_params = {};
	return {
		...default_params,
		...data,
	};
}

export async function getDataFRomAPIServer(data) {
    let params = getParams(data);
    let data_raw = await postDataToAPI('<url>', params);
    return data_raw;
}

async function getDataFromAPI(uri, params = null) {

    let endpoint = `${API_DOMAIN}${uri}/`;

    if (params) {
        endpoint += `?${new URLSearchParams(params)}`;
    }

    try {
        const response = await fetch(endpoint, {
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();

    } catch (err) {

        if (err.message === "Failed to fetch") {
            err.message = "Server not started!!!";
        }

        alert(`Server error at ${uri}\n\n${err.message}`);
        throw err;
    }
}

async function postDataToAPI(uri, params = null) {
    if ( !params ) params = getParams() || {};
    const endpoint = `${API_DOMAIN}${uri}/`;
    try {
        const csrftoken = await getOrRefreshCsrfToken();
        if (!csrftoken) throw new Error('No CSRF token available');
    if (get(logging_level) <= LOGGING_LEVEL['info']) {
        console.log(`[POST] Using token: ${csrftoken}`);
    }
        const response = await fetch(endpoint, {
            method: 'POST',
            credentials: 'include',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(params),
        });
        if (!response.ok) {
            const errText = await response.text().catch(() => '');
            throw new Error(`HTTP ${response.status} - ${errText}`);
        }
        const data = await response.json();
        if ('error' in data) {
            alert(`Error: ${data.error}`)
        }
        return data;
    } catch (err) {
        console.error(`POST failed:`, err);
        alert(`Error at ${uri}\n${err.message}`);
        throw err;
    }
}

export async function getConventions() {
    let uri = 'get-conventions'
    let data = {}
    const response = await postDataToAPI(uri, data)
    console.log(response.conventions);
    return response.conventions
}

export async function conventionsSelected(conventions=[]) {
    let uri = 'conventions-selected'
    let data = {conventions: conventions}
    const response = await postDataToAPI(uri, data)
    return response
}
