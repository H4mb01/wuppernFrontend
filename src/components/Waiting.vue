<template>
    <div class="waiting">
        <div class="waitingMessage">
            <span>Auf alle Spieler warten</span>
            <span class="aa">.</span>
            <span class="ab">.</span>
            <span class="ac">.</span>
        </div>
    </div>
</template>

<script></script>

<style scoped>
    .waiting{
        position: absolute;
        background: rgb(61, 61, 61);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        display: grid;
        align-content: center;
    }

    .waitingMessage {
        position: relative;
        color: white;
        font-size: 3rem;
    }

    .aa, .ab, .ac {
        animation-name: waitingDots;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        margin-left: .2ch;
    }

    .ab {
        animation-delay: 0.66s;
    }

    .ac {
        animation-delay: 1.33s;
    }

    @keyframes waitingDots {
        0% {}
        20% {opacity: 5%}
        40% {}
        100% {}
    }
</style>
