import { ref, onUnmounted } from 'vue';

export const useToast = () => {
    onUnmounted(() => {
        console.log('unmounted');
        clearTimeout(timeout.value);    
        //unmount시(페이지 떠났을때) timeout값 초기화 (3초후에 toast 보여주지X)
    });
    
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastAlertType = ref('');
    const timeout = ref(null);
    
    //Toast.vue에 메시지 전달
    const triggerToast = (message, type='success') => {
        showToast.value = true;
        toastMessage.value = message;
        toastAlertType.value = type;
        timeout.value = setTimeout(() => {  //setTimeout 값을 timeout에 넣기
            console.log('hello');
            toastMessage.value = '';
            showToast.value = false;
            toastAlertType.value = '';
        }, 3000);
    }

    return {
        showToast,
        triggerToast,
        toastMessage,
        toastAlertType,
    };
}

