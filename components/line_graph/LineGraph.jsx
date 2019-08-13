import { useEffect, useState } from "react";
import * as d3 from "d3";
import css from "./styles.scss";

const data = [
  { year: 2013, value: 200 },
  { year: 2014, value: 500 },
  { year: 2015, value: null },
  { year: 2016, value: 150 },
  { year: 2017, value: 150 },
  { year: 2018, value: 250 },
];

const data2 = [
  { year: 2013, value: 100 },
  { year: 2014, value: 250 },
  { year: 2015, value: 200 },
  { year: 2016, value: null },
  { year: 2017, value: 50 },
  { year: 2018, value: 250 },
];

const LineGraph = () => {
  const id = "foo";

  const [svgWidth, svgHeight] = [1100, 580];

  useEffect(() => {
    d3.select(`#${id}`).html("");

    const marginLeft = 200;
    const marginRight = 100;
    const marginTop = 10;
    const marginBottom = 60;

    const width = svgWidth - marginLeft - marginRight;
    const height = svgHeight - marginTop - marginBottom;

    const svg = d3.select(`#${id}`);

    const offset = `translate(${marginLeft}, ${marginTop})`;
    const chart = svg.append('g').attr('transform', offset);

    const years = data.map(d => d.year);
    const values = data.map(d => parseFloat(d.value));

    const max = d3.max(values);

    const axisMin = 0;
    const axisMax = max;

    const xScale = d3.scaleBand().domain(years).range([0, width]);
    const yScale = d3.scaleLinear().domain([axisMin, axisMax]).range([height, 0])

    // y-axis
    chart.append('g')
      .attr('class', css.y_axis)
      .call(d3.axisLeft(yScale));

    // x-axis
    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', css.x_axis)
      .call(d3.axisBottom(xScale));

    // x-axis label
    svg.append('text')
      .attr('x', svgWidth - marginRight)
      .attr('y', height + marginBottom * 0.8)
      .attr('class', css.x_axis_label)
      .attr('text-anchor', 'middle')
      .text("hello");

    const x = (d) => xScale(d.year) + xScale.bandwidth() / 2;
    const y = (d) => yScale(d.value);

    const plot = (data) => {
      const dataWithValues = data.filter(d => d.value !== null);

      const path = svg.append("path")
        .datum(dataWithValues)
        .attr('transform', offset)
        .attr("class", css.line)
        .attr("d", d3.line().x(x).y(y).curve(d3.curveMonotoneX));

      const length = path.node().getTotalLength();

      path
        .attr("stroke-dasharray", length + " " + length) // TODO: dashes
        .attr("stroke-dashoffset", length)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

      svg.selectAll(".dot")
        .data(dataWithValues)
        .enter()
        .append("circle")
        .attr('transform', offset)
        .attr("class", css.dot)
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 5)
    };

    plot(data);
    plot(data2);

  }, [data]);

  return (
    <div className={css.graph}>
      <svg id={id} width={svgWidth} height={svgHeight} />
    </div>
  );
}

export default LineGraph;
