<template>
    <div class="spielfeld">
        <!-- Raumliste -->
        <JoinGame 
        v-if="room===''" 
        v-on:change-room="changeRoom($event)" 
        v-on:toggle-create-game="toggleCreateGame()"
        v-on:create-game="createGame($event)"
        :create="create"
         />

         <!-- Raum beitreten und Namen wählen -->
        <div v-if="!isLoggedIn && room!=='' ">
            <div class="joinContainer">
                <input @input="joinPossible()" v-model='usernameInput' type="text" name="name" id="name" placeholder="dein Name" autofocus required>
                <p class="possible" >{{this.possibleText}}</p>
                <input type="checkbox" name="stay" id="stay" v-model='stay' >
                <label for="stay" class="stay">eingeloggt bleiben?</label>
                <br>
                <button id="play" @click="joinGame('player')"  >Spielen</button>
                <button id="watch" @click="joinGame('watcher')">Zuschauen</button>

            </div>

        </div>

        <!-- Warteraum und Reihenfolge bestimmen -->
        <div v-if="isLoggedIn && !isStarted">
            <button id="logout" @click="logout()"></button>
            <div class="players">
                <div v-for="player in players" :key="player" class="player">
                    <div class="avatar"></div>
                    <div class="playername">{{player.name}}</div>
                </div>
            </div>
            <div class="reihenfolge">
                <ol>
                    <li v-for="player in reihenfolge" :key="player"> {{ player }} </li>
                </ol>
            </div>
            <div class="randomise">
                <button @click="randomOrder()">&#9861; zufällig</button>
            </div>
            <button 
            class="start" 
            :class="(this.creator === this.username)? 'creator' : '' " 
            @click="startGame()"
            >Start</button>
        </div>

        <!-- das tatsächliche Spiel -->
        <div v-if="isLoggedIn && isStarted && !isEnded ">
            <button id="logout" @click="logout()"></button>
            <h3>Runde {{ runde.aktuell }} / {{ runde.maximal }}</h3>
            <p> {{ this.gamestate.anDerReihe }} ist an der Reihe.</p>
            <div class="tisch">
                <div v-if="ansagen.isAnsagen" class="ansagen" :class="{ spezial: runde.aktuell === 1 || runde.aktuell === runde.maximal }" >
                    <h2> {{ ansagen.aktuell }} muss ansagen! </h2>
                    <div class="moeglichkeitenContainer" v-if="ansagen.aktuell === username" >
                        <div class="option" v-for="option in ansagen.optionen" :key="option" @click="sagAn(option)" > {{ option }} </div>
                    </div>
                </div>
            </div>
            <Spieler 
            :players="players" 
            :playedCards="playedCards" 
            :dran="dran" 
            :fuehrung="fuehrung"
            :username="username"
            />
            <Handkarten :ownCards="ownCards" v-on:playCard="playCard($event)" :dran="dran" />
        </div>

        <!-- der Endscreen -->
        <div v-if="isEnded" >
            <button id="logout" @click="logout()"></button>
            <div class="endscreen" >
                 {{ fuehrung }} hat gewonnen! 
                <div class="pokal" >
                    1
                    <div class="pokalfuss" ></div>
                </div>


            </div>

        </div>
    </div> 
</template>

<script>
    import Handkarten from "@/components/Handkarten.vue";
    import Spieler from "@/components/Spieler.vue";
    import JoinGame from "@/components/JoinGame.vue";
    import io from "socket.io-client";
    import { mapActions } from 'vuex';
    // import axios from 'axios'



