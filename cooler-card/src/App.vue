<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap');
    * {
        margin: 0;
        padding: 0;
        font-family: 'Kaushan Script', cursive;
    }

    body {
        width: 100vw;
        height: 100vh;
        background: url('./assets/wood.jpg') no-repeat center;
        background-size: cover;
    }

    #app {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
