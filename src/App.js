import React from 'react';  
import { ToastContainer, toast } from 'react-toastify';
import {store} from './state/store';
import PageRoutes from './Routes/routes';
import { Provider } from 'react-redux';



function App() {
  return (
    <>
    <Provider store={store}>
        <ToastContainer/>
        <PageRoutes/>
      </Provider>
    </>
   
   
  )
}

export default App