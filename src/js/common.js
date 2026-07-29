import { get } from 'svelte/store';
import Cookies from "js-cookie";
import {
    selected_conventions,
    theme,
    title,
    subtitle,
    preamble,
    question,
    options,
    correct_response,
    convention_description,
    static_data,
    hand_cards,
} from './data-store';

import { conventionsSelected, getStaticData } from './api';
import { updateHandHTML } from './card-display';


export async function getNewQuestion() {
    const response = await conventionsSelected(get(selected_conventions));

    theme.set(response.theme);
    title.set(response.title);
    subtitle.set(response.subtitle);
    preamble.set(response.preamble);
    question.set(response.question);
    options.set(response.options);
    correct_response.set(response.correct_response);
    convention_description.set(response.description);
    hand_cards.set(response.hand_cards);
}

export function saveConventionCookie(tree) {
    Cookies.set(
        "conventionCookie",
        JSON.stringify(buildCookieObject(tree)),
        { expires: 365 });
}

// Recursively builds a flat object of { id: checked } pairs from the convention tree
export function buildCookieObject(tree, acc = {}) {
    for (const convention of tree) {
        acc[convention.id] = convention.checked;
        if (convention.children.length > 0) {
            buildCookieObject(convention.children, acc);
        }
    }
    return acc;
}

export async function initialiseStaticData () {
    let _static_data_raw = await getStaticData();
    static_data.set(_static_data_raw);
};
