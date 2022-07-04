import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RootStore} from "./store/rootStore";
import {autorun} from "mobx";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const rootStore = new RootStore();

root.render(
    <App  store={rootStore}/>
);

autorun(() => {
    rootStore.filterResults();
})