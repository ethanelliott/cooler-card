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
                            <div class="card">
                                <img :src="card1Image" />
                                <p>{{ name1 }}</p>
                            </div>
                            <div class="card">
                                <p>VS</p>
                            </div>
                            <div class="card">
                                <img :src="card2Image" />
                                <p>{{ name2 }}</p>
                            </div>
                        </div>
                    </div>

                </transition>
            </div>
            <div class="footer">
                <button class="next-btn" @click="drawCards">
                    Duel
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
    </div>
</template>

<script>
    import axios from 'axios';

    const RANDOM_CARD_URL = 'https://db.ygoprodeck.com/api/v7/randomcard.php';

    export default {
        name: 'Game',
        data: () => ({
            card1Image: '',
            card2Image: '',
            name1: '',
            name2: '',
            allUsers: [
                // {name: 'Name', score: 0},
            ]
        }),
        computed: {
            users() {
                const u = [...this.allUsers];
                return u.sort((a, b) => a.score - b.score);
            }
        },
        mounted() {
            this.drawCards();
        },
        methods: {
            async drawCards() {
                const res1 = await axios.get(RANDOM_CARD_URL);
                const res2 = await axios.get(RANDOM_CARD_URL);
                this.card1Image = res1.data.card_images[0].image_url;
                this.card2Image = res2.data.card_images[0].image_url;
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
    }

    .next-btn {
        padding: 0.5em 1em 0.5em 1em;
        border-radius: 10%;
        background: black;
        color: white;
        font-family: 'Kaushan Script', cursive;
        outline: none;
        border: none;
        font-size: 30px;
        box-shadow: 0 0 10px 1px rgba(0,0,0,0.5);
        transition: all 0.5s;
        text-transform: uppercase;
    }

    .next-btn:hover {
        cursor: pointer;
        box-shadow: 0 0 10px 1px rgba(0,0,0,0.3);
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

    .card > img {
        margin-left: 2em;
        margin-right: 2em;
        height: 100%;
        max-height: 50vh;
        box-shadow: 0 0 20px 2px rgba(0,0,0,0.6);
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