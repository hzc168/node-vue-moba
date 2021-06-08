import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'
import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'
import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'
import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'
import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main,
            children: [
                {
                    path: '/categories/add',
                    component: CategoryEdit
                },
                {
                    path: '/categories/add/:id',
                    component: CategoryEdit,
                    props: true
                },
                {
                    path: '/categories/list',
                    component: CategoryList
                },
                {
                    path: '/items/add',
                    component: ItemEdit
                },
                {
                    path: '/items/add/:id',
                    component: ItemEdit,
                    props: true
                },
                {
                    path: '/items/list',
                    component: ItemList
                },
                {
                    path: '/heroes/add',
                    component: HeroEdit
                },
                {
                    path: '/heroes/add/:id',
                    component: HeroEdit,
                    props: true
                },
                {
                    path: '/heroes/list',
                    component: HeroList
                },
                {
                    path: '/articles/add',
                    component: ArticleEdit
                },
                {
                    path: '/articles/add/:id',
                    component: ArticleEdit,
                    props: true
                },
                {
                    path: '/articles/list',
                    component: ArticleList
                },
                {
                    path: '/ads/add',
                    component: AdEdit
                },
                {
                    path: '/ads/add/:id',
                    component: AdEdit,
                    props: true
                },
                {
                    path: '/ads/list',
                    component: AdList
                },
                {
                    path: '/admin_users/add',
                    component: AdminUserEdit
                },
                {
                    path: '/admin_users/add/:id',
                    component: AdminUserEdit,
                    props: true
                },
                {
                    path: '/admin_users/list',
                    component: AdminUserList
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { isPublic: true }
        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log(to.meta);
    if(!to.meta.isPublic && !localStorage.token) {
        next('/login')
    }
    next();
})

export default router