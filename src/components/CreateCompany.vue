<template>
    <div id="new-company">
        <h3>New Company</h3>
        <div class="row">
            <form @submit.prevent="saveCompany" class="col-sm-12">
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
    import db from './firebaseInit'
    export default {
        name: 'new-company',
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
        methods: {
            saveCompany() {
                db.collection('companies').add({
                    uri: this.uri,
                    name: this.name,
                    address: this.address,
                    category: this.category,
                    phone_number: this.phone_number,
                    website: this.website,
                    created_on: new Date()
                }).then(docRef => {
                    this.$router.push('/')
                })
                .catch(error => console.log(error))
            }
        }
    }
</script>
