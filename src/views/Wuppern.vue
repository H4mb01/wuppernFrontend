<template>
    <div class="wuppern">
        <SetUsername v-if="false" :login="login" />
        <Spielfeld v-if="loggedIn" />
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