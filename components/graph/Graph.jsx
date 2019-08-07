import * as d3 from "d3";
import { useEffect, useState } from "react";
import css from "./styles.scss";

const Graph = ({ rankings, year }) => {
  const [nulls, setNulls] = useState([]);

  useEffect(() => {
    d3.select('.graph').html("");

    // Optional things we can set:
    const optionalMin = null;
    const optionalMax = null;
    const axisLabel = rankings[0].rankable_name;
    //

    const companies = rankings.filter(c => c.rank !== null);
    const nulls = rankings.filter(c => c.rank === null);

    setNulls(nulls);

    const data = companies.map(d => ({
      name: d.company_name,
      value: d.value && d.value.toPrecision(3),
      band: d.band,
    }));

    const bandColors = ["#9f9", "#fc9", "#f99"];
    const highlights = ["#3f3", "#fc3", "#f33"];

    const names = data.map(d => d.name);
    const values = data.map(d => parseFloat(d.value));

    const max = d3.max(values);

    const marginLeft = 200;
    const marginRight = 80;
    const marginY = 80;

    const width = 1100 - marginLeft - marginRight;
    const height = 580 - 1 * marginY;

    const svg = d3.select('.graph');

    const chart = svg.append('g')
        .attr('transform', `translate(${marginLeft}, 0)`);

    if (year !== "2018") {
      chart.append('text')
            .attr('class', css.year)
            .attr('y', height)
            .text(year);
    }

    const axisMin = optionalMin || 0;
    const axisMax = optionalMax || max;

    const xScale = d3.scaleLinear().range([0, width]).domain([axisMin, axisMax]);
    const yScale = d3.scaleBand().range([0, height]).domain(names).padding(0.4);

    const translateAxis = `translate(0, ${height})`;

    const handleMouseOver = (d, index) => {
      chart.selectAll(`*[data-index='${index}']`)
        .attr('class', css.highlighted);
    };

    const handleMouseOut = (d, index) => {
      chart.selectAll(`*[data-index='${index}']`)
        .attr('class', '');
    };

    chart.append('g')
      .attr('class', css.y_axis)
      .call(d3.axisLeft(yScale));


    chart.append('g')
        .attr('transform', translateAxis)
        .attr('class', css.x_axis)
        .call(d3.axisBottom(xScale));

    svg.append('text')
          .attr('x', width / 2 + marginLeft)
          .attr('y', height + marginY * 1.7)
          .attr('text-anchor', 'middle')
          .text(axisLabel);

    chart.append('g')
        .attr('transform', translateAxis)
        .attr('class', css.grid_lines)
        .call(d3.axisBottom()
            .scale(xScale)
            .tickSize(-height, 0, 0)
            .tickFormat(''))

    chart.selectAll()
        .data(data)
        .enter()
        .append('rect')
        .attr('data-index', (_, i) => i)
        .attr('data-band', d => d.band)
        .attr('y', d => yScale(d.name))
        .attr('height', yScale.bandwidth())
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        .transition()
        .duration(500)
        .delay((_, i) => (data.length - i - 1) * 100)
        .attr('width', d => xScale(d.value))

    chart.selectAll()
      .data(data)
      .enter()
      .append('text')
      .attr('data-index', (_, i) => i)
      .attr('x', d => xScale(d.value) + 10)
      .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2 + 4)
      .text(d => d.value)
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    chart.selectAll('.tick text')
      .attr('data-index', (_, i) => i)
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);
  }, [rankings]);

  return (
    <div className={css.graph}>
      <svg className="graph" width="1100" height="580" />

      {nulls.map(c => <div>{c.company_name}</div>)}
    </div>
  );
}

export default Graph;
