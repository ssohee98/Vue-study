import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';
import Todo from '../pages/todos/_id.vue';
import TodoCreate from '../pages/todos/create/index.vue';


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
        },
        
        {
            path: '/todos/create',
            name: 'TodoCreate',
            component: TodoCreate
        },

        {
            path: '/todos/:id',
            name: 'Todo',
            component: Todo
        }
    ]
});

export default router;

//  /               들어왔을때 => Home 컴포넌트
//  /todos          들어왔을때 => Todos 컴포넌트
//  /todos/create   들어왔을때 => TodoCreate 컴포넌트
//  /todos/:id      들어왔을때 => Todo 컴포넌트

