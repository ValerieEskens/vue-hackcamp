<template>
    <div>
        <div v-for="post in posts" :key="post.id" class="post">
            <router-link :to="'/post/'+post.id"><h1>{{post.title}}</h1></router-link>
            <div>{{post.body}}</div>
        </div>
    </div>
        
    </div>
</template>

<script>
    import axios from 'axios';
    import VueRouter from 'vue-router';

    export default {
        beforeRouteEnter (to, from, next) {
            axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(data => next(vm => {
                    vm.posts = data.data;
                    console.log(vm.posts);
                }))
                .catch(function (error) {
                    console.log(error);
                });
        },
        data() {
            return {
                posts: []
            }
        }
    }
</script>

<style scoped>
    .post {
        width: 80%;
        margin: auto;
        text-align: left;
        border-bottom: 1px solid black;
        padding-bottom: 20px;
        cursor: pointer;
    }

    .post h1 {
        font-size: 20px;
        font-weight: bold;
    }

</style>