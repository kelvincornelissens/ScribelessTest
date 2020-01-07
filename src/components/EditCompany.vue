<template>
    <div id="edit-company">
        <h3>Edit Company</h3>
        <div class="row">
            <form @submit.prevent="updateCompany" class="col-sm-12">
                <div class="row form-group">
                    <label for="uri">URI</label>
                    <input type="text" v-model="uri" id="uri" class="form-control" required>
                </div>
                <div class="row form-group">
                    <label for="name">Name</label>
                    <input type="text" v-model="name" id="name" class="form-control" required>
                </div>
                <div class="row form-group">
                    <label for="address">Address</label>
                    <input type="text" v-model="address" id="address" class="form-control" required>
                </div>
                <div class="row form-group">
                    <label for="website">Website</label>
                    <input type="text" v-model="website" id="website" class="form-control">
                </div>
                <div class="row form-group">
                    <label for="phone_number">Phone number</label>
                    <input type="text" v-model="phone_number" id="phone_number" class="form-control">
                </div>
                <div class="row form-group">
                    <label for="category">Category</label>
                    <input type="text" v-model="category" id="category" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <router-link to="/" class="btn btn-secondary">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>
    import db from "./firebaseInit";
    export default {
        name: 'edit-company',
        data () {
            return{
                uri: null,
                name: null,
                address: null,
                category: null,
                phone_number: null,
                website: null
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
            updateCompany(){
                db.collection('companies').where('uri', '==', this.$route.params.uri).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.update({
                            uri: this.uri,
                            name: this.name,
                            address: this.address,
                            category: this.category,
                            website: this.website,
                            phone_number: this.phone_number
                        })
                        .then(() => {
                            this.$router.push({name: 'view-company',
                                params: {uri: this.uri}})
                        })
                    })
                })
            }
        }
    }
</script>
