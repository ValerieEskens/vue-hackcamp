<template>
    <div>
        Settings
        {{isSaved ? 'saved' : 'not saved'}}
        <button @click="save">Save</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isSaved: false
            }
        },
        methods: {
            save() {
                this.isSaved = true;
            }
        },
        beforeRouteEnter (to, from, next) {
            // no 'this'
            fetchData().then(dara => {
                next(vm => {
                    vm.data = data
                })
            })
        },
        beforeRouteLeave(to, from, next) {
            if(this.isSaved || confirm('are you sure?')) {
                next()
            } else {
                next(false)
            }
        }
    }
</script>

<style scoped>

</style>