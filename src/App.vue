<template>  
<h4>count: {{count}}</h4>
<h4>double count: {{doubleCount}}</h4>
<button @click="count++">Add one</button>

<div class="container">
  <h2>To-Do</h2>
  <TodoSimpleForm @add-todo="addTodo"/>
  

  <div v-if="!todos.length">
    추가된 Todo가 없습니다.
  </div>

  <TodoList :todos="todos"  
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

    const count = ref(1);
    const doubleCount = computed(() => {
      //count*2한 값을 doubldCount로 | count값에 따라 달라짐
      return count.value*2;
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
      count,
      doubleCount,
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
