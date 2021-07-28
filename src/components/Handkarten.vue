<template>
    <div class="kartencontainer">
        <div v-if="!sort" class="kartencontainer unsortiert" >
        <div 
        v-for="karte in ownCards" 
        :key="karte" 
        class="karte"
        @click="playCard(karte)"
        :class="karte.farbe === '♦'|| karte.farbe === '♥'? 'rot' : 'schwarz'"
        
        >
            <div class="oben"> {{karte.zahl}} <i class="farbe"> {{karte.farbe}} </i></div>
            <div class="mitte"> {{karte.zahl}}</div>
            <div class="mitteBackground" > {{ karte.farbe }} </div> 
            <div class="unten"> {{karte.zahl}} <i class="farbe"> {{karte.farbe}} </i></div>
        </div>

        </div>
        <div v-if="sort" class="kartencontainer sortiert" >
        <div 
        v-for="karte in ownCardsSorted" 
        :key="karte" 
        class="karte"
        @click="playCard(karte)"
        :class="karte.farbe === '♦'|| karte.farbe === '♥'? 'rot' : 'schwarz'"
        
        >
            <div class="oben"> {{karte.zahl}} <i class="farbe"> {{karte.farbe}} </i></div>
            <div class="mitte"> {{karte.zahl}}</div>
            <div class="mitteBackground" > {{ karte.farbe }} </div> 
            <div class="unten"> {{karte.zahl}} <i class="farbe"> {{karte.farbe}} </i></div>
        </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "Handkarten",
    props: {
        ownCards: Array,
        ownCardsSorted: Array,
        sort: Boolean,
        dran: String,
    },
    data() {
        return {
            username: "Manuel"
        }
    },
    methods: {
        playCard(karte) {
            console.log({"zahl": karte.zahl, "farbe": karte.farbe})
            this.$emit('playCard', karte)
        },
        isred(color) {
            if (color == "♦" || color == "♥"){
                return "{color: red}";
            } else {
                return "{color: purple}";
            }
        }
    }
}
</script>

<style scoped>
    .karte {
        background-color: white; 
        border: calc(var(--kartenbreite)*0.03) solid black;
        border-radius: calc(var(--kartenbreite)*0.125);
        width: var(--kartenbreite);
        height: var(--kartenhoehe);
        position: relative;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center; 
        cursor: pointer;
        transition: 250ms ease;
        box-shadow: 1px 1px 5px 1px black;
        overflow: hidden;
        margin-right: calc(var(--kartenbreite)*-0.33);
        font-size: calc(var(--kartenbreite)*0.16);
    }
    .karte:last-child{
        margin:0;
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
        font-size: calc(var(--kartenbreite)*0.225);
    }
    .oben {
        position: absolute;
        top: 0px;
        left: 0px;
        margin-left: 5%;
    }
    .unten {
        position: absolute;
        bottom: 0px;
        right: 0px;
        margin-right: 5%;
        transform: rotate(180deg)

    }
    .mitte {
        font-size: calc(var(--kartenbreite)*0.45);
    }
    .mitteBackground{
        position: absolute;
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
        color: red;
    }
    .schwarz {
        color: black;
    }
    .inactive {
        cursor: not-allowed;
    }
    .active {
        cursor: pointer;
    }
    /*.inactive:hover,
    .inactive:focus {
        transform: inherit;
    }*/
</style>