<template>
    <div id="view-company">
        <br>
        <ul class="list-group">
            <li class="list-group-item"><h4>{{name}}</h4></li>
            <li class="list-group-item">URI: {{uri}}</li>
            <li class="list-group-item">Category: {{category}}</li>
            <li class="list-group-item">Address: {{address}}</li>
            <li class="list-group-item">Website: <a v-bind:href="website" target="_blank">{{website}}</a></li>
            <li class="list-group-item">Phone number: {{phone_number}}</li>
        </ul>
        <br>
        <router-link to="/" class="btn btn-secondary">Back</router-link>
        <button @click="deleteCompany" class="btn btn-danger">Delete</button>
    </div>
</template>

<script>
    import db from './firebaseInit'
    export default {
        name: 'view-company',
        data () {
            return{
                uri: null,
                name: null,
                address: null,
                category: null,
                website: null,
                phone_number: null
            }
        },
        beforeRouteEnter(to,from,next) {
            db.collection('companies').where('uri', '==', to.params.uri).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        next(vm => {
                            vm.uri = doc.data().uri;
                            vm.name = doc.data().name;
                            vm.address = doc.data().address;
                            vm.category = doc.data().category;
                            vm.website = doc.data().website;
                            vm.phone_number = doc.data().phone_number;
                        })
                    })
                })
        },
        methods: {
            fetchData() {
                db.collection('companies').where('uri', '==', this.$route.params.uri).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.uri = doc.data().uri;
                        this.name = doc.data().name;
                        this.address = doc.data().address;
                        this.category = doc.data().category;
                        this.website = doc.data().website;
                        this.phone_number = doc.data().phone_number;
                    })
                })
            },
            deleteCompany() {
                if(confirm('Are you sure?')) {
                    db.collection('companies').where('uri', '==', this.$route.params.uri).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            doc.ref.delete();
                            this.$router.push('/');
                        })
                    })
                }
            }
        },
        watch: {
            $route(to, from){
                fetchData()
            }
        }
    }
</script>
