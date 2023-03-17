<template>
    <div
      v-for="(todo, index) in todos"
      :key="todo.id"
      class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div 
            class="form-check flex-grow-1"
            @click="moveToPage(todo.id)">
        <input class="form-check-input" 
                type="checkbox"
                :checked="todo.completed"
                @change="toggleTodo(index)"
                @click.stop> 
        <label class="form-check-label"
                :class="{todo: todo.completed}">
             {{ todo.subject }}
        </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm"
                  @click="deleteTodo(index)">
            Delete  
          </button>  
        </div>
      </div>
    </div>    
</template>

<script>
import {useRouter} from 'vue-router';
export default {
    props: {
        todos: {
            type: Array,
            required: true
        }
    },

    emits: ['toggle-todo', 'delete-todo'], 

    setup(props, {emit}) { 

        const router = useRouter();
        //체크박스 유지
        //바뀐 부분을(index) 부모에게 toggle-todo이름으로 전달
        const toggleTodo = (index) => {
            emit('toggle-todo', index);
        }

        //delete 버튼을 누른 부분을(index) 부모에게 delete-todo이름으로 전달
        const deleteTodo = (index) => {
            emit('delete-todo', index);   
        }

        //각 데이터 카드 선택시 todo id값 
        const moveToPage = (todoId) => {
            console.log(todoId);
            //router 를 사용하여 해당 id페이지로 이동
            //router.push('/todos/'+todoId);
            router.push({
                name: 'Todo',   //router>index.js 의 경로 name과 일치해야함
                params: {
                    id: todoId
                }
            });
        }

        return {
            toggleTodo,
            deleteTodo,
            moveToPage,
        }
    }
}
</script>

<style>

</style>