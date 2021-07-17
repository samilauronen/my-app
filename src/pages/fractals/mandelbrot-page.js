import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input';
import { render } from '@testing-library/react';
import ColorPicker from 'material-ui-color-picker'

import {getChangedProps} from '../../fractals/utils'
import './mandelbrot-page.css'
import MandelbrotSet from '../../fractals/mandelbrot/mandelbrot-generator';


class Canvas extends React.Component {

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    console.log(this.props)
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
    this.fractal = new MandelbrotSet(this.props.iterations)
    this.draw()
  }

  render() {
    return (
      <div className="innerCanvas" key={this.props.zoom + this.props.iterations}>
        <canvas ref="canv" className="actualCanvas" width={1500} height={600}/>
      </div>
      )
  }
}

class MandelbrotSetComponent extends React.Component {

  constructor(props) {
    super(props);

    this.unapplied_iterations = 100;
    // default values for adjustment parameters
    this.state = {
      zoom: 20,
      iterations: 100
    };
  }

  render() {
    return (
    <div className={"container"}>
      <div className={"sliders"}>
        <div className={"slider1"}>
          <Typography>
            Zoom depth
          </Typography>
          <Slider
            defaultValue={this.state.zoom}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChange={(e,val) => this.setState({zoom: val})}
            step={2}
            //marks={[{value:50, label: '50'}, {value:200, label: '200'}, {value:400, label: '400'}]}
            min={10}
            max={200}
          />
        </div>
        <div className={"textField1"}>
            <Typography> Max iterations </Typography>
            <TextField id="outlined-basic"
                variant="outlined"
                defaultValue={this.state.iterations}
                onChange={(e) => this.unapplied_iterations = parseInt(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        this.setState({iterations: parseInt(e.target.value)});
                    }
                  }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => this.setState({iterations: this.unapplied_iterations})}
            > Update </Button>
        </div>
        
      </div>
      <div className="canvas" >
        <Canvas iterations={this.state.iterations}>
        </Canvas>
      </div>
    </div>)
  }
}


export default MandelbrotSetComponent