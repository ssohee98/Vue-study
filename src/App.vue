<template>  
<div class="container">
  <h2>To-Do</h2>

  <input
    class="form-control"
    type="text"
    v-model="searchText"
    placeholder="Search"
  >
  
  <hr>

  <TodoSimpleForm @add-todo="addTodo"/>

  <div v-if="!todos.length">
    추가된 Todo가 없습니다.
  </div>

  <div v-if="!filteredTodos.length">
    There is nothing to display
  </div> 

  <TodoList :todos="filteredTodos"  
            @toggle-todo="toggleTodo"
            @delete-todo="deleteTodo"/>  

</div>  
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
export default {
  components: {
    //import로 뷰 가져오고 componets 등록
    TodoSimpleForm,
    TodoList,
  },

  setup() {
    const todos = ref([]);

    const searchText = ref('');
    const filteredTodos = computed(() => {
      //검색할 값이 있으면 필터처리
      if(searchText.value) {
        return todos.value.filter(todo => {
          //todos배열을 하나씩 todo로 넘겨서
          //todo의 subject 값이 searchText값을 포함한다면
          return todo.subject.includes(searchText.value)
        });
      }

      //없으면 그냥 todos
      return todos.value
    });

    const addTodo = (todo) => {       //todo를 받아와서 추가
      todos.value.push(todo);
    }

    const toggleTodo = (index) => {   
      //index를 받아와서 그 부분의 completed를 반대로
      console.log(todos.value[index]);
      todos.value[index].completed = !todos.value[index].completed;
      console.log(todos.value[index]);
    }
    
    const deleteTodo = (index) => {
      //index를 받아와서 배열에서 해당 index 하나 삭제
      todos.value.splice(index, 1);   
    }

    return {
      todos,
      deleteTodo,
      addTodo,
      toggleTodo,
      searchText,
      filteredTodos,
    }
  }
}
</script>

<style>
  .todo{
    color: gray;
    text-decoration: line-through;
  }
</style>
