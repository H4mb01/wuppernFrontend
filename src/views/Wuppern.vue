<template>
    <div class="wuppern">
        <router-link to="/help" class="help" target="_blank" >?</router-link>
        <SetUsername v-if="false" :login="login" />
        <Spielfeld v-if="true" />
    </div>
</template>

<script>
import Spielfeld from "@/components/Spielfeld.vue";
import SetUsername from "@/components/SetUsername.vue";


export default {
    name: "Wuppern",
    data() {
        return {
            login: false,
        }
    },
    components: {
        Spielfeld,
        SetUsername,
    },
    computed: {
        loggedIn() {
            if (localStorage.username) {
                return true;
            } else {
                return false;
            }
        }
    }
}

</script>

<style>

:root{
    --back-btn-clr: rgb(165, 165, 165);
}

.help{
    position: absolute;
    top: 5px;
    left: calc(var(--hoehe-cs)/1.5 + 5px);
    text-decoration: none;
    font-weight: 600;
    background-color: rgb(54, 54, 54);
    border-radius: 300px;
    color: rgb(165, 165, 165);
    color: var(--back-btn-clr);
    cursor: pointer;
    z-index: 9999;
    font-size: 27px;
    width: 30px;
    height: 30px;
    opacity: .8;
    text-align: center;
}
.back:hover{
    opacity: 1;
}
</style>