import React, {useState} from 'react'
import {Switch,Route} from "react-router-dom"
import Dashboard from '../../pages/MainPage'
import NotFound from './notFound'

function Content(){
    return (
        <main className={"d-flex justify-content-center min-vw-100"}>
            <Switch>
                <Route path={"/"}>
                    <Dashboard/>
                </Route>
                <Route path ={"*"}>
                    <NotFound/>
                </Route>
            </Switch>
        </main>
    )
}

export default Content;
