<template>
    <div id="import-companies">
        <h3>Import Companies</h3>

        <table class="table">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Category</th>
                <th scope="col">Website</th>
                <th scope="col">Phone number</th>
                <th scope="col">Edit</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="company in this.$route.params.companies" v-bind:key="company.id">
                <th scope="row"><router-link class="btn-link" v-bind:to="{name: 'view-company', params: {uri: company.uri}}">{{company.name}}</router-link></th>
                <td>{{company.address}}</td>
                <td>{{company.category}}</td>
                <td>{{company.website}}</td>
                <td>{{company.phone_number}}</td>
                <td><router-link v-bind:to="{name: 'edit-company', params: {uri: company.uri}}"><i class="fa fa-edit"></i></router-link></td>
            </tr>
            </tbody>
        </table>


        <button @click="importCompanies" class="btn btn-primary">Confirm import</button>
    </div>

</template>

<script>
    import db from './firebaseInit'
    import axios from 'axios'

    export default {
        name: 'dashboard',
        data () {
            return{
                companies: []
            }
        },
        methods: {
            importCompanies() {
                this.$route.params.companies.forEach(doc => {
                    db.collection('companies').add({
                        uri: doc.uri,
                        name: doc.name,
                        address: doc.address,
                        category: doc.category,
                        phone_number: doc.phone_number,
                        website: doc.website,
                        created_on: new Date()
                    })
                    console.log('done')
                })
                this.$router.push('/')
            }
        }
    }
</script>
