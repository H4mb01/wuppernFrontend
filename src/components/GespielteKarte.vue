<template>
    <div class="gespielteKarte">
        <div v-for="karte in playedCards" :key="karte">
            <div 
            v-if="karte.player === playerName" 
            class="karte played"
            :class="karte.farbe === '♦'|| karte.farbe === '♥'? 'rot' : 'schwarz'"
            >
                <div class="oben"> {{karte.zahl}} <i class="farbe"> {{karte.farbe}} </i></div>
                <div class="mitte"> {{karte.zahl}} </div>
                <div class="mitteBackground" > {{ karte.farbe }} </div> 
                <div class="unten"> {{karte.zahl}} <i class="farbe"> {{karte.farbe}} </i></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GespielteKarte",
        props: {
            playedCards: Array,
            playerName: String,
        },
    }
</script>

<style scoped>
    .played {
        margin-top: 5px;
    }
    .karte {
        background-color: var(--karte-bg);
        border: calc(var(--kartenbreite)*0.03) solid black;
        border-radius: calc(var(--kartenbreite)*0.125);
        width: var(--kartenbreite);
        height: var(--kartenhoehe);
        position: relative;
        top: calc(-1*(var(--avatar)/4));
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        font-size: calc(var(--kartenbreite)*0.16);
    }
     .farbe {
        font-size: calc(var(--kartenbreite)*0.225);
    }
    .oben {
        position: absolute;
        top: 0px;
        left: 0px;
        margin-left: 5px;
    }
    .unten {
        position: absolute;
        bottom: 0px;
        right: 0px;
        margin-right: 5px;
        transform: rotate(180deg)

    }
    .mitte {
        font-size: 4rem;
        font-size: calc(var(--kartenbreite)*0.45);
    }
   .oben {
        position: absolute;
        top: 0px;
        left: 0px;
        margin-left: 5px;
    }
    .unten {
        position: absolute;
        bottom: 0px;
        right: 0px;
        margin-right: 5px;
        transform: rotate(180deg)

    }
    .mitteBackground{
        position: absolute;
        font-size: 10rem;
        font-size: calc(var(--kartenbreite)*1.48);
        top: -17.5%;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: visible;
        text-align: center;
        opacity: 0.17;
        padding: 0;
    }
    .rot {
        color: var(--karte-rot);
    }
    .schwarz {
        color: var(--karte-schwarz);
    }
</style>