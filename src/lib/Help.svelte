{#if $help_visible}
    <div id="help-popup" class="display-panel">
        <button class="close-btn" on:click={cancel} aria-label="Close">×</button>
        <h3>Bid for Game Help</h3>
        <button class="select-button" on:click={about}>About</button>
        <!-- <a href={HELP_URL}  target="_blank"><button class="select-button">Online help</button></a> -->
        <button class="select-button" on:click={cancel}>Close</button>
    </div>
{/if}

<style>
    #help-popup {
        display: flex;
        position: fixed;
        width: clamp(240px, 30vw, 400px);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        padding: 1.5rem 1rem;
        background-color: #ccc;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>

<script>
import {
        about_visible,
        help_visible,
        visible_state,
        question_visible,
        selector_visible,
        show_save,
        } from '../js/data-store';

function about() {
    $about_visible = true;
    $help_visible = false;
}

function cancel() {
    $help_visible = false;
    $question_visible = $visible_state.question;
    $selector_visible = $visible_state.selector;
    $show_save = $visible_state.show_save;
}
</script>