<main>
    {#if $selector_visible}
        <h1>Bidding Practice</h1>
        <h3>Select conventions from the list below and practice your bidding.</h3>
            <Selector />
        <div>
            <button class="select-button"
            on:click={bidding}>Practice bidding</button>
        </div>
    {:else}
        <Question />
    {/if}
    <Description />
    {#if $show_save_section}
        <div class="bottom-right">
            <SaveSection />
        </div>
    {/if}
</main>

<style>
</style>

<script>
import { get } from 'svelte/store';
import SaveSection from "./lib/SaveSection.svelte";
import Selector from "./lib/Selector.svelte";
import Question from "./lib/Question.svelte";
import Description from "./lib/Description.svelte";
import {
    selector_visible,
    question_visible,
    conventions,
    selected_conventions,
    show_save,
    show_save_section,
    question,
} from './js/data-store'
import { getNewQuestion, initialiseStaticData } from "./js/common";

initialiseStaticData();

async function bidding() {
    var checked_conventions = reduceTree($conventions, findChecked)
    let selected = [];
    for (const convention in checked_conventions) {
        selected.push(convention);
    }
    $selected_conventions = selected;

    await getNewQuestion()
    var _question = get(question);
    if ( typeof _question == 'undefined' ) {
        return;
    }

    $selector_visible = false;
    $question_visible = true;
    $show_save = false;
}

function reduceTree(nodes, findChecked, acc = {}) {
    for (const node of nodes) {
        findChecked(node, acc);
        if (node.checked && node.children?.length > 0) {
            reduceTree(node.children, findChecked, acc);
        }
    }
    return acc;
}

function findChecked(node, acc) {
    if (node.checked && node.children?.length == 0 ) {
        acc[node.id] = node;
    }
}
</script>
