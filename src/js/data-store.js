import { writable, get } from 'svelte/store';

export const LOGGING_LEVEL = {
    debug: 10,
    info: 20,
    warning: 30,
}

export let logging_level = writable(LOGGING_LEVEL['warning']);
export let save_selection = writable(false);
export let show_save = writable(true);
export let show_save_section = writable(true);
export let hide_title = writable(false);
export let conventions = writable({});
export let selected_conventions = writable([]);

export let selector_visible = writable(true);
export let question_visible = writable(false);
export let description_visible = writable(false);

export let title = writable('');
export let subtitle = writable('');
export let preamble = writable('');
export let question = writable('');
export let options = writable([]);
export let correct_response = writable('');
export let convention_description = writable('');

export let selected_bid = writable('');
export let selected_level = writable(0);
export let selected_denom = writable('');
export let selected_modifier = writable('');
