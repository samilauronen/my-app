import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { render } from '@testing-library/react';
import ColorPicker from 'material-ui-color-picker'

import {getChangedProps} from '../../fractals/utils'
import SierpinskiTriangles from '../../fractals/sierpinski-triangles/sierpinski-generator';

import './fractal-tree-page.css'


class Canvas extends React.Component {

  componentDidUpdate(prevProps) {
    Object.keys(getChangedProps(prevProps, this.props)).forEach(
     key => { this.fractal.update(key, this.props[key]) });
    this.draw();
  }

  draw() {
    const canvas = this.refs.canv;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.fractal.draw(ctx);
  }

  componentDidMount() {
    const canvas = this.refs.canv;
    this.fractal = new SierpinskiTriangles([canvas.width/2,canvas.height/2], this.props.length, this.props.angle)
    this.fractal.createWithDepth(this.props.depth);
    this.draw()
  }

  render() {
    return (
      <div className="innerCanvas" key={this.props.depth + this.props.length + this.props.angle}>
        <canvas ref="canv" className="actualCanvas" width={2000} height={900}/>
      </div>
      )
  }
}

class SierpinskiTrianglesComponent extends React.Component {

  constructor(props) {
    super(props);

    // default values for adjustment parameters
    this.state = {
      depth: 2,
      length: 700,
      angle: 0
    };
  }

  render() {
    return (
    <div className={"container"}>
      <div className={"sliders"}>
        <div className={"slider1"}>
          <Typography>
            Rotation angle
          </Typography>
          <Slider
            defaultValue={this.state.angle}
            onChange={(e,val) => this.setState({angle: val})}
            aria-labelledby="continuous-slider"
            step={Math.PI/1000}
            marks={[{value:0, label: '0'},  {value:Math.PI, label: '180°'}, {value:Math.PI*2, label: '360°'}]}
            min={0}
            max={Math.PI*2}
          />
        </div>
        <div className={"slider2"}>
          <Typography>
            Recursion depth
          </Typography>
          <Slider
            defaultValue={this.state.depth}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChange={(e,val) => this.setState({depth: val})}
            step={1}
            //marks={[{value:0, label: '0'},  {value:5, label: '5'}, {value:10, label: '10'}, {value:15, label: '15'}]}
            min={0}
            max={9}
          />
        </div>
        <div className={"slider3"}>
          <Typography>
            Base length
          </Typography>
          <Slider
            defaultValue={this.state.length}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChange={(e,val) => this.setState({length: val})}
            step={5}
            //marks={[{value:50, label: '50'}, {value:200, label: '200'}, {value:400, label: '400'}]}
            min={200}
            max={2000}
          />
        </div>
      </div>
      <div className="canvas" >
        <Canvas depth={this.state.depth} length={this.state.length} angle={this.state.angle}>
        </Canvas>
      </div>
    </div>)
  }
}


export default SierpinskiTrianglesComponent