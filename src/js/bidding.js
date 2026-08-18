import { get } from 'svelte/store';
import { auction_calls, suppressed_bids } from './data-store';

const BIDDING_LEVELS = [1, 2, 3, 4, 5, 6, 7]
let auction_denom = ""


export function buttonEnabler() {
    let btn;
    enableAllLevelButtons(true)
    disableAllDenomButtons()
    const suppressed = get(suppressed_bids);
    BIDDING_LEVELS.forEach(level => {
        if ( level < suppressed.level ) {
            btn = document.getElementById(`bidding-button-${level}`);
            if (btn) {
                btn.disabled = true;
                btn.classList.add('forced-disabled');
            }
        }
    });
    
    if (suppressed.suppress_denoms === undefined) {
        return;
    }
    
    suppressed.suppress_denoms.forEach(denom => {
        btn = document.getElementById(`bidding-button-${denom}`);
        if (btn) {
            btn.disabled = true;
            btn.classList.add('forced-disabled');
        }
        
    });
    enableAllAncillaryButtons(true);    
    enableBiddingButton(['X'], suppressed.can_double);    
    enableBiddingButton(['XX'], suppressed.can_redouble);
}

export function disableAllBiddingButtons() {
    enableAllLevelButtons(false);
    enableAllDenomButtons(false);
    enableAllAncillaryButtons(false);
}

function enableAllLevelButtons(enable) {
    enableBiddingButton(BIDDING_LEVELS, enable)
}

function enableAllDenomButtons(enable) {
    const denoms = ['C', 'D', 'H', 'S', 'NT'];
    enableBiddingButton(denoms, enable)
}

function enableAllAncillaryButtons(enable) {
    const denoms = ['P', 'X', 'XX'];
    enableBiddingButton(denoms, enable)
}

function enableBiddingButton(denoms, enable) {
    denoms.forEach(denom => {
        const btn = document.getElementById(`bidding-button-${denom}`);
        if ( btn ) {
            if (enable) {
                btn.disabled = false;
                btn.classList.remove('forced-disabled');
            } else {
                btn.disabled = true;
                btn.classList.add('forced-disabled');
            }
        }
    })
}

export function disableAllDenomButtons() {
    enableAllDenomButtons(false);
}

export function enableDenomsAfterLevelSelected(level) {
    const suppressed = get(suppressed_bids);
    if (suppressed === undefined) {
        return;
    }
    enableAllDenomButtons(true);
    
    if (level > suppressed.level) {
        return;
    }

    let suppress_denoms = suppressed.suppress_denoms;
    
    for (let i = 0; i < auction_denom.length; i++) {
        suppress_denoms.push(auction_denom[i]);
    }

    if (suppressed.suppress_denoms === undefined) {
        return;
    }
    suppress_denoms.forEach(denom => {
        const btn = document.getElementById(`bidding-button-${denom}`);
        if (btn) {
            btn.disabled = true;
            btn.classList.add('forced-disabled');
        }
    })
}