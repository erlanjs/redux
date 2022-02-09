import React from 'react';
import "./App.css"
import {Link,Routes , Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./components/Header";
import Basket from "./Pages/Basket";
import Rated from "./Pages/Rated";
import NewProduct from "./Pages/newProduct";
import Animation from "./Pages/animation";


const App = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/basket" element={<Basket/>}/>
                <Route path="/rated" element={<Rated/>}/>
                <Route path="/:idx" element={<NewProduct/>}/>
            </Routes>
        </div>
    );
};

export default App;