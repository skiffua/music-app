import React from "react";
import { Switch, Route } from 'react-router-dom';

import { Home, Chart, Authentication, About } from '../pages';

export default () => {
    return (
        <Switch>
            <Route path='/' exact component = { Home } />
            <Route path='/chart' component = { Chart } />
            <Route path='/register' component = { Authentication } />
            <Route path='/login' component = { Authentication } />
            <Route path='/about' component = { About } />
        </Switch>
    )
}
