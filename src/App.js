import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/homepage';
import FractalTreeComponent from './pages/fractals/fractal-tree-page';
import SierpinskiTrianglesComponent from './pages/fractals/sierpinski-triangles-page';
import MandelbrotSetComponent from './pages/fractals/mandelbrot-page';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/fractal-playground' component={Home} />
      <Route exact path='/fractal-playground/tree' component={FractalTreeComponent} />
      <Route exact path='/fractal-playground/sierpinski' component={SierpinskiTrianglesComponent} />
      <Route exact path='/fractal-playground/mandelbrot' component={MandelbrotSetComponent} />
    </Switch>
  );
}

export default Main;