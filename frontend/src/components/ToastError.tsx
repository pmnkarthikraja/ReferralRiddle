import {
    EuiGlobalToastList
} from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import React, { useEffect, useState } from 'react';

interface ApiError {
  message: string;
}

const ToastErros: React.FC<{ errors: ApiError[] }> = ({ errors }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const newToasts:Toast[] = errors.map((error, index) => ({
      id: `${index}`, 
      title: 'Error',
      color: 'danger',
      iconType: 'alert',
      text: error.message,
    }));

    setToasts(newToasts);
  }, [errors]); 


  const removeToast = (removedToast:Toast) => {
    setToasts(toasts.filter((toast) => toast !== removedToast));
  };

  return (
    <div>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={10000}
      />
    </div>
  );
};

export default ToastErros;
