<main class="description">
    {#if $description_visible}
        {@html $convention_description}
    {/if}
</main>

    {#if $description_visible}
        <div class="bottom-right">
            <p class="orange-text clickable" on:click={close}>Close</p>
        </div>
    {/if}

<script>
import { tick } from 'svelte';
import {
    convention_description,
    description_visible,
    question_visible,
    show_save_section,
    hand_visible,
} from "../js/data-store";
import { displayHand } from "../js/card-display";

async function close() {
    $description_visible = false;
    $question_visible = true;
    $show_save_section = true;
    if ($hand_visible) {
        await tick();
        displayHand();
    }
}
</script>

<style>
.description {
    width:50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
