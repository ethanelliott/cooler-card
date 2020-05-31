<template>
    <div class="home">
        <div class="scroll-container">
            <div class="header">
                <h1 class="title">COOL CARD DUEL</h1>
            </div>
            <div class="content">
                <div class="main">
                    <div>
                        <p>Join a game</p>
                        <p class="error">{{ joinError }}</p>
                        <input v-model="code" class="code-input" type="text" placeholder="code" />
                        <input v-model="name" class="code-input" type="text" placeholder="nickname" />
                        <input v-model="joinPassword" class="code-input" type="password" placeholder="game password" />
                        <input class="game-btn" type="button" value="Join" @click="joinGame" />
                    </div>
                </div>
            </div>
            <div class="footer">
                <p class="copyright">Made with ❤ by <a href="https://github.com/ethanelliott/">Ethan</a></p>
                <p class="copyright">BOYS SUPPORT BOYS</p>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import sha256 from 'sha256';

    export default {
        name: 'Home',
        data: () => ({
            code: '',
            name: '',
            joinPassword: '',
            joinError: ''
        }),
        methods: {
            joinGame() {
                axios.post('/join', {
                    code: this.code.toUpperCase(),
                    nickname: this.name,
                    password: sha256(this.joinPassword)
                }).then(({data}) => {
                    if (data.error) {
                        console.error(data.error);
                        this.joinError = data.error;
                    } else if(data.token) {
                        this.$router.push(`/start/${data.token}`);
                    }
                }).catch(console.error);
            }
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
        font-size: 60px;
        margin-top: 3vh;
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
        flex-direction: column;
    }

    .copyright {
        font-size: 14px;
        margin-top: 1em;
    }

    .copyright > a {
        text-decoration: none;
        color: red;
    }

    .hint {
        font-size: 14px;
        font-family: monospace;
        font-weight: bold;
    }

    .error {
        font-size: 14px;
        font-family: monospace;
        font-weight: bold;
        color: red;
    }
</style>