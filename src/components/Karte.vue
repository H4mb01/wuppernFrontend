<template>
    <div class="karte">
        <div class="oben">{{ Wert }}{{ Farbe }}</div>
        <div class="mitte">{{ Farbe }}</div>
        <div class="unten">{{ Wert }}{{ Farbe }}</div>
    </div>
</template>

<script>

export default {
      name: 'Karte',
      props: {
          Wert: String,
          Farbe: String,
      },
}

</script>


<style scoped>
    .karte {
        border: 1px solid black;
        border-radius: 12.5px;
        width: 100%;
        height: 100%;
        color: red;
        background: white;
        box-shadow: 1px 1px 5px 1px black;
    }
    .unten {
        transform: rotate(180deg);
        position: absolute;
        bottom: 5px;
        right: 5px;
    }
    .oben {
        position: absolute;
        top: 5px;
        left: 5px;
    }
    .mitte {
        position: absolute;
        top: 50%;
    }
</style>