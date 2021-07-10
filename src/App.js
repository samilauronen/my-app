import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/homepage';
import FractalTreeComponent from './pages/fractals/fractal-tree-page';
import SierpinskiTrianglesComponent from './pages/fractals/sierpinski-triangles-page';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home} />
      <Route exact path='/tree' component={FractalTreeComponent} />
      <Route exact path='/sierpinski' component={SierpinskiTrianglesComponent} />
    </Switch>
  );
}

export default Main;