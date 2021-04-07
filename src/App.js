import React, { useRef, useEffect } from 'react'
import {generateFractalTree, setSplitAngle} from './Fractals/FractalGenerator'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { render } from '@testing-library/react';
import './index.css'

const sliderMargin = {
  top: '10%'
}

class Canvas extends React.Component {

  componentDidUpdate() {
    this.draw()
  }

  draw() {
    const canvas = this.refs.canv
    const ctx = canvas.getContext("2d")
    const img = this.refs.image

    let fractal = generateFractalTree([canvas.width/2,canvas.height], -Math.PI/2, this.props.length, this.props.angle, 0.9)
    fractal.drawToDepth(this.props.depth, ctx)
  }

  componentDidMount() {
    this.draw()
  }

  render() {
    return (
      <div className="innerCanvas" key={this.props.angle + this.props.depth + this.props.length}>
        <canvas ref="canv" className="actualCanvas" width={2000} height={900}/>
      </div>
      )
  }
}



class InputSlider extends React.Component {
  constructor(props) {
    super(props)
    this.angle = Math.PI/8;
    this.depth = 8;
    this.length = 100;
  }

  render() {
    return (
    <div className={"container"}>
    <div className={"sliders"}>
      <Typography id="discrete-slider-small-steps" gutterBottom>
        Split angle
      </Typography>
      <Slider
        defaultValue={Math.PI/8}
        onChange={(e,val) => {this.angle = val; this.forceUpdate()} }
        aria-labelledby="continuous-slider"
        step={Math.PI/100}
        marks={[{value:0, label: '0'},  {value:Math.PI/8, label: '22.5°'}, {value:Math.PI/4, label: '45°'}, {value:Math.PI*3/8, label: '67.5°'}, {value:Math.PI/2, label: '90°'}]}
        min={0}
        max={Math.PI/2}
      />
     <Typography id="discrete-slider" gutterBottom>
        Recursion depth
      </Typography>
      <Slider
        defaultValue={8}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={(e,val) => {this.depth = val; this.forceUpdate()} }
        step={1}
        marks
        min={1}
        max={15}
      />
      <Typography id="discrete-slider" gutterBottom>
        Base length
      </Typography>
      <Slider
        defaultValue={100}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={(e,val) => {this.length = val; this.forceUpdate()} }
        step={5}
        marks
        track="inverted"
        min={50}
        max={400}
      />
    </div>
    <div className="canvas" >
      <Canvas angle={this.angle} depth={this.depth} length={this.length}></Canvas>
    </div>
    </div>)
  }
}


export default InputSlider