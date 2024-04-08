// import {
//     EuiGlobalToastList
// } from '@elastic/eui';
// import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
// import { AxiosError } from 'axios';
// import React, { useEffect, useState } from 'react';


// const ToastErros: React.FC<AxiosError> = (error) => {
//   const [toasts, setToasts] = useState<Toast[]>([]);

//   useEffect(() => {
//     const newToasts:Toast[] = errors.map((error, index) => ({
//       id: `${index}`, 
//       title: 'Error',
//       color: 'danger',
//       iconType: 'alert',
//       text: error.message,
//     }));

//     setToasts(newToasts);
//   }, [errors]); 


//   const removeToast = (removedToast:Toast) => {
//     setToasts(toasts.filter((toast) => toast !== removedToast));
//   };

//   return (
//     <div>
//       <EuiGlobalToastList
//         toasts={toasts}
//         dismissToast={removeToast}
//         toastLifeTimeMs={10000}
//       />
//     </div>
//   );
// };

// export default ToastErros;


import React from 'react';
import { EuiToast } from '@elastic/eui';
import { AxiosError } from 'axios';

interface AxiosErrorToastProps {
  error: AxiosError;
}

const AxiosErrorToast: React.FC<AxiosErrorToastProps> = ({ error }) => {
  let errorMessage = 'An error occurred';

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage = `Request failed with status ${error.response.status}`;
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = 'No response received from server';
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = 'Request setup error';
  }

  return (
    <EuiToast
      title="Error"
      color="danger"
      iconType="alert"
    >
      <p>{errorMessage}</p>
    </EuiToast>
  );
};

export default AxiosErrorToast;
