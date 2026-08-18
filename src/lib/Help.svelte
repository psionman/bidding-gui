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
        width: 15vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        flex-direction: column;
        align-items: center;
        background-color: #ccc;
        margin: 0 auto;
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
