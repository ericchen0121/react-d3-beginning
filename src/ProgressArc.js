import React, { Component } from 'react';
import * as d3 from 'd3';

class ProgressArc extends Component {

  // variables and constants
  displayName: 'ProgressArc';
  TAU = Math.PI * 2;

  propTypes: {
    id: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    backgroundColor: PropTypes.string,
    foregroundColor: PropTypes.string,
    percentComplete: PropTypes.number
  }

  // While React is updating the state and ProgressArc component as we would expect,
  // the SVG does not reflect that change. This is because SVG’s don’t respond to updates.
  // So we have to remove the initial SVG and re-draw a new one.
  componentDidMount() {
    this.drawArc();
  }
  componentDidUpdate() {
    this.redrawArc();
  }

  drawArc() {
    const context = this.setContext();
    this.setBackground(context);
    this.setForeground(context);
    this.updatePercent(context);
  }

  redrawArc() {
    console.log('redrawing arc', this.props)
    const context = d3.select(`#${this.props.id}`);
    console.log(context)
    context.remove();
    this.drawArc();
  }

  // responsible for 'animating' the progress arc
  updatePercent(context) {
    const { duration, percentComplete } = this.props;
    return this.setForeground(context).transition()
      .duration(duration)
      .call(this.arcTween, this.TAU * percentComplete, this.arc())
  }

  // this really is the animating magic function
  // original tut: https://hackernoon.com/building-d3-components-with-react-7510e4743288
  // Bostocks' attrTween example: http://bl.ocks.org/cloudshapes/5662135
  arcTween(transition, newAngle, arc) {
      transition.attrTween('d', (d) => {
        const interpolate = d3.interpolate(d.endAngle, newAngle);
        const newArc = d;

        return (t) => {
          newArc.endAngle = interpolate(t);
          return arc(newArc);
        }
      })
  }

  setBackground(context) {
      const { backgroundColor } = this.props;

      return context.append('path')
      .datum({ endAngle: this.TAU })
      .style('fill', backgroundColor )
      .attr('d', this.arc());
  }

  setForeground(context) {
    const { foregroundColor, percentComplete } = this.props;

    return context.append('path')
      .datum({ endAngle: 0 })
      .style('fill', foregroundColor)
      .attr('d', this.arc())
  }

  arc() {
    const { innerRadius, outerRadius } = this.props;

    return d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0)
  }

  setContext() {
    const {height, width, id} = this.props;

    return d3.select(this.refs.arc).append('svg')
        .attr('height', height)
        .attr('width', width)
        .attr('id', id)
        .append('g')
        .attr('transform', `translate(${height / 2}, ${width / 2})`)
  }

  render() {
    return (
      <div ref='arc'></div>
    )
  }
}

export default ProgressArc;
