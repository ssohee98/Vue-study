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
  <div style="color: red">{{error}}</div>

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
import axios from "axios";

export default {
  components: {
    //import로 뷰 가져오고 componets 등록
    TodoSimpleForm,
    TodoList,
  },

  setup() {
    const todos = ref([]);

    const searchText = ref('');

    const error = ref('');

    //검색
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

    //추가
    const addTodo = async (todo) => {       //todo를 받아와서 추가
      error.value = '';
      try {
        const res = await axios.post('http://localhost:3000/todos', {
        subject: todo.subject,
        completed: todo.completed
        }); 
        //아이디값도 포함하여 todos에 저장
        todos.value.push(res.data);
      }catch(err) {
        //서버가 정상적으로 작동하지않은채로 Add하면 에러메시지
        error.value="Something went wrong";
      }
    }

    //체크박스 스타일
    const toggleTodo = (index) => {   
      //index를 받아와서 그 부분의 completed를 반대로
      console.log(todos.value[index]);
      todos.value[index].completed = !todos.value[index].completed;
      console.log(todos.value[index]);
    }
    
    //삭제
    const deleteTodo = async (index) => {
      error.value = '';

      //삭제버튼을 누른 index의 todos id값
      const id = todos.value[index].id;
      
      try {
        //id값으로 json(DB)에서 해당 데이터 삭제
        await axios.delete('http://localhost:3000/todos' + id);
        //todos 배열에서도 삭제
        todos.value.splice(index, 1); 
      } catch(err) {
        error.value="Something went wrong";
      }
    }

    //화면에 카드 유지
    const getTodos = async () => {    //json파일에 저장된 todo를 화면에 출력
      try {
        //url에서 get방식으로 모든 데이터가 배열로 넘어오면
        const res = await axios.get('http://localhost:3000/todos');
        todos.value = res.data;
      }catch(err) {
        //서버가 정상적으로 작동하지않은채로 Add하면 에러메시지
        error.value="Something went wrong";
      }

    }

    getTodos();

    return {
      todos,
      deleteTodo,
      addTodo,
      toggleTodo,
      searchText,
      filteredTodos,
      error,
      getTodos,
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
