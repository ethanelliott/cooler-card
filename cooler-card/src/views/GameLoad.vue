<template>
    <div class="home">
        <div class="scroll-container">
            <div class="header">
                <h1 class="title">COOL CARD DUEL</h1>
            </div>
            <div class="content">
                <div class="main">
                    <div>
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
            <div class="footer">
                <p class="copyright">Made with ❤ by <a href="https://github.com/ethanelliott/">Ethan</a></p>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'GameLoad',
        data: () => ({}),
        mounted() {
            setTimeout(() => {
                this.$router.push('/game');
            }, 3000);
        }
    }
</script>

<style>
    .home {
        width: 100%;
        max-width: 1600px;
        height: 100%;
        max-height: 95vh;
        background: url('../assets/scroll.png') no-repeat center;
        background-size: contain;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .scroll-container {
        width: 75%;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .title {
        text-transform: uppercase;
        letter-spacing: 3px;
        font-size: 50px;
    }

    .header {
        flex-grow: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content {
        flex-grow: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .main {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: row;
        font-size: 40px;
        width: 80%;
    }

    .main > * {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .main > * > * {
        margin-top: 1em;
        margin-bottom: 1em;
    }

    .code-input {
        outline: none;
        padding: 1em;
        font-family: Consolas, monospace;
    }

    .game-btn {
        outline: none;
        border: none;
        background: black;
        color: white;
        padding: 1em;
        font-size: 20px;
    }

    .game-btn:hover {
        cursor: pointer;
    }

    .footer {
        flex-grow: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .copyright {
        font-size: 14px;
    }

    .copyright > a {
        text-decoration: none;
        color: red;
    }
</style>