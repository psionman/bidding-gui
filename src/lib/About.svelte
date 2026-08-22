{#if $about_visible}
    <div id="about-popup" class="display-panel">
        <button class="close-btn" on:click={cancel} aria-label="Close">×</button>
        <h3>About Bidding Practice</h3>
        <p>The Bidding Practice project was motivated by the conviction that:</p>
            <ul>
                <li>there are never too many resources for the beginner at bridge;</li>
                <li>conventions are easier to learn when you see relevant examples</li>
                <li>people want to practice on their own.</li>
            </ul>

        <h4>Acknowledgments</h4>
        <ul>
            <li>The development undertaken by Jeff Watkins.</li>
        </ul>

        <h4>Technology</h4>
                <ul>
                    <li>the web app framework is <a href="https://svelte.dev" target="_blank">Svelte</a>,
                        hosted on <a href="https://www.netlify.com" target="_blank">Netlify</a>;</li>
                    <li>the bidding and cardplay engines are written in
                        <a href="https://www.python.org" target="_blank">Python</a> using the
                        <a href="https://www.djangoproject.com" target="_blank">Django</a> framework;</li>
                    <li>the online documentation uses
                        <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank">Markdown</a>
                        and is presented by <a href="https://www.sphinx-doc.org/en/master/" target="_blank">Sphinx</a>.</li>
                </ul>

        <h4>Versions</h4>
        <div id="versions">
            <span>User Interface</span>{VERSION}
            <span>API</span>{api_version}
            <span>Bidding</span>{bidding_version}
            <!-- <span>Cardplay</span>{cardplay_version} -->
            <span>Dealer</span>{dealer_version}
            <span>Bridge objects</span>{bridgeobjects_version}

        </div>
        <div id="buttons">
            <!-- <a href={HELP_URL}  target="_blank"><button class="select-button">Online help</button></a> -->
            <button class="select-button" on:click={cancel}>Close</button>
        </div>
    </div>
{/if}

<style>
h3, h4 {
    margin: 0vh;
    color: black;   
}

#about-popup {
    display: flex;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    align-items: flex-start;
    background-color: #ccc;
    margin: 0 auto;
    width: clamp(280px, 85vw, 480px);
    max-width: 95vw;
    max-height: 85vh;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 1rem 1.25rem;
    text-align: left;
}

#versions {
    display: grid;
    grid-template-columns: 80% auto;
    margin-bottom: 2vh;
}

#buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5vw;
    align-self: center;
}

li {
    margin-left:10w;
}
a {
    color:  blue;
}

</style>

<script>
    import { onMount } from 'svelte';
    import { static_data, about_visible, help_visible } from '../js/data-store';
    import {VERSION} from "../js/version";
    import { initialiseStaticData } from '../js/common';
    // import { HELP_URL } from '../js/constants';
    // import { restoreState } from '../js/utilities';

    var api_version;
    var bidding_version;
    var cardplay_version;
    var dealer_version;
    var bridgeobjects_version;
    var year;

    onMount(() => {
        async function getVersions() {
            await getStatic_data();
        }
        getVersions()
    })

    async function getStatic_data() {
        await initialiseStaticData ();
        year = `${new Date().getFullYear()}`;
        api_version = $static_data.versions['api']
        bidding_version = $static_data.versions['bfgbidding']
        dealer_version = $static_data.versions['bfgdealer']
        bridgeobjects_version = $static_data.versions['bridgeobjects']
    }

    function cancel() {
        $about_visible = false;
        $help_visible = true;
    }
</script>