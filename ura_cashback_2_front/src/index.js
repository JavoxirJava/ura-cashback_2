import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import App from "./routes/App";

const container = document.getElementById('root');
document.body.style.marginLeft = "3.7%";
const root = createRoot(container);


root.render(
    <BrowserRouter>
        <App/>
        <ToastContainer/>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
