<template>
    <div class="helloWorld">
        <div class="upper">
            <div v-for="player in players" :key="player" class="spielercontainer"> 
                <div class="spieler">
                    {{player.name}}: {{player.punkte}} <br>
                    {{player.aktuell}}/{{player.angesagt}}
                </div>
                <div class="gespielteKarte">
                    <div v-for="karte in playedCards" :key="karte" class="karte played">
                        <div class="oben"> {{karte.zahl}} <i class="farbe"> {{karte.farbe}} </i></div>
                        <div class="mitte"> {{karte.farbe}} </div>
                        <div class="unten"> {{karte.zahl}} <i class="farbe"> {{karte.farbe}} </i></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="kartencontainer">
            <div v-for="karte in ownCards" :key="karte" class="karte">
                <div class="oben"> {{karte.zahl}} <i class="farbe"> {{karte.farbe}} </i></div>
                <div class="mitte"> {{karte.farbe}} </div>
                <div class="unten"> {{karte.zahl}} <i class="farbe"> {{karte.farbe}} </i></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    data() {
        return {
            players: [
                {
                    name: "Manu",
                    punkte: 21,
                    angesagt: 2,
                    aktuell: 0
                }, 
                {
                    name: "Laura",
                    punkte: 33,
                    angesagt: 0,
                    aktuell: 0
                },
                {
                    name: "Jan",
                    punkte: 12,
                    angesagt: 2,
                    aktuell: 0
                },
                { 
                    name: "Simon",
                    punkte: 14,
                    angesagt: 1,
                    aktuell: 0
                }
            ],
            ownCards: [
                {zahl: "7", farbe: "♠"},
                {zahl: "10", farbe: "♣"},
                {zahl: "A", farbe: "♦"},
                {zahl: "D", farbe: "♥"},
                {zahl: "9", farbe: "♠"}
            ],
            playedCards: [
                { player: "Manu", zahl: "9", farbe: "♣"},
                //{ player: "Laura", zahl: "7", farbe: "♣"},
                //{ player: "Jan", zahl: "D", farbe: "♣"},
                //{ player: "Simon", zahl: "10", farbe: "♣"}
            ]
        }
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}
.upper {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
    .helloWorld{
        box-sizing: border-box;
        border: 2px solid black;
        width: 1000px;
        height: 600px;
        margin: auto;
        position: relative;
    }
    .spieler {
        border: 3px solid brown;
        padding: 10px;
        width: 100px;
        border-radius: 100px;
        position: relative;
        margin-top: 30px;
        font-size: .8rem;
        
    }
    .spielercontainer {
        margin-bottom: 5px;
        width: 100px;
        height: 400px;
        position: relative;

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
        cursor: pointer;
        transition: 250ms ease;
    }
    .karte:hover,
    .karte:focus {
        transform: translateY(-20px);
    }
    .played {
        margin-top: 5px;
    }
    .played:hover,
    .played:focus {
        transform: none;
        cursor: default;
    }
    .kartencontainer {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: center;
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
    }
    .krone {
        position: relative;
    }
    .krone::before {
        box-sizing: border-box;
        position: absolute;
        content: '';
        border: 5px solid transparent;
        height: 20px;
        width: 5px;
        border-bottom: 20px solid gold; 
        top: -30px;
        left: 40px;
    }
    .krone::after {
        box-sizing: border-box;
        position: absolute;
        content: '';
        border: 5px solid transparent;
        height: 20px;
        width: 5px;
        border-bottom: 20px solid gold; 
        top: -30px;
        left: 46px
    }


</style>
