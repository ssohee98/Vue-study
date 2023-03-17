import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        
        {
            path: '/todos',
            name: 'Todos',
            component: Todos
        }
    ]
});

export default router;

//  /           들어왔을때 => Home 컴포넌트
//  /todos      들어왔을때 => Todos 컴포넌트
//  /todos/create
//  /todos/:id