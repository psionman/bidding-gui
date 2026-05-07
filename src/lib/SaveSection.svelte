

<div id="save-section">
    <span id="save-widgets">
        <span class="checkbox-widgets">
            <input type="checkbox"
                class="check-button-text"
                id="hide-title"
                checked={$hide_title}
                on:change={toggleHideTitle}>
            <label for="save-selection">&nbsp; Hide title?</label>
        </span>
        {#if $show_save}
                <span class="checkbox-widgets">
                    <input type="checkbox"
                        class="check-button-text"
                        id="save-selection"
                        checked={$save_selection}
                        on:change={toggleSaveSelection}>
                    <label for="save-selection">&nbsp; Save selection?</label>
                </span>
        {/if}
        <div class="small-text">(sets cookie)</div>
        {#if $question_visible}
            <div class="orange-text clickable" on:click={returnToSelection}>
                Return to selection screen
            </div>
        {/if}
    </span>
</div>

<style>
#save-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

#save-widgets {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>

<script>
import Cookies from "js-cookie";
import { saveConventionCookie } from '../js/common'
import {
    save_selection,
    hide_title,
    conventions,
    show_save,
    selector_visible,
    question_visible,
} from '../js/data-store'


function toggleHideTitle() {
    const new_value = !$hide_title;
    hide_title.set(new_value);
    Cookies.set("titleCookie", new_value, { expires: 365 });
}

// Toggles save_selection and writes or removes the convention cookie accordingly.
// Does not reset convention checked states when saving is turned off.
function toggleSaveSelection() {
    const new_value = !$save_selection;
    save_selection.set(new_value);
    Cookies.set("selectionCookie", new_value, { expires: 365 });

    if (new_value) {
        saveConventionCookie($conventions);
    } else {
        Cookies.remove("conventionCookie");
    }
}

function returnToSelection() {
    $selector_visible = true;
    $question_visible = false;
    $show_save = true;
}
</script>
