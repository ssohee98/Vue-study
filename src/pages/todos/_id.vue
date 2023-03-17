<template>
  <h1> Todo Page </h1>
  <div v-if="loading">
    Loading...
  </div>
  <form v-else
    @submit.prevent="onSave">
    <div class = "row">
        <div class = "col-6">
            <div class="form-group">
                <label> Todo Subject </label>
                <input v-model="todo.subject" type="text" class="form-control">
            </div>
        </div>
        <div class = "col-6">
            <div class="form-group">
                <label> Status </label>
                <div>
                    <button 
                        class="btn"
                        type="button"
                        :class="todo.completed ? 'btn-success' : 'btn-danger'"
                        @click="toogleTodoStatus">
                            {{ todo.completed ? 'Complete' : 'InComplete' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="!todoUpdated">
        Save
    </button>
    <button 
        class="btn btn-primary ml-2"
        @click="moveToListPage">
        Cancel
    </button>
  </form>
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {ref, computed} from '@vue/reactivity';
import _ from 'lodash';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const loading = ref(true);  //처음엔 true
        const todoId = route.params.id;
        const originalTodo = ref(null);

        //route에서 넘어오는 파라미터 id 확인
        console.log(route.params.id);

        //수정값이 있는지 없는지
        const todoUpdated = computed(() => {
            //todo의 값과 originalTodo의 값이 같지 않으면 버튼 활성화
            return !_.isEqual(todo.value, originalTodo.value);
        })

        //input창에 해당 id의 subject 보이기
        const getTodo = async () => {
            const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
            todo.value = {...res.data};
            originalTodo.value = {...res.data};
            loading.value = false;  //데이터 받아오면 false
        };

        getTodo();

        //save버튼 누르면 변경된값 DB에 저장
        const onSave = async () => {
            const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                subject: todo.value.subject,
                completed: todo.value.completed
            });
            console.log(res);
        };

        const toogleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        }

        const moveToListPage = () => {
            //다시 목록 페이지로 돌아가기
            router.push({
                name: 'Todos'});
        }

        return {
            todo,
            loading,
            toogleTodoStatus,
            moveToListPage,
            onSave,
            todoUpdated,
        }
    }
}
</script>

<style>

</style>