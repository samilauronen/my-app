import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/home/homepage';
import FractalTreeComponent from './pages/fractals/fractal-tree-page';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/tree' component={FractalTreeComponent}></Route>
    </Switch>
  );
}

export default Main;