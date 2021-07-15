<template>
    <div class="joinGame">
        <button @click="toggleCreateGame()" class="createGame" >+ Neues Spiel</button>
        <button @click="getAllGames()">🗘 AKTUALISIEREN</button>
        <GameOverview 
        :create="create" 
        :allGames="allGames" 
        v-on:change-room="changeRoom($event)"
        v-on:create-game="createGame($event)"
        />
    </div>
</template>

<script>
import GameOverview from "@/components/GameOverview.vue"

export default {
    name: "joinGame",
    components: {
        GameOverview,
    },
    props: {
        create: Boolean,
    },
    data() {
        return {
            allGames: []
        }
    },

    methods: {
        getAllGames(){
            fetch("https://wuppern.herokuapp.com/getAllGames", {
                method: "GET",
                headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
            })
            .then(response => {
                response.json().then(data=>{
                    console.log(data)
                    this.allGames = data.allGames
                })
            })
            

        },
        changeRoom(event){
            this.$emit('change-room', event)
        },
        toggleCreateGame(){
            this.$emit('toggle-create-game')
        },
        createGame(event){
            this.$emit('create-game', event)
        }
    },
    mounted(){
       this.getAllGames() 
        
    },
    computed: {
        
    }
}
</script>

<style scoped>
    .joinGame {
        position: relative;
        width: 100%;
        display: grid;
        align-items: center;
        max-height: 100%;
        overflow: auto;
    }
    button {
        max-width: 80%;
        margin-left: 20%;
        margin-right: 20%;
        font-size: 1.2rem;
        cursor: pointer;
    }
    .createGame {
        margin-top: 10px;
        margin-bottom: 30px;

    }
</style>