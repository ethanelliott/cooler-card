<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
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

    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 1s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
</style>
