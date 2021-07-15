<template>
    <div class="createGame">
        <div class="createGameForm">
            <form class="form" action="/Spiel">
                <div class="formElement">
                    <label for="name" required>Spiel Name</label>
                    <input id="name" name="name" type="text">
                </div>
                <div class="formElement">
                    <label for="spielerzahl">Spielerzahl</label>
                    <input 
                    type="number" 
                    id="spielerzahl" 
                    name="spielerzahl"
                    min="3"
                    max="8"
                    required
                    >
                </div>
                <div class="formElement">
                    <input type="submit" id="submit" value="Spiel erstellen">
                </div>
                
            </form>
        </div>
    </div>
</template>



<style scoped>
    .form {
        display: grid;
        align-content: center;
    }
    .formElement {
        margin: 10px;
    }
    label {
        margin-right: 1rem;
    }
    input {
        border: none;
        box-shadow: 0px 0px 3px 3px rgba(0,0,0, .5);
        padding: 5px;
    }
    #submit {
        width: 30%;
        background: blue;
        color: white;
        font-size: 1.5rem;
        letter-spacing: .1rem;
        padding: .5rem;
        cursor: pointer;
    }
    #submit:hover {
        opacity: .8;
    }
</style>