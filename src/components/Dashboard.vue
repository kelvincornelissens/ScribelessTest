<template>
  <div id="dashboard">
      <h3>Dashboard</h3>

      <router-link to="/new" class="btn btn-link">
          Create new company
      </router-link>

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
              <tr v-for="company in companies" v-bind:key="company.id">
                  <th scope="row"><router-link class="btn-link" v-bind:to="{name: 'view-company', params: {uri: company.uri}}">{{company.name}}</router-link></th>
                  <td>{{company.address}}</td>
                  <td>{{company.category}}</td>
                  <td>{{company.website}}</td>
                  <td>{{company.phone_number}}</td>
                  <td><router-link v-bind:to="{name: 'edit-company', params: {uri: company.uri}}"><i class="fa fa-edit"></i></router-link></td>
              </tr>
          </tbody>
      </table>

      <button @click="importCompanies" class="btn btn-primary">Import Companies</button>
  </div>

</template>

<script>
  import db from './firebaseInit'
  import axios from 'axios'

  export default {
    name: 'dashboard',
    data () {
      return{
        companies: [],
        importedCompanies: []
      }
    },
    created() {
      db.collection('companies').orderBy('category').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'id': doc.id,
            'uri': doc.data().uri,
            'name': doc.data().name,
            'address': doc.data().address,
            'category': doc.data().category,
            'phone_number': doc.data().phone_number,
            'website': doc.data().website,
            'created_on': doc.data().created_on
          }
          this.companies.push(data);
        })
      })
    },
    methods: {
        importCompanies() {
            axios.get('http://localhost:4000/scraper').then(({ data }) => {
               data.forEach(doc => {
                   const data = {
                       uri: doc.uri,
                       name: doc.name,
                       address: doc.address,
                       category: doc.category || '',
                       phone_number: doc.phone_number || '',
                       website: doc.website || '',
                       created_on: doc.createdDate
                   }
                   this.importedCompanies.push(data);

               });
                this.$router.push({name: 'import-companies', params: {companies: this.importedCompanies}})
            });

        }
    }
  }
</script>
