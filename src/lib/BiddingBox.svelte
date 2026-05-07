<main>
    <div id="bidding-box-popup" class="display-panel">

        <div id="bidding-levels">
            {#each BIDDING_LEVELS || [] as level}
                <button
                    class="bidding-button level-button"
                    id= 'bidding-button-{level}'
                    class:selected={$selected_level === level}
                    on:click={() => levelClicked(level)}>
                    {level}
                </button>
            {/each}
        </div>

        <div id="bidding-suits">
            <button
                class="bidding-button suit-button"
                id="bidding-button-C"
                class:selected={$selected_denom === 'C'}
                on:click={() => suitClicked("C")}>
                &clubs;
            </button>
            <button
                class="bidding-button suit-button red-fg"
                id="bidding-button-D"
                class:selected={$selected_denom === 'D'}
                on:click={() => suitClicked("D")}>
                &diams;
            </button>
            <button
                class="bidding-button suit-button red-fg"
                id="bidding-button-H"
                class:selected={$selected_denom === 'H'}
                on:click={() => suitClicked("H")}>
                &hearts;
            </button>
            <button
                class="bidding-button suit-button"
                id="bidding-button-S"
                class:selected={$selected_denom === 'S'}
                on:click={() => suitClicked("S")}>
                &spades;
            </button>
            <button
                class="bidding-button level-button nt-button"
                id="bidding-button-NT"
                class:selected={$selected_denom === 'NT'}
                on:click={() => suitClicked("NT")}>
                NT
            </button>
        </div>

        <div id="bidding-modifiers">
            <button
                class="bidding-button modifier-button pass-button"
                id="bidding-button-P"
                class:selected={$selected_modifier === 'P'}
                on:click={() => passClicked()}>Pass</button
            >
            <button
                class="bidding-button modifier-button double-button"
                id="bidding-button-X"
                class:selected={$selected_modifier === 'D'}
                on:click={() => modifierClicked("D")}>X</button
            >
            <button
                class="bidding-button modifier-button redouble-button"
                id="bidding-button-XX"
                class:selected={$selected_modifier === 'R'}
                on:click={() => modifierClicked("R")}>XX</button
            >
        </div>

    </div>
</main>

<style>
.display-panel {
    border-style: solid;
    border-radius: 1vh;
    border-width: 0.25vh;
    border-color: black;

    padding-top: 0vw;
    padding-left: 1vw;
    padding-right: 1vw;
    padding-bottom: 1vw;
}
    #bidding-box-popup {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: #eee;
        padding: 0.5vw;
        gap: 0.5vw;

        position: relative;
        margin-left: auto;
        margin-right: auto;
        width: 35vw;
    }

    #bidding-levels {
        margin: 0 auto;
        display: flex;
        gap: 1vw;
    }

    #bidding-suits {
        margin: 0 auto;
        display: flex;
        column-gap: 1vw;
    }

    #bidding-modifiers {
        margin: 0 auto;
        display: flex;
        column-gap: 1vw;
    }

    .bidding-button {
        background-color: #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        border-style: solid;
        border-radius: 1vh;
        border-width: 0.25vh;
        border-color: black;
        cursor: pointer;
    }

    .bidding-button.selected {
        /* background: #0066ff !important; */
        background: rgb(251, 232, 127) !important;
        /* color: white !important; */
        transform: scale(1.2) !important;
        box-shadow: 0 0 20px gold !important;
    }

    .bidding-button:disabled {
        background-color: #666;
        color: #999;
        cursor: not-allowed;
        opacity: 0.5;
        border-color: #444;
    }

    .level-button {
        height: 4vh;
        width: 3vw;
        font-size: 2vh;
        font-weight: 1000;
    }

    .suit-button {
        width: 6vh;
        height: 5vh;
        font-size: 3vh;
    }

    .modifier-button {
        height: 4vh;
        font-size: 2.5vh;
        padding-top: -3vh;
    }

    .nt-button {
        width: 6vh;
        height: 5vh;
        font-size: 2.5vh;
    }

    .pass-button {
        color: white;
        background-color: green;
    }

    .double-button {
        color: white;
        background-color: red;
    }

    .redouble-button {
        color: white;
        background-color: blue;
    }

</style>

<script>
import {
    selected_bid,
    selected_denom,
    selected_level,
    selected_modifier,
} from '../js/data-store'

const BIDDING_LEVELS = [1, 2, 3, 4, 5, 6, 7]

$selected_modifier = '';

function levelClicked(value) {
    if (value == 0) {
        return;
    }
    $selected_level = value;
    $selected_bid = '';

    if ($selected_denom != "") {
        bidClicked();
    }
    $selected_modifier = '';
}

function bidClicked() {
    $selected_bid = $selected_level + $selected_denom;
    }

function suitClicked(value) {
    $selected_denom = value;
    $selected_bid = '';
    if ($selected_level > 0) {
        bidClicked();
    }
    $selected_modifier = '';
}

function passClicked() {
    $selected_denom = "P";
    bidClicked();
    $selected_level = 0;
    $selected_denom = '';
    $selected_modifier = 'P';
    $selected_bid = 'P';
}

function modifierClicked(value) {
    $selected_denom = value;
    bidClicked();
    $selected_level = 0;
    $selected_denom = '';
    $selected_modifier = value;
    $selected_bid = value;
}

</script>
