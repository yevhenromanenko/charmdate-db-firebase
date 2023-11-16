import React from 'react';
import {render} from "react-dom";
import './index.css';
import App from "./App";

const bodyForRoot = document.querySelector('body');

const dhtop= document.querySelector('.dhtop');
if (dhtop) {
    dhtop.style.zIndex = "0";
}

const div = document.createElement("div");
div.id = 'root';
div.className = 'root'

bodyForRoot.prepend(div);

render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
