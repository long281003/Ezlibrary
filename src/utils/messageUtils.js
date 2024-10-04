import { ElMessage } from 'element-plus';

export const showMessage = (message, type = 'success', duration = 3000) => {
    ElMessage({
        message,
        type,
        duration,
    });
};