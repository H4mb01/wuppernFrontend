<template>
<div class="upper">
    <div v-for="player in players" :key="player" class="spielercontainer">
        <div class="avatar" >
            <div :class="player.name === fuehrung ? 'führung' : ''"></div>
        </div>
        <div v-if="dran === player.name" class="dran">DRAN</div>
        <div class="spieler">
            <span class="b" v-bind:class="{du: (username === player.name)}" >{{player.name}}</span> <br>

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
    .dran{
        min-width: calc(var(--avatar)*.4);
        border: 2px solid red;
        border: 2px solid var(--du-clr);
        border-radius: calc(var(--avatar)*.05);
        background: transparent;
        position: absolute;
        right: calc(var(--avatar)*-0.03);
        top: calc(var(--avatar)*0.5);
        transform: rotate(330deg);
        z-Index: 4;
        font-size: calc(var(--avatar)/6);
        color: red;
        color: var(--du-clr);
        padding: calc(var(--avatar)/48) calc(var(--avatar)/24);
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
        border: calc(var(--avatar)*0.03) solid rgb(148, 63, 30);
        border: calc(var(--avatar)*0.03) solid var(--spielerinfo-clr2);
        padding: calc(var(--avatar)*0.02);
        padding-top: calc(var(--avatar)/10);
        padding-bottom: calc(var(--avatar)/10);
        width: var(--avatar);
        border-radius: calc(var(--avatar)/10);
        position: relative;
        top: calc(-1*(var(--avatar)/4));
        background-color: rgb(247, 213, 168);
        background-color: var(--spielerinfo-clr);
        margin-top: 0px;
        font-size: calc(var(--avatar)/8);
        box-shadow: 1px 1px 5px 1px black;
        user-select: none;
        overflow: hidden;
    }
    .spielercontainer {
        margin-bottom: 5px;
        width: var(--avatar);
        height: calc(var(--avatar)*3.2);
        position: relative;
        z-index: 3;
    }
    .du{
        text-decoration: underline;
    }

    .avatar {
        position: relative;
        width: var(--avatar);
        height: var(--avatar);
        border-radius: var(--avatar);
        background-color: rgb(97, 116, 221);
        background-color: var(--avatar-clr);
        border: 2px solid blue;
        border: 2px solid var(--avatar-clr2);
        overflow: hidden;
        box-shadow: 1px 1px 5px 1px black;
        transition: all 250ms ease-in-out;
    }
    .avatar::before {
        content: '';
        background-color: blue;
        background-color: var(--avatar-clr2);
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
        background-color: var(--avatar-clr2);
        height: 100%;
        width: 80%;
        border-radius: var(--avatar);
        position: absolute;
        top: 50%;
        left: 10%;
    }
    .dran::before,
    .dran::after {
        background-color: green;
        background-color: var(--avatar-active-clr2);
    }
    .führung {
        width: 20%;
        height: 20%;
        background-color: gold;
        background-color: var(--avatar-krone-clr);
        position: absolute;
        top: 5%;
        left: 40%;
        z-Index: 2;
        clip-path: polygon(50% 0%,75% 65%,100% 0%,100% 100%,1% 100%,0% 0%,25% 65%);
    }
    .korrekt{
        color: green;
        color: var(--korrekt-clr);
        font-weight:bold;
    }
    .inkorrekt{
        color:red;
        color:var(--warning-clr);
    }
    .big{
        transform:scale(1.0)
    }
</style>