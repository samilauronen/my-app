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
    this.fractal = new FractalTree([canvas.width/2,canvas.height], this.props.length, this.props.angle,
                    this.props.lineColor, this.props.flowerSize, this.props.flowerColor);
    this.fractal.createWithDepth(this.props.depth);
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



// class AdjustmentPanel extends React.Component {

//   constructor(props) {
//     super(props);
//     this.components = [];
//   }

//   addComponent(name, newComponent) {
//     this.components.push(
//       <div className={this.classNameOf(this.components.length)}>
//         <Typography>
//           {name}
//         </Typography>
//         {newComponent}
//       </div>
//     );
//   }

//   classNameOf(index) {
//     return "AdjustmentPanel-component" + index
//   }

//   render() {
//     return (
//       <div className="AdjustmentPanel-container">
//         {this.components}
//       </div>)
//   }
// }

class InputSlider extends React.Component {

  constructor(props) {
    super(props);

    // default values for adjustment parameters
    this.state = {
      angle: Math.PI/4,
      depth: 8,
      length: 130,
      flowerSize: 4,
      flowerColor: '#faa046',
      lineColor: '#00000'
    };
  }

  render() {
    return (
    <div className={"container"}>
      <div className={"sliders"}>
        <div className={"slider1"}>
          <Typography>
            Split angle
          </Typography>
          <Slider
            defaultValue={this.state.angle}
            onChange={(e,val) => this.setState({angle: val})}
            aria-labelledby="continuous-slider"
            step={Math.PI/1000}
            marks={[{value:0, label: '0'},  {value:Math.PI/2, label: '90°'}, {value:Math.PI, label: '180°'}]}
            min={0}
            max={Math.PI}
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
            min={1}
            max={15}
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
            min={50}
            max={400}
          />
        </div>
        <div className={"slider4"}>
          <Typography>
            Flower radius
          </Typography>
          <Slider
            defaultValue={this.state.flowerSize}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChange={(e,val) => this.setState({flowerSize: val})}
            step={1}
            marks
            min={0}
            max={20}
          />
        </div>
        <div className={"colorpicker1"}>
          <Typography>
            Flower color
          </Typography>
          <ColorPicker
            defaultValue={this.state.flowerColor}
            TextFieldProps={{ value: this.state.flowerColor }}
            value={this.state.flowerColor}
            onChange={(color) => this.setState({flowerColor: color})}
          />
        </div>
        <div className={"colorpicker2"}>
          <Typography>
            Line Color
          </Typography>
          <ColorPicker
            defaultValue={this.state.lineColor}
            TextFieldProps={{ value: this.state.lineColor }}
            value={this.state.lineColor}
            onChange={(color) => this.setState({lineColor: color})}
          />
        </div>
      </div>
      <div className="canvas" >
        <Canvas angle={this.state.angle} depth={this.state.depth} length={this.state.length}
                flowerSize={this.state.flowerSize} flowerColor={this.state.flowerColor} lineColor={this.state.lineColor}>
        </Canvas>
      </div>
    </div>)
  }
}


export default InputSlider