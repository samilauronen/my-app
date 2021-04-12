import React, { useRef, useEffect } from 'react'
import FractalTree from './fractals/fractal-tree/tree-generator'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { render } from '@testing-library/react';
import ColorPicker from 'material-ui-color-picker'
import {getChangedProps} from './fractals/utils'
import './index.css'


class Canvas extends React.Component {

  componentDidUpdate(prevProps) {
    Object.keys(getChangedProps(prevProps, this.props)).forEach(
      key => { this.fractal.update(key, this.props[key]) });
    this.draw()
  }

  draw() {
    const canvas = this.refs.canv
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.fractal.draw(ctx)
  }

  componentDidMount() {
    const canvas = this.refs.canv
    this.fractal = new FractalTree([canvas.width/2,canvas.height], this.props.length, this.props.angle,
                    this.props.lineColor, this.props.flowerSize, this.props.flowerColor)
    this.fractal.createWithDepth(this.props.depth)
    this.draw()
  }

  render() {
    return (
      <div className="innerCanvas" key={this.props.angle + this.props.depth + this.props.length +
            this.props.flowerSize + this.props.flowerColor + this.props.lineColor}>
        <canvas ref="canv" className="actualCanvas" width={2000} height={900}/>
      </div>
      )
  }
}



class InputSlider extends React.Component {
  constructor(props) {
    super(props)
    this.angle = Math.PI/4;
    this.depth = 8;
    this.length = 130;
    this.flowerSize=4;
    this.flowerColor = '#faa046';
    this.lineColor = '#00000';
  }

  render() {
    return (
    <div className={"container"}>
    <div className={"sliders"}>
      <div className={"slider1"}>
      <Typography id="discrete-slider-small-steps" gutterBottom>
        Split angle
      </Typography>
      <Slider
        defaultValue={Math.PI/4}
        onChange={(e,val) => {this.angle = val; this.forceUpdate()} }
        aria-labelledby="continuous-slider"
        step={Math.PI/1000}
        marks={[{value:0, label: '0'},  {value:Math.PI/2, label: '90°'}, {value:Math.PI, label: '180°'}]}
        min={0}
        max={Math.PI}
      />
      </div>
      <div className={"slider2"}>
     <Typography id="discrete-slider" gutterBottom>
        Recursion depth
      </Typography>
      <Slider
        defaultValue={8}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={(e,val) => {this.depth = val; this.forceUpdate()} }
        step={1}
        //marks={[{value:0, label: '0'},  {value:5, label: '5'}, {value:10, label: '10'}, {value:15, label: '15'}]}
        min={1}
        max={15}
      />
      </div>
      <div className={"slider3"}>
      <Typography id="discrete-slider" gutterBottom>
        Base length
      </Typography>
      <Slider
        defaultValue={130}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={(e,val) => {this.length = val; this.forceUpdate()} }
        step={5}
        //marks={[{value:50, label: '50'}, {value:200, label: '200'}, {value:400, label: '400'}]}
        min={50}
        max={400}
      />
      </div>
      <div className={"slider4"}>
      <Typography id="discrete-slider" gutterBottom>
        Flower radius
      </Typography>
      <Slider
        defaultValue={4}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={(e,val) => {this.flowerSize = val; this.forceUpdate()} }
        step={1}
        marks
        min={0}
        max={20}
      />
      </div>
      <div className={"colorpicker1"}>
      <Typography id="colorpicker" gutterBottom>
        Flower color
      </Typography>
      <ColorPicker
        defaultValue={this.flowerColor}
        TextFieldProps={{ value: this.flowerColor }}
        value={this.flowerColor}
        onChange={(color) => {this.flowerColor = color; this.forceUpdate()}}
      />
      </div>
      <div className={"colorpicker2"}>
      <Typography id="colorpicker" gutterBottom>
        Line Color
      </Typography>
      <ColorPicker
        defaultValue={this.lineColor}
        TextFieldProps={{ value: this.lineColor }}
        value={this.lineColor}
        onChange={(color) => {this.lineColor = color; this.forceUpdate()}}
      />
      </div>
    </div>
    <div className="canvas" >
      <Canvas angle={this.angle} depth={this.depth} length={this.length}
              flowerSize={this.flowerSize} flowerColor={this.flowerColor} lineColor={this.lineColor}>
      </Canvas>
    </div>
    </div>)
  }
}


export default InputSlider