import React, { Component } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import RouterView from './router/RouterView'
import {routes} from './router/RouterConfig'
export default class MyRouter extends Component {
    render() {
        return (
            <Router>
                <RouterView routes={routes}/>
            </Router>
        )
    }
}
