
{#if $auction_visible}
    <div id="main-panel"></div>
        <div id="auction-popup" class="display-panel">
        <div id="dealer-display">Dealer: {$dealer}</div>
        <div id="auction-table-main">{@html $auction_image_html}</div>
        </div>
{/if}


<style>
    #auction-popup {
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 1vh;
        width: 30vw;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        background-color: #ccc;
    }

    #dealer-display {
        margin-bottom: 1vh;
        font-size: 2.2vh;
    }

    #auction-table-main{
        display: grid;
        grid-template-columns: auto auto auto auto;
        align-items: center;
        justify-items: center;
        gap: 1vh;
        grid-column-gap: 2vw;

    }
 </style>

 <script>
    import {
            auction_visible,
            auction_image_html,
            dealer,
        } from '../js/data-store';
 </script>
