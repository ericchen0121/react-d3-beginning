import React, { Component } from 'react';
import * as d3 from 'd3';

class ProgressArc extends Component {
  
  componentDidMount() {
    const context = this.setContext();
    this.setBackground(context);
    this.setForeground(context);
  }

  // variables and constants
  TAU = Math.PI * 2;
  grey = '#e6e6e6';
  neon_green = '#00ff00'

  setBackground(context) {
      return context.append('path')
      .datum({ endAngle: this.TAU })
      .style('fill', this.grey )
      .attr('d', this.arc());
  }

  setForeground(context) {
    return context.append('path')
      .datum({ endAngle: this.TAU * 0.3 })
      .style('fill', this.neon_green)
      .attr('d', this.arc())
  }



  arc() {
    return d3.arc()
      .innerRadius(100)
      .outerRadius(110)
      .startAngle(0)
  }

  setContext() {
    return d3.select(this.refs.arc).append('svg')
        .attr('height', '300px')
        .attr('width', '300px')
        .attr('id', 'd3-arc')
        .append('g')
        .attr('transform', 'translate(150, 150)')
  }

  render() {
    return (
      <div ref='arc'></div>
    )
  }
}

export default ProgressArc;
