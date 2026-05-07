<main>
    {#if $hide_title}
        <h1>Bidding practice</h1>
    {:else}
        <h1>{$title}</h1>
        <h3>{$subtitle}</h3>
    {/if}

    {#if $question_visible}
        {@html $preamble}<br>
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

        {#if bid_html}
            Your selection: {@html bid_html}
        {/if}

        {#if show_correct}
            <div class="correct">Correct</div>
        {/if}
        {#if show_wrong}
            <span class="wrong">Wrong</span>
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
</main>

<style>
.options {
    margin-left: 45%;
    gap: 1vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    font-size: 1.5vw;
    display: block;
}
.wrong {
    color:  red;
    font-size: 1.5vw;
    display: block;
}
</style>

<script>
import BiddingBox from './BiddingBox.svelte';
import SaveSection from './SaveSection.svelte';
import {selected_bid } from '../js/data-store'

import {
    title,
    subtitle,
    preamble,
    question,
    options,
    question_visible,
    description_visible,
    hide_title,
    correct_response,
    show_save_section,
    selected_denom,
    selected_level,
    selected_modifier,
}
from '../js/data-store'
import { getNewQuestion } from "../js/common";

let bid_html = '';
let show_correct = false;
let show_wrong = false;
let selected_option = ''

$: getSelection($selected_bid);

function getSelection(bid) {
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
    console.log(bid_html);
    console.log($correct_response);
    show_correct = false;
    show_wrong = false;
    if (!(bid === '')) {
        if (bid === $correct_response) {
            show_correct = true;
        } else {
            show_wrong = true;
        }
    }
}

function nextQuestion() {
    getNewQuestion()
    show_correct = false;
    show_wrong = false;
    bid_html = '';
    selected_option = '';
    $selected_denom = '';
    $selected_level = 0;
    $selected_modifier = '';
}

function displayConventionText() {
    $question_visible = false;
    $show_save_section = false;
    $description_visible = true
}
</script>
