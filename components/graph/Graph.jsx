import * as d3 from "d3";
import { useEffect, useState } from "react";
import css from "./styles.scss";

const Graph = ({ rankings, year, setSubject, thumbnail, size }) => {
  const [nulls, setNulls] = useState([]);

  const id = Math.random().toString(36).replace(/[^a-z]+/g, '');
  const [svgWidth, svgHeight] = size || [1100, 580];

  useEffect(() => {
    d3.select(`#${id}`).html("");

    // Optional things we can set:
    const optionalMin = null;
    const optionalMax = null;
    const axisLabel = rankings[0].rankable_name;
    //

    const companies = rankings.filter(c => c.rank !== null);
    const nulls = rankings.filter(c => c.rank === null);

    setNulls(nulls);

    const data = companies.map(d => ({
      id: d.company_id,
      name: d.company_name,
      value: d.value && d.value.toPrecision(3),
      band: d.band,
    }));

    const names = data.map(d => d.name);
    const values = data.map(d => parseFloat(d.value));

    const max = d3.max(values);

    const marginLeft = thumbnail ? 0 : 200;
    const marginRight = thumbnail ? 0 : 80;
    const marginY = thumbnail ? 0 : 80;

    const width = svgWidth - marginLeft - marginRight;
    const height = svgHeight - marginY;

    const svg = d3.select(`#${id}`);

    const chart = svg.append('g')
        .attr('transform', `translate(${marginLeft}, 0)`);

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

    const visitCompany = (index) => {
      setSubject({ type: "company", id: data[index].id });
    };

    if (!thumbnail) {
      if (year !== "2018") {
        chart.append('text')
              .attr('class', css.year)
              .attr('y', height)
              .text(year);
      }

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
        .on('mouseout', handleMouseOut)
        .on('click', (_, i) => visitCompany(i));

      chart.append('g')
          .attr('transform', translateAxis)
          .attr('class', css.grid_lines)
          .call(d3.axisBottom()
              .scale(xScale)
              .tickSize(-height, 0, 0)
              .tickFormat(''))
    }

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
  }, [rankings]);

  return (
    <div className={css.graph}>
      <svg id={id} width={svgWidth} height={svgHeight} />
      {!thumbnail && nulls.map(c => <div>{c.company_name}</div>)}
    </div>
  );
}

export default Graph;
