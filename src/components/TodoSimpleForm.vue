<!-- vue치고 엔터치면 알아서 기본 형태 -->

<template>
  <form      
      @submit.prevent="onSubmit"  
    >
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <!-- 여기서 todo는 input안에 입력한 데이터값 v-for="todo in todos" 여기 todo랑 다름  -->
          <input
            class="form-control"
            type="text"
            v-model="todo"
            placeholder="Type new to-do"
          >  
        </div>
        <div>
          <button
            class="btn btn-primary"
            type="submit"
          >
            Add
          </button>
        </div>
      </div>
      <div v-if="hasError" style="color: red">
        This is cannot be empty  
      </div>        
    </form> 
</template>

<script>
import { ref } from 'vue';
export default {

    emits: ['add-todo'], 

    setup(props, context) {
        const todo = ref('');
        const hasError = ref(false);  //처음에는 false로 지정

        const onSubmit = () => {
        if(todo.value == ''){ //입력값이 없으면
            hasError.value = true;
        } else {  //입력값이 있으면
            context.emit('add-todo', {  //부모에게 add-todo이름으로 데이터 전달
                id: Date.now,
                subject: todo.value,
                completed: false, 
            })
            hasError.value = false;
            todo.value = ''    //다시 데이터 초기화
        }
        }

        return {
            todo,
            hasError,
            onSubmit,
        }
    }   
}

</script>

<style>

</style>