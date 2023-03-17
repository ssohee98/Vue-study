<template>
  <div> Todo Page </div>
</template>

<script>
import {useRoute} from 'vue-router';
export default {
    setup() {
        const route = useRoute();

        //route에서 넘어오는 파라미터 id 확인
        console.log(route.params.id);
    }
}
</script>

<style>

</style>