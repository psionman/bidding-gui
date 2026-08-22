<!-- Question.svelte -->
<div class="centred">
    <h1>Bidding practice</h1>

    {#if $hide_title }
        <!-- <h2>{$theme}</h2> -->
    {:else}
        <h2>{$theme}</h2>
        <!-- <h3>{$subtitle}</h3> -->
    {/if}

    {#if $question_visible}
        {#if $preamble_visible}
            {@html $preamble}<br>
        {/if}

        {#if $auction_visible}
            <Auction />
        {/if}
        
        {#if $hand_visible}
            <p></p>
            <div id="hand-container">
                <canvas id="hand-image"></canvas>
            </div>
        {/if}
        {$question}

        {#if $options == ''}
            <BiddingBox />
        {:else}
            <div class="options">
                {#each $options as option}
                    <span class="checkbox-widgets">
                        <input type="radio"
                            class="check-button-text"
                            id={option}
                            name={'options'}
                            value={option}
                            on:click={() => showCorrectWrong(option)}
                            bind:group={selected_option}
                            >

                        <label for={option}> {@html option}</label>
                    </span>
                {/each}
            </div>
        {/if}
        {#if $show_correct}
                <div class="correct">Correct</div>
            {:else if $show_wrong}
                <div id="wrong-container"><span class="wrong">Wrong</span>
                <button class="select-button"
                on:click={showCorrectResponse}>Show correct</button></div>
            {:else}
                <span class="blank-line">&nbsp;</span>
            {/if}
            {#if $correct_response_visible}
                <div><span class="correct">Correct response:</span> {@html $correct_response}</div>
            {/if}

        <div class="buttons" id="next-button">
            <button class="select-button"
            on:click={nextQuestion}>Next</button>
            <div class="orange-text clickable" on:click={displayConventionText}>
                Display convention
            </div>
        </div>

        <div class="bottom-right">
            <SaveSection />
        </div>
        {/if}
</div>

<style>
.centred {
	text-align: center;
}
.options {
    margin-top: 2vh;
    margin-left: 45%;
    gap: 1vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

@media (max-width: 480px) {
    .options {
        margin-left: 0;
        padding-left: 1rem;
    }
}

.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
}

main {
    height: 100%;
    margin: 0;
}

#next-button {
    margin-top: 2vh;
}

.correct {
    color: green;
    font-size: clamp(16px, 1.5vw, 22px);
}
.wrong {
    color:  red;
    font-size: clamp(16px, 1.5vw, 22px);
    display: block;
}
#wrong-container {
    margin-left: 45%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1vw;
}

@media (max-width: 480px) {
    #wrong-container {
        margin-left: 0;
        justify-content: center;
        width: 100%;
    }
}

#hand-container {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;

}
#hand-image {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
    border: 2px solid black;
}
.blank-line {
    font-size: 1.5vw;
}
</style>

<script>import { onMount } from 'svelte';

import BiddingBox from './BiddingBox.svelte';
import Auction from './Auction.svelte';
import SaveSection from './SaveSection.svelte';
import {
    auction_visible, 
    selected_bid, 
    hand_visible } from '../js/data-store'

import {
    theme,
    title,
    preamble,
    question,
    options,
    question_visible,
    description_visible,
    preamble_visible,
    hide_title,
    correct_response,
    show_save_section,
    selected_denom,
    selected_level,
    selected_modifier,
    show_correct,
    show_wrong,
}
from '../js/data-store'
import { getNewQuestion } from "../js/common";
import { displayHand } from "../js/card-display";
import { setAuctionHTML} from "../js/auction";
import { auction_calls, correct_response_visible } from "../js/data-store";
    import { get } from 'svelte/store';

let bid_html = '';
let selected_option = ''

$: getSelection($selected_bid);

onMount(() => {
    displayHand();
    setAuctionHTML()});

function getSelection(bid) {
    if (!bid) return;
    const calls = get(auction_calls);
    calls.pop();
    calls.push(bid);
    auction_calls.set(calls);
    setAuctionHTML();
    bid_html = getBidHTML(bid)
    showCorrectWrong(bid)
}

function getBidHTML(bid) {
    bid_html = ''
    if (bid === 'P') {
        bid_html = 'Pass'
    } else if (bid === 'D') {
        bid_html = 'Double'
    } else if (bid === 'R') {
        bid_html = 'Redouble'
    } else if (bid.charAt(1) === 'C') {
        bid_html = bid.charAt(0) + '<span class="black-suit">&clubs;</span>';
    } else if (bid.charAt(1) === 'D') {
        bid_html = bid.charAt(0) + '<span class="red-suit">&diams;</span>';
    } else if (bid.charAt(1) === 'H') {
        bid_html = bid.charAt(0) + '<span class="red-suit">&hearts;</span>';
    } else if (bid.charAt(1) === 'S') {
        bid_html = bid.charAt(0) + '<span class="black-suit">&spades;</span>';
    } else if (bid.charAt(1) === 'N') {
        bid_html = bid;
    }
    return bid_html
}

function showCorrectWrong(bid) {
    $show_correct = false;
    $show_wrong = false;
    $correct_response_visible = false;
    if (!(bid === '')) {
        if (bid === $correct_response) {
            $show_correct = true;
        } else {
            $show_wrong = true;
        }
    }
}

async function nextQuestion() {
    await getNewQuestion();
    displayHand();
    setAuctionHTML(['cursor']);
    $show_correct = false;
    $show_wrong = false;
    bid_html = '';
    selected_option = '';
    $selected_denom = '';
    $selected_level = 0;
    $selected_modifier = '';
    $correct_response_visible = false;
}

function displayConventionText() {
    $question_visible = false;
    $show_save_section = false;
    $description_visible = true;
}

function showCorrectResponse() {
    $correct_response_visible = true;
}
</script>
