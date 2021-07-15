<template>
    <div class="setUsername">
        <input 
        type="text" 
        name="name" 
        id="name" 
        placeholder="dein Name" 
        onload="fillName()"
        >
        <input type="button" value="play" @click="logmein()" >
    </div>
</template>

<script>

export default {
    name: "SetUsername",
    props: {
        login: Boolean,
    },
    methods: {
        fillName() {
            if (localStorage){
                document.getElementById("name").value=localStorage.username;
            }
        },
        logmein() {
            if (document.getElementById("name").value){
                localStorage.setItem('username', document.getElementById("name").value);
                window.location.reload();
            } else {
                alert("bitte gib einen Namen ein")
            }
        }

    }
}
</script>

<style scoped>
    .warn {
        color: red;
        font-size: 10rem;
    }
</style>
