<main>
    <div id="conventions">
        <ConventionList
            conventions={$conventions}
            onToggle={toggleConvention}
            onSelectChild={selectChild}/>
    </div>
</main>
    <div class="bottom-right">
        <SaveSection />
    </div>

<style>
#conventions {
    width: 30%;
    margin-left: 45%;
    gap: 1vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>

<script>
import Cookies from "js-cookie";
import SaveSection from "./SaveSection.svelte";
import ConventionList from './ConventionList.svelte';
import { onMount } from 'svelte';
import { getConventions } from '../js/api';
import { save_selection, hide_title, conventions } from '../js/data-store'
import { saveConventionCookie } from "../js/common";

// save_selection is initialised from the selectionCookie in data-store.js
let initialised = false;

// Converts a raw API node into a UI node with checked state.
// If a saved cookie exists, restores the checked state from it;
// otherwise defaults to false.

function enhanceTree(node, cookie_conventions = {}) {
    return {
        ...node,
        checked: cookie_conventions.hasOwnProperty(node.id)
            ? cookie_conventions[node.id]
            : false,
        children: node.children?.map(child => enhanceTree(child, cookie_conventions))
    };
}

onMount(() => {
    const title_cookie = Cookies.get("titleCookie");
    if (title_cookie !== undefined) {
        hide_title.set(title_cookie === "true");
    }

    const selection_cookie = Cookies.get("selectionCookie");
    if (selection_cookie !== undefined) {
        save_selection.set(selection_cookie === "true");
    }

    // Restore saved convention state if it exists
    const convention_cookie = Cookies.get("conventionCookie");
    let cookie_conventions = {};
    if (convention_cookie !== undefined) {
        cookie_conventions = JSON.parse(convention_cookie);
    }

    async function loadConventions(cookie_conventions) {
        const data = await getConventions();
        const tree = data.map(node => enhanceTree(node, cookie_conventions));
        conventions.set(tree);
        initialised = true;
    }
    loadConventions(cookie_conventions);
});

function selectChild(parentName, childId) {
    conventions.update(tree => selectInTree(tree, parentName, childId));
    if ($save_selection) {
        saveConventionCookie($conventions);
    }
}function selectInTree(nodes, parentName, childId) {
    return nodes.map(node => {
        if (node.name === parentName) {
            return {
                ...node,
                children: node.children.map(child => ({
                    ...child,
                    checked: node.any
                        ? child.id === childId ? !child.checked : child.checked  // toggle individual
                        : child.id === childId  // radio — only one
                }))
            };
        }
        if (node.children?.length > 0) {
            return { ...node, children: selectInTree(node.children, parentName, childId) };
        }
        return node;
    });
}

// Toggles a convention's checked state and saves to cookie if save_selection is on
function toggleConvention(id) {
    conventions.update(tree => toggleInTree(tree, id));
    if ($save_selection) {
        saveConventionCookie($conventions);
    }
}

function toggleInTree(nodes, id) {
    return nodes.map(node => {
        if (node.id === id) {
            return { ...node, checked: !node.checked };
        }
        if (node.children?.length > 0) {
            return { ...node, children: toggleInTree(node.children, id) };
        }
        return node;
    });
}
</script>
