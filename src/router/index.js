import React from "react";
import { Switch, Route } from 'react-router-dom';

import { Home, Chart, About } from '../pages';

export default () => {
    return (
        <Switch>
            <Route path='/' exact component = { Home } />
            <Route path='/chart' component = { Chart } />
            <Route path='/about' component = { About } />
        </Switch>
    )
}
