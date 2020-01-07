import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import CreateCompany from '@/components/CreateCompany'
import ViewCompany from '@/components/ViewCompany'
import EditCompany from '@/components/EditCompany'
import ImportCompany from '@/components/ImportCompany'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-company',
      component: CreateCompany
    },
    {
      path: '/edit/:uri',
      name: 'edit-company',
      component: EditCompany
    },
    {
      path: '/view/:uri',
      name: 'view-company',
      component: ViewCompany
    },
    {
      path: '/import',
      name: 'import-companies',
      component: ImportCompany
    }

  ]
})
