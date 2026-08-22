
import { get } from 'svelte/store';
import { 
    static_data, 
    scale, 
    canvas_sizes, 
    hand_cards,
    hand_visible,
} from './data-store.js';


const STANDARD_SCALE = 0.5  // The maximum scaling factor
const MAX_WINDOW_HEIGHT = 810; // Do not adjust width parameters if window height exceeds this value
const MAX_WINDOW_WIDTH = 1100; // Do not adjust height parameters if window width exceeds this value

export const BID_IMAGE_WIDTH = 42; // Width of the raw bid image
export const BID_IMAGE_HEIGHT = 30; // Height of the raw bid image
const BID_BOX_SCALE_FACTOR = 5; // factor by which to bbox images after scaling
export const CALL_SCALE_FACTOR = 0.85; // factor by which to expand call images after scaling

export const CARD_IMAGE_WIDTH = 160; // Width of the raw card image
export const CARD_IMAGE_HEIGHT = 230; // Height of the raw card image

const HORIZONTAL_CUT_OFF = 0.45; // Horizontal proportion of card that will be seen (from left)
const VERTICAL_CUT_OFF = 0.85; // Vertical proportion of card that will be seen (from top)
export const CARD_WIDTH = CARD_IMAGE_WIDTH * HORIZONTAL_CUT_OFF; // Width of card when displayed
export const CARD_HEIGHT = CARD_IMAGE_HEIGHT * VERTICAL_CUT_OFF; // Height of card when displayed

export var CANVAS_WIDTH_NS = 0;  // Width of canvas for N/S hands
export var CANVAS_HEIGHT_NS = 0; // Height of canvas for N/S hands
let last_suit = '';
let suit_row = -1;
let suit_column = -1;

setSizingVariables()

window.onresize = async function () {
    // await displayBoardElements();
}

function setSizingVariables() {
    // Resize calculations
    getScale();
    var _scale = get(scale);

    const _canvas_sizes = {
        'width': 13 * CARD_WIDTH * _scale,
        'height': CARD_HEIGHT * _scale,
    }
    canvas_sizes.set(_canvas_sizes)
}

export function getScale() {
    var container = document.getElementById('hand-container');
    var container_width = container ? container.clientWidth : window.innerWidth * 0.3;
    var _scale = container_width / (13 * CARD_WIDTH);
    scale.set(_scale);
    return scale;
}

export function displayHand() {
    if (!get(hand_visible)) {
        return;
    }
    // Display all of the cards for a hand
    last_suit = '';
    suit_row = -1;
    suit_column = -1;
    var hand_ctx = prepareHandCanvas();

    for (var card_name of get(hand_cards)) {
        placeCardOnCanvas (card_name, hand_ctx);
    }
}

function placeCardOnCanvas (card_name, hand_ctx) {
    // Draw a card and update its object with seat etc.

    var card_images = get(static_data).card_images;
    let card_image = card_images[card_name];
    drawCardImage(card_image, hand_ctx)
}

function drawCardImage(card_image, hand_ctx) {
    // Draw card images on the canvas and update the card object coordinates

    // Card position
    var card_coordinates = cardCoordinates();
    var pos_x = card_coordinates['pos_x'];
    var pos_y = card_coordinates['pos_y'];

    // Target dimensions
    var _scale = get(scale);
    var target_width = CARD_WIDTH * _scale;
    var target_height = CARD_HEIGHT * _scale;

    // Draw card
    let imgObj = new Image();
    imgObj.src = card_image;  // throws 404 error if card_image is undefined
    imgObj.addEventListener('load', e => {
        hand_ctx.drawImage(imgObj, 0, 0, CARD_WIDTH, CARD_HEIGHT, pos_x, pos_y, target_width, target_height);
    });
}

function cardCoordinates() {
    // Return the x, y coordinates of a card depending on seat
    var _scale = get(scale);

    var pos_x = 0;
    var pos_y = 0;
    var card_cropped_width = CARD_WIDTH * _scale;

    suit_column ++;
    pos_x = suit_column * card_cropped_width;
    pos_y = 0;
    return {'pos_x': pos_x, 'pos_y': pos_y}
}


function prepareHandCanvas() {
    // Return the canvas static_store (ctx) for hand display
    var canvas = getCanvas();
    var ctx = canvas.getContext('2d');
    var _canvas_sizes = get(canvas_sizes)

    canvas.width = _canvas_sizes.width;
    canvas.height = _canvas_sizes.height;
    
    return ctx;
}

function getCanvas() {
    var canvas_id = `hand-image`;
    var canvas = document.getElementById(canvas_id);
    return canvas;
}
