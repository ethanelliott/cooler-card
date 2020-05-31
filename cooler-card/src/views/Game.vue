<template>
    <div class="home">
        <div class="scroll-container">
            <div class="header">
                <h1 class="title">which card is cooler?</h1>
            </div>
            <div class="content">
                <transition name="card" mode="out-in">
                    <div class="card-wrapper" :key="card2Image">
                        <div class="card-container">
                            <div class="card link" @click="vote(1)">
                                <img :class="voted1 ? 'selected' : ''" :src="card1Image"/>
                                <p>{{ name1 }}</p>
                            </div>
                            <div class="card">
                                <p>VS</p>
                            </div>
                            <div class="card link" @click="vote(2)">
                                <img :class="voted2 ? 'selected' : ''" :src="card2Image"/>
                                <p>{{ name2 }}</p>
                            </div>
                        </div>
                    </div>

                </transition>
            </div>
            <div class="footer">
                <button v-if="admin" class="next-btn" @click="drawCards">
                    Duel
                </button>
                <button class="next-btn" :disabled="!voted1 || !voted2" @click="submitVote">
                    Submit Vote
                </button>
            </div>
        </div>
        <div class="side-scroll">
            <div class="side-scroll-container">
                <h1>Players</h1>
                <ol class="name-list">
                    <li v-for="(e, i) in users" :key="i">
                        <span style="margin-left: 0.5em">{{ e.name }} - {{ e.score }}</span>
                    </li>
                </ol>
            </div>
        </div>
        <div class="leave-container" @click="leave">
            Leave Game
        </div>
        <div class="code-container">
            {{ code }}
        </div>
    </div>
</template>

<script>
    import io from "socket.io-client";


    export default {
        name: 'Game',
        data: () => ({
            admin: false,
            card1Image: '',
            card2Image: '',
            name1: '',
            name2: '',
            allUsers: [],
            code: '',
            voted1: false,
            voted2: false
        }),
        computed: {
            users() {
                const u = [...this.allUsers];
                return u.sort((a, b) => a.score - b.score);
            },
            token() {
                return localStorage.getItem('token');
            }
        },
        mounted() {
            this.socket = io(this.$socketURL);
            this.socket.on('connect', () => {
                console.log('connected!');
                this.socket.emit('bind-events', {token: this.token});
                this.socket.emit('admin-check', {
                    token: this.token
                });
                this.socket.emit('get-code', {
                    token: this.token
                });
                this.socket.emit('get-users', {
                    token: this.token
                });
            });
            this.socket.on('admin', (isAdmin) => {
                this.admin = isAdmin;
            });
            this.socket.on('code', (code) => {
                this.code = code;
            });
            this.socket.on('users', (users) => {
                this.allUsers = users;
            });
            this.socket.on('leave', () => {
                this.leave();
            });
            this.socket.on('duel', (data) => {
                this.voted1 = false;
                this.voted2 = false;
                this.card1Image = data.card1.url;
                this.card2Image = data.card2.url;
                this.name1 = data.card1.user.name;
                this.name2 = data.card2.user.name;
            });
        },
        beforeDestroy() {
            this.socket.close();
        },
        methods: {
            async drawCards() {
                this.socket.emit('d-d-d-duel', {token: this.token});
            },
            leave() {
                this.socket.emit('leaving', {
                    token: this.token
                })
                localStorage.removeItem('token');
                this.$router.push('/');
            },
            submitVote() {
                this.socket.emit('vote', {token: this.token, number: (this.voted1 ? 1 : 2)});
            },
            vote(number) {
                this.voted1 = false;
                this.voted2 = false;
                if (number === 1) {
                    this.voted1 = true;
                } else {
                    this.voted2 = true;
                }
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

    .footer {
        flex-grow: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row !important;
    }

    .next-btn {
        margin-left: 1em;
        margin-right: 1em;
        padding: 0.5em 1em 0.5em 1em;
        border-radius: 10%;
        background: black;
        color: white;
        font-family: 'Kaushan Script', cursive;
        outline: none;
        border: none;
        font-size: 30px;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.5);
        transition: all 0.5s;
        text-transform: uppercase;
    }

    .next-btn:hover {
        cursor: pointer;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
    }

    .card-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .card-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }

    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .card.link:hover {
        cursor: pointer;
    }

    .card > img {
        margin-left: 2em;
        margin-right: 2em;
        height: 100%;
        max-height: 50vh;
        box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.6);
        transition: all 0.3s;
    }

    .selected {
        outline: red solid 10px;
    }

    .card > p {
        margin-top: 0.2em;
        font-size: 30px;
    }

    .side-scroll {
        position: fixed;
        right: 0;
        width: 16vw;
        height: 100%;
        background: url('../assets/small_scroll.png') no-repeat center;
        background-size: contain;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .side-scroll-container {
        width: 12vw;
        height: 16vw;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .code-container {
        position: fixed;
        right: 0;
        top: 0;
        background: black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        padding: 0.25em 0.5em 0.25em 0.5em;
        font-size: 50px;
        letter-spacing: 5px;
        box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.6);
    }

    .leave-container {
        position: fixed;
        left: 0;
        top: 0;
        background: black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        padding: 0.25em 0.5em 0.25em 0.5em;
        font-size: 20px;
        letter-spacing: 5px;
        box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.6);
    }

    .leave-container:hover {
        cursor: pointer;
    }

    .card-enter-active,
    .card-leave-active {
        transition-duration: 1s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .card-enter,
    .card-leave-active {
        opacity: 0;
        filter: blur(5px);
    }

    .name-list {
        margin-left: 2em;
        font-size: 20px;
    }
</style>