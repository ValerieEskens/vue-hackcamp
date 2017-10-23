<template>
    <div>
        <div class="post">
            <h1>{{post.title}}</h1>
            <div>{{post.body}}</div>
        </div>

        <h1>COMMENTS</h1>
        <div class="comment" v-for="comment in comments" :key="comment.id">
            <span>{{comment.email}}</span>
            <h1>{{comment.name}}</h1>
            <p>{{comment.body}}</p>
        </div>
    </div>
        
    </div>
</template>

<script>
    import axios from 'axios';
    import VueRouter from 'vue-router';

    function getPost(id) {
        return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    }

    function getComments(id) {
        return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    }
    
    export default {
        beforeRouteEnter (to, from, next) {
            axios.all([getPost(to.params.id), getComments(to.params.id)])
                .then(axios.spread((post, comments) => next(vm => {
                    vm.post = post.data;
                    vm.comments = comments.data;
                    console.log(vm.comments);
                })))
        },
        data() {
            return {
                post: {},
                comments: []
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

    .comment {
        text-align: left;
        width: 80%;
        margin: auto;
    }

    .comment h1 {
        font-size: 18px;
        font-weight: bold;
    }

    .comment span {
        float: right;
    }

</style>