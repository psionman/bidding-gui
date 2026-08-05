import { get } from 'svelte/store';
import { tick } from 'svelte';
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
    vulnerability,
    dealer,
    auction_calls,
    auction_visible,
    hand_visible,
    preamble_visible,
    suppressed_bids,
} from './data-store';
import {buttonEnabler, disableAllDenomButtons} from './bidding';

import { conventionsSelected, getStaticData } from './api';

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
    vulnerability.set(response.vulnerability);
    dealer.set(response.dealer);
    auction_calls.set(response.auction);
    setElementsVisibility(response.display_elements);
    suppressed_bids.set(response.bid_suppression);
    await tick()
    if (response.bid_suppression !== undefined) {
        buttonEnabler();
    }
    disableAllDenomButtons()
}

function setElementsVisibility(display_elements) {
    auction_visible.set(false);
    hand_visible.set(false);
    preamble_visible.set(false);

    if (display_elements.includes('auction')) {
        auction_visible.set(true);
    }
    if (display_elements.includes('hand')) {
        hand_visible.set(true);
    }
    if (display_elements.includes('preamble')) {
        preamble_visible.set(true);
    }
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

export function resetData() {
    selected_conventions.set([]);
    theme.set("");
    title.set("");
    subtitle.set("");
    preamble.set("");
    question.set("");
    options.set("");
    correct_response.set("");
    convention_description.set("");
    hand_cards.set([]);
    vulnerability.set("");
    dealer.set("");
    auction_calls.set([]);
    auction_visible.set(false);
    hand_visible.set(false);
}   
