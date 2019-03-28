import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import rootReducer from "./store/reducers/index"; // Same as the next line
import rootReducer from "./store/reducers";

// This is to setup our and connect our store to Redux Dev Tools (For Browsers)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// This is our redux store.
// A store is where the state of our app is being keep.
// A store acts as the single source of truth for our app.
// Only Reducers updates our store so we pass in the reducer
// as an arg when creating the store.
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
// NB: redux-thunk is a middleware.
// Middleware affects what happen in between an action and a reducer.
// Actions are the only thing that can be dispatched by default.
// With redux-thunk, you can dispatch a function which in turn can make
// an async request and dispatch the relevant actions which then gets to the reducer.

// The Provider component takes in the store and makes it possible for any of its
// descendant to connect to the store using the connect() function. 
// This is possible because Provider uses the Context API
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
