<script>
    export let conventions;
    export let onToggle;
    export let onSelectChild;
    export let parentName = null;
</script>

{#each conventions as node (node.id)}
    <div>
        {#if parentName}
            <!-- Radio for children -->
            <span class="checkbox-widgets">
                <input type="radio"
                    class="check-button-text"
                    id={node.name + "-convention"}
                    name={parentName + "-child"}
                    value={node.id}
                    checked={node.checked}
                    on:click={() => onSelectChild(parentName, node.id)}>
                <label for={node.name + "-convention"}> {node.name}</label>
            </span>
        {:else}
            <!-- Checkbox for top-level -->
            <span class="checkbox-widgets">
                <input type="checkbox"
                    class="check-button-text"
                    id={node.name + "-convention"}
                    checked={node.checked}
                    on:change={() => onToggle(node.id)}>
                <label for={node.name + "-convention"}> {node.name}</label>
            </span>
        {/if}

        {#if node.children && node.checked}
            <div class="children">
                {#key node.id}
                    <svelte:self
                        conventions={node.children}
                        onToggle={onToggle}
                        onSelectChild={onSelectChild}
                        parentName={node.name}/>
                {/key}
            </div>
        {/if}
    </div>
{/each}

<style>
.children {
    margin-left: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
