import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import 'antd/dist/antd.css';
import {applyMiddleware, createStore} from 'redux'; 
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import reducer from './_reducers';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore) //원래는 createStore 만 해서 스토어를 리덕스에서 생성하는데 그냥 스토어는 객체밖에 못받아서 좌측 두개의 인자를 줌 

ReactDOM.render(
  <React.StrictMode>
   <Provider
    store={createStoreWithMiddleware(reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__&&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
   > 
     <App /> 
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
