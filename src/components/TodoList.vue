<template>
    <div
      v-for="(todo, index) in todos"
      :key="todo.id"
      class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
        <input class="form-check-input" 
                type="checkbox"
                :checked="todo.completed"
                @change="toggleTodo(index)"> 
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
export default {
    props: {
        todos: {
            type: Array,
            required: true
        }
    },

    emits: ['toggle-todo', 'delete-todo'], 

    setup(props, {emit}) { 

        //체크박스 유지
        //바뀐 부분을(index) 부모에게 toggle-todo이름으로 전달
        const toggleTodo = (index) => {
            emit('toggle-todo', index);
        }

        //delete 버튼을 누른 부분을(index) 부모에게 delete-todo이름으로 전달
        const deleteTodo = (index) => {
            emit('delete-todo', index);   
        }

        return {
            toggleTodo,
            deleteTodo,
        }
    }
}
</script>

<style>

</style>