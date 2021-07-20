<template>
<div class="upper">
    <div v-for="player in players" :key="player" class="spielercontainer">
        <div class="avatar" v-bind:class="{dran: (dran===player.name), big: (dran===player.name && player.name===username)}" >
            <div :class="player.name === fuehrung ? 'führung' : ''"></div>
        </div>
        <div v-if="username === player.name" class="du">DU</div>
        <div class="spieler">
            <span class="b">{{player.name}}</span> <br>

            <span class="b" > {{player.punkte}} </span>  
            (<span :class="(player.aktuell === player.angesagt ? 'korrekt' : 'inkorrekt')">{{player.aktuell}}</span>/{{player.angesagt}})
        </div>
        <GespielteKarte :playedCards="playedCards" :playerName="player.name" />
    </div>
</div>
</template>

<script>
    import GespielteKarte from "@/components/GespielteKarte";

    export default {
        name: "Spieler",
        components: {
            GespielteKarte,
        },
        props: {
            players: Array,
            playedCards: Array,
            dran: String,
            fuehrung: String,
            username: String,
        },
        methods: {
            pointColor: function (player) {
                if (player.aktuell === player.angesagt){
                    return "green";
                } else if (player.aktuell > player.angesagt){
                    return "red";
                } else {return "yellow"}
            },
        }
    }
</script>

<style scoped>
    .du{
        min-width: 40px;
        min-height: 25px;
        border: 2px solid red;
        border-radius: 5px;
        background: transparent;
        position: absolute;
        right: -3px;
        top: 50px;
        transform: rotate(330deg);
        z-Index: 4;
        font-size: 1rem;
        color: red;
        padding: 0;
        font-weight: bold;
        user-select: none;

    }
    .b {
        font-weight: bold;
    }
    .upper {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .spieler {
        border: 3px solid rgb(148, 63, 30);
        padding: 2px;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100px;
        border-radius: 10px;
        position: relative;
        top: -25px;
        background-color: rgb(247, 213, 168);
        margin-top: 0px;
        font-size: .8rem;
        box-shadow: 1px 1px 5px 1px black;
        user-select: none;
    }
    .spielercontainer {
        margin-bottom: 5px;
        width: 100px;
        height: 320px;
        position: relative;
        z-index: 3;
    }
    .avatar {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 50px;
        background-color: rgb(97, 116, 221);
        border: 2px solid blue;
        overflow: hidden;
        box-shadow: 1px 1px 5px 1px black;
        transition: all 250ms ease-in-out;
    }
    .avatar::before {
        content: '';
        background-color: blue;
        height: 28%;
        width: 28%;
        border-radius: 250px;
        position: absolute;
        top: 20%;
        left: 36%;
        z-Index: 3;
    }
    .avatar::after {
        content: '';
        background-color: blue;
        height: 100%;
        width: 80%;
        border-radius: 250px;
        position: absolute;
        top: 50%;
        left: 10%;
    }
    .dran {
        background-color: rgb(120, 209, 120);
        border: 3px solid green;
    }
    .dran::before,
    .dran::after {
        background-color: green;
    }
    .führung {
        width: 20%;
        height: 20%;
        background-color: gold;
        position: absolute;
        top: 5%;
        left: 40%;
        z-Index: 2;
        clip-path: polygon(50% 0%,75% 65%,100% 0%,100% 100%,1% 100%,0% 0%,25% 65%);
    }
    .korrekt{
        color: green;
        font-weight:bold;
    }
    .inkorrekt{
        color:red;
    }
    .big{
        transform:scale(1.2)
    }
</style>