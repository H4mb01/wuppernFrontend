<template>
    <div class="gespielteKarte">
        <div v-for="karte in playedCards" :key="karte">
            <div 
            v-if="karte.player === playerName" 
            class="karte played"
            :class="karte.farbe === '♦'|| karte.farbe === '♥'? 'rot' : 'schwarz'"
            >
                <div class="oben"> {{karte.zahl}} <i class="farbe"> {{karte.farbe}} </i></div>
                <div class="mitte"> {{karte.farbe}} </div>
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
        background-color: white;
        border: 3px solid black;
        border-radius: 12.5px;
        width: 100px;
        height: 150px;
        position: relative;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
     .farbe {
        font-size: 1.5rem;
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
    }
    .rot {
        color: red;
    }
    .schwarz {
        color: black;
    }   .farbe {
        font-size: 1.5rem;
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
    }
    .rot {
        color: red;
    }
    .schwarz {
        color: black;
    }
</style>