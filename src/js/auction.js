import { get } from 'svelte/store';
import { vulnerability, auction_image_html, auction_calls } from './data-store';

const VULNERABLE_COLOUR = '#f66';
const NON_VULNERABLE_COLOUR = '#eee';
const SEATS = 'NESW';

export function setAuctionHTML() {
    var innerHTML = seatsHTML();
    var html = '';
    const call_names = get(auction_calls);
    for (var index = 0; index < call_names.length; index++) {
        var call_name = call_names[index];
        if (call_name == 'blank') {
            html = '<div class="blank-call"></div>'
        } else if (call_name == 'P') {
            html = '<div class="call-holder pass-call">P</div>'
        } else if (call_name == 'D') {
            html = '<div class="call-holder double-call">X</div>'
        } else if (call_name == 'R') {
            html = '<div class="call-holder redouble-call">XX</div>'
        } else if (call_name[1] == 'S') {
            html = `<div class="call-holder black-call">${call_name[0]}<span class="call-suit">&spades;</span></div>`
        } else if (call_name[1] == 'H') {
            html = `<div class="call-holder red-call">${call_name[0]}<span class="call-suit">&hearts;</span></div>`
        } else if (call_name[1] == 'D') {
            html = `<div class="call-holder red-call">${call_name[0]}<span class="call-suit">&diams;</span></div>`
        } else if (call_name[1] == 'C') {
            html = `<div class="call-holder black-call">${call_name[0]}<span class="call-suit">&clubs;</span></div>`
        } else if (call_name == 'cursor') {
            html = `<div class="call-holder blink">&nbsp</div>`
        } else {
            html = `<div class="call-holder black-call nt-call">${call_name[0]}NT</div>`
        }
        innerHTML += html;
    }
    auction_image_html.set(innerHTML);
}

function seatsHTML() {
    var innerHTML = '';
    var seat = '';
    for (var index = 0; index < 4; index++) {
        seat = SEATS[index]
        innerHTML += getSeatHTML(seat);
    }
    return innerHTML;
}

function getSeatHTML(seat) {
    let seat_colour = NON_VULNERABLE_COLOUR;
    const vulnerable = get(vulnerability);
    if ( vulnerable == 'Both') {
        seat_colour = VULNERABLE_COLOUR;
    }
    if ( vulnerable == 'NS' && 'NS'.indexOf(seat) >= 0) {
        seat_colour = VULNERABLE_COLOUR;
    }
    if ( vulnerable == 'EW' && 'EW'.indexOf(seat) >= 0) {
        seat_colour = VULNERABLE_COLOUR;
    }
    let html = `<div class="contract-seat" style="background-color: ${seat_colour};" >${seat}</div>`;
    return html;
}