<template>
    <div class="gameOverview">
        <table>
            <tr>
                <th>Name des Spiels</th>
                <th>Spieler</th>
                <th>läuft</th>
                <th>mitspielen</th>
            </tr> 
            <tr v-if="create">
                <td>
                    <input 
                v-model="roomInput" 
                type="text" 
                name="roomInput" 
                id="roomInput"
                autofocus
                    >
                </td>
                <td>
                    <input 
                    v-on:keyup.enter="createGame()"
                v-model="nameInput" 
                type="text" 
                name="nameInput" 
                id="nameInput"
                placeholder="dein Name"
                maxlength="12"
                    >
                </td>
                <td></td>
                <td><button class="button" @click="createGame()" >erstellen</button></td>
            </tr>
            <tr v-for="game in allGames" :key="game.name" > 
                <td> {{ game.room }} </td>
                <td> {{ game.players }} </td>
                <td v-if="game.isStarted" > ✓ </td>
                <td v-if="!game.isStarted" > ✗ </td>
                <td v-if="!game.isStarted" > <button 
                class="button" 
                @click="room(game)"
                >mitspielen ⏩</button> </td>
                <td v-if="game.isStarted" > <button 
                class="button grau" 
                @click="room(game)"
                >zuschauen ⏩</button> </td>
            </tr>
        </table>
    <div v-if="!allGames[0]" >
        derzeit gibt es kein laufendes Spiel, oder es konnte kein Spiel geladen werden.
    </div>
    </div>
</template>

<script>
export default {
    name: "GameOverview",
    props: {
        allGames: Array,
        create: Boolean
    },
    data(){
        return {
            nameInput: '',
            roomInput: ''
        }
    },
    methods: {
        room(game){
           this.$emit('change-room', game.room) 
        },
        createGame(){
            console.log("create-game", this.roomInput, this.nameInput)
            this.$emit('create-game', {room: this.roomInput, name: this.nameInput})
        }
    }
}
</script>

<style scoped>
    .gameOverview{
        position: relative;
        width: 100%;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding: 7px;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    tr {
        padding: 7px;
        background-color: rgb(235, 235, 235);
        background-color: var(--table-bg-clr);
        color: var(--table-row-txt-clr)
        
    }
    tr:nth-child(even){
        background-color: lightgrey;
        background-color: var(--table-bg-clr2);
    }
    tr:hover{
        background-color: rgb(223, 223, 223);
        background-color: var(--table-hover-bg-clr);
        color: var(--table-row-hover-txt-clr)
    }
    th {
        padding: 4px;
        border: 1px solid black;
        border: 1px solid var(--table-border-clr);
        border-bottom: 2px solid black;
        border-bottom: 2px solid var(--table-border-clr);
        border-collapse: none;
        background-color: grey;
        background-color: var(--table-head-bg-clr);
        color: white;
        color: var(--table-head-txt-clr);
    }
    td {
        border: 1px solid black;
        border: 1px solid var(--table-border-clr);
        border-collapse: collapse;
        padding: none;
    }
    .button {
        background: rgb(34, 190, 47);
        color: white;
        width: 100%;
        height:100%;
        padding: 3px;
        border-radius: 3px;
        border: none;
        box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        border: 1px solid green;
    }
    .button:hover {
        box-shadow: inset 0 0 1px 2px rgba(0, 0, 0, 0.2);
    }
    .grau {
        background-color: grey;
    }
    @media only screen and (orientation: portrait) {
        .button{
            height: 100px;
        }
        .td{
            font-size: 100px;
        }
    }
</style>