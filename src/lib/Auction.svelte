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
        /* width: clamp(300px, 30vw, 480px); */
        width: clamp(260px, 26vw, 420px);
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        background-color: #ccc;
    }

    #dealer-display {
        margin-bottom: 1vh;
        font-size: clamp(10px, 2.2vh, 20px);
    }

    #auction-table-main {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        align-items: center;
        justify-items: center;
        gap: clamp(6px, 1vh, 14px);
        column-gap: clamp(8px, 2vw, 24px);
        width: 100%;
        overflow-x: auto;
        font-size: clamp(12px, 1.8vh, 18px);
    }
 </style>

 <script>
    import {
            auction_visible,
            auction_image_html,
            dealer,
        } from '../js/data-store';
        console.log($auction_image_html);
 </script>