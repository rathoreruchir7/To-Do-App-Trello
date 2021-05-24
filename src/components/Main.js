import React,{Component, useEffect} from 'react';
import { useState } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Home from './Home'
import Task from './Task'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Main(){
    
    const notifyOnCreate = (msg) => {
        console.log("msg called")
        toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    };

    const notifyOnDelete = (msg) => {
        toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
  
    return(
        <Router>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
                {/* Same as */}
            <ToastContainer />
        <Switch>
        
            <Route exact path = '/home' component={(props) => ( <Home notifyOnCreate={notifyOnCreate} {...props}/>)} />
            <Route exact path = '/tasks/:id' component={(props) => ( <Task notifyOnDelete={notifyOnDelete} {...props}/>)} />
        
            <Redirect to = '/home' />
        </Switch>
        </Router>
    );
    
}
export default Main;