export default {
    name: "Spielfeld",
    components: {
        Handkarten,
        Spieler,
        JoinGame
    },
    props: {
        game: Object
    },
    data() {
        return {
            socket: {},
            create: false,
            gamestate: {},
            usernameInput: '',
            username: '',
            isLoggedIn: false,
            stay: false,
            possible: false,
            possibleText: '',
            room: '',
            runde: {},
            dran: "",
            fuehrung: "",
            creator: "",
            ansagen: {},
            reihenfolge: [],
            players: [],
            ownCards: [],
            playedCards: []
        }
    },
    created() {
        this.socket = io("https://wuppern.herokuapp.com/")
    },
    mounted() {
        if(localStorage.getItem('username')){
            this.username = localStorage.getItem('username');
            this.usernameInput = localStorage.getItem('username')
            this.joinPossible()
        }
        this.socket.on("gamestate", data => {
           this.handleGamestate(data)
        })
        this.socket.on("refresh", data => {
            if(data){
                this.socket.emit("refresh", true)
            }
        })
        this.socket.on('joinRoomError', errorMSG => {
            this.possibleText = errorMSG
        })
        this.socket.on('isLoggedIn', (bool) => {
            this.isLoggedIn = bool
        })
        if(this.game){
            this.room = this.$route.params
        }
        this.socket.on("joinRoom", (room, username) => {
            this.room = room
            this.usernameInput = username
            this.joinGame("player")
        })
    },
    methods: {
        playCard(karte){
            this.socket.emit('playCard', this.room, this.username, karte)
        },
        ...mapActions([
            'setGamestate',
        ]),
        joinPossible(){
            fetch( 
                "https://wuppern.herokuapp.com/joinPossible", 
                {
                    method: "POST",
                    body: JSON.stringify({
                        room: this.room,
                        name: this.usernameInput
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }
            )
            .then(response => {
                response.json().then(jdata => {
                    this.possible = jdata.possible
                    this.possibleText = jdata.error

                })
            })

            .catch(error => console.log("Error: ", error))
        },
        joinGame(option){
            if(option === "player"){
                if(this.usernameInput !== '.watcher'){ //geschützter Name
                    this.socket.emit('joinPossible', this.usernameInput, this.room)
                
                    if(this.possible){
                        this.socket.emit('joinRoom', this.usernameInput, this.room)
                        this.socket.emit('addPlayer', this.usernameInput, this.room)
                        this.username = this.usernameInput
                        if(this.stay === true){
                            localStorage.setItem('username', this.username)
                        }
                    }
                } else {
                    this.possibleText = "verbotener Name"
                }
            } else if (option === "watcher"){
                this.socket.emit('joinRoom', '.watcher', this.room)
                this.username = '.watcher'
            }

        },
        handleGamestate(data){
            if(data){
                let newGamestate = JSON.parse(data);
                this.gamestate = newGamestate
                this.$store.dispatch('setGamestate', newGamestate)
                this.players = this.$store.getters.getGamestate.players;
                this.playedCards = this.$store.getters.getGamestate.playedCards;
                this.runde = this.$store.getters.getGamestate.runde;
                this.ownCards = this.$store.getters.getGamestate.handkarten
                this.dran = this.$store.getters.getGamestate.anDerReihe
                this.fuehrung = this.$store.getters.getGamestate.fuehrung
                this.isStarted = this.$store.getters.getGamestate.isStarted
                this.isEnded = this.$store.getters.getGamestate.isEnded
                this.creator = this.$store.getters.getGamestate.creator
                this.reihenfolge = this.$store.getters.getGamestate.reihenfolge
                this.ansagen = this.$store.getters.getGamestate.ansagen
            }
        },
        logout(){
            /*this.isLoggedIn = false;
            this.username = '';
            this.socket.emit('logout')
            this.room = ''*/
            location.reload()
        },
        startGame(){
            this.socket.emit("startgame", this.room, true, this.username)
        },
        changeRoom(event){
            this.room = event
            this.joinPossible()
        },
        toggleCreateGame(){
           this.create = !this.create 
        },
        createGame(event){
            this.socket.emit("createNewGame", event.room, event.name)
        },
        randomOrder(){
            this.socket.emit("randomOrder", this.username, this.room)
        },
        sagAn(option){
            this.socket.emit("ansagen", this.room, this.username, option )
        }
    }
}
</script>

<style>
* {
    box-sizing: border-box;
}
</style>

<style scoped>
    .spielfeld {
    box-sizing: border-box;
    border: 2px solid black;
    min-width: 600px;
    max-width: 1000px;
    min-height: 600px;
    max-height: 1000px;
    margin: auto;
    position: relative;
    }
    .possible {
        font-size: .75rem;
        position: relative;
        padding: 0;
        margin-top: 0;
        color:red;
    }
    h3 {
        padding: 0;
        margin-bottom: 0;
    }
    .tisch {
        position: absolute;
        top: 35%;
        left: 5%;
        border: 3px solid grey;
        border-radius: 5px;
        background-image: url("../assets/seamlessWood.jpg") ;
        height: 33%;
        width: 90%;
    }
    .joinContainer {
        padding-top: 200px;
        height: 100%;
    }
    #name {
        border: none;
        border-bottom: 2px solid darkblue;
        width: 50%;
        height: 2em;
        font-size: 2rem;
        background-color: transparent;
        color: black;
    }
    .stay{
        font-size: 1.5rem;
        margin: 1em;
        position: relative;
        user-select: none;
        cursor: pointer;
    }
    .stay::before{
        content: '';
        position: absolute;
        left: -40px;
        width: 1.5rem;
        height: 1.5rem;
        background-color:darkred;
        clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
    }
    #stay{
        display: none;
    }
    #stay:checked ~ .stay::before{
        background-color: green;
        clip-path: polygon(50% 75%,87% 36%,100% 50%,50% 100%,12% 67%,24% 54%);
    }
    #play{
        width: 30%;
        height: 2em;
        background-color: rgb(30, 180, 30);
        color: white;
        font-size: 1.5rem;
        border-radius: 3px;
        cursor: pointer;
    }
    #watch{
        width: 20%;
        height: 2em;
        font-size: 1.5rem;
        background-color: rgb(153, 153, 153);
        border-radius: 3px;
        cursor: pointer;
    }
    #logout{
        background-color: rgb(68, 68, 68);
        position: absolute;
        top: 5px;
        right: 5px;
        height: 50px;
        width: 50px;
        clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
        cursor: pointer;
        transition: all 250ms ease-in-out;
        overflow: visible;
    }
    #logout:hover,
    #logout:focus {
        transform: rotate(.25turn);
        background-color: rgb(80, 80, 80)
    }
    .players{
        position: absolute;
        width: 60%;
        top:0;
        left: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        outline: 1px solid transparent;
        padding: 20px;
        flex-wrap: wrap;
        align-items: flex-start;


    }
    .player{
        width: 150px;
        height: 150px;
        position: relative;
        margin: 1px;
    }
    .playername{
        padding: 5px;
        border-radius: 3px;
        border: 2px solid black;
        background-color: grey;
        position: absolute;
        bottom: 5px;
        width: 100%;
        color: white;
        font-size: 1.5rem;
        z-index: -1;
    }
    .avatar {
        position: relative;
        left: 25px;
        top: 10px;
        width: 100px;
        height: 100px;
        border-radius: 50px;
        background-color: rgb(97, 116, 221);
        border: 2px solid blue;
        overflow: hidden;
        box-shadow: 1px 1px 5px 1px black;
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
    .reihenfolge{
        border: 1px solid black;
        margin: 10px;
        width: 300px;
        height: 300px;
        position: absolute; 
        right: 40px;
        top: 50px;
    }
    .start{
        position: absolute;
        right: 50px;
        bottom: 20px;
        font-size: 3rem;
        background-color: grey;
        color: white;
        border: none;
        border-radius: 2px;
        width: 300px;
        cursor: not-allowed;
    }
    .creator{
        background-color: blue;
        cursor: pointer;
    }
    .creator:hover{
        background-color: green;
    }
    .randomise{
        position: absolute;
        right: 125px;
        top: 380px;
        width: 150px;


    }
    .randomise button {
        width: 100%;
        font-size: 1.33rem;
        color: rgb(78, 78, 78);
        background-color: rgb(185, 185, 185);
        box-shadow: none;
        border: none;
        border-radius: 2px;
        cursor: pointer;
    }
    .ansagen {
        position: absolute;
        width: 96%;
        height: 80%;
        margin-left: 2%;
        top: 20px;
        background-color: lightgray;
        border: 3px solid grey;
        border-radius: 5px;
        z-index: 999;
    }
    .moeglichkeitenContainer {
        display: flex;
        width: 100%;
        max-height: 100px;
        margin: auto;
        flex-flow: nowrap;
        justify-content: space-around;
        margin-top: -10px;
        z-index: 10;
    }
    .option {
        width: 80px; 
        height: 80px;
        text-align: center;
        font-size: 2rem;
        padding: calc(40px - 1rem);
        background-color: white;
        color: grey;
        border: 3px solid rgb(150, 150, 150);
        border-radius: 5px;
        user-select: none;
        cursor: pointer;
        transition: all 250ms ease-in-out;

    }
    .option:hover,
    .option:focus {
        background-color: lightgreen;
        color: black;
        box-shadow: inset 0 0 3px 3px rgb(255, 255, 255)
    }
    .spezial{
        top: 110%;
    }




    .endscreen{
        position: absolute;
        top: 60px;
        left: 20%;
        width: 60%;
        height: 80%;
        background-color: grey;
        border: 5px solid rgb(71, 71, 71);
        border-radius: 10px;
        color: white;
        display: grid;
        align-content: center;
        font-size: 2rem;
    }
    .pokal{
        background-color: white;
        height: 100px;
        width: 75px;
        border-radius: 0px 0px 40% 40%;
        margin: auto;
        margin-top: 10px;
        position: relative;
        color: grey;
        padding-top: 20px;
        font-size: 3rem;
        user-select: none;
    }
    .pokal::before{
        content: '';
        background-color: transparent;
        border: 10px solid white;
        border-radius: 0 0 0% 100%;
        height: 40px;
        width: 35px;
        position: absolute;
        left: -25px;
        top: 7px;
    }
    .pokal::after{
        content: '';
        background-color: transparent;
        border: 10px solid white;
        border-radius: 0 0 100% 0%;
        height: 40px;
        width: 35px;
        position: absolute;
        right: -25px;
        top: 7px
    }
    .pokalfuss{
        background-color: white;
        height: 50px;
        width: 100%;
        position: absolute;
        bottom: -50px;
    }
    .pokalfuss::before{
        content: '';
        background-color: grey;
        width: 40%;
        height: 70%;
        position: absolute;
        left: 0;
        border-radius: 0 0 50% 0;
    }
    .pokalfuss::after{
        content: '';
        background-color: grey;
        width: 40%;
        height: 70%;
        position: absolute;
        right: 0;
        border-radius: 0 0 0 50%;
    }


</style>