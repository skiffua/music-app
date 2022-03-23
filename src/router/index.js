import React from "react";
import { Routes, Route } from 'react-router-dom';

import { Home, Chart, Authentication, About } from '../pages';

export default () => {
    return (
        <Routes>
            <Route path='/' exact element = { <Home/> } />
            <Route path='/chart' exact element = { <Chart/> } />
            <Route path='/register' element = { <Authentication/> } />
            <Route path='/login' element = { <Authentication/> } />
            <Route path='/about' element = { <About/> } />
            <Route path='*' exact={true} component={ <About/> } />
        </Routes>
    )
}
