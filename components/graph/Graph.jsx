import * as d3 from "d3";
import { useEffect } from "react";
import css from "./styles.scss";

const Graph = ({ rankings }) => {
  useEffect(() => {
    d3.select('svg').html("");

    // Optional things we can set:
    const optionalMin = null;
    const optionalMax = null;
    const axisLabel = rankings.name;
    //

    const companies = rankings.ranked_companies.filter(c => c.value !== null);
    const nulls = rankings.ranked_companies.filter(c => c.value === null);

    d3.select('.nulls').text(nulls.map(n => n.name).join(", "));

    const data = companies.map(d => ({
      name: d.name,
      value: d.value.toPrecision(3),
      band: d.band,
    }));

    const bandColors = ["#9f9", "#fc9", "#f99"];
    const highlights = ["#3f3", "#fc3", "#f33"];

    const names = data.map(d => d.name);
    const values = data.map(d => d.value);

    const [_, max] = d3.extent(values);

    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const svg = d3.select('svg');

    const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

    const axisMin = optionalMin || 0;
    const axisMax = optionalMax || max;

    const xScale = d3.scaleLinear().range([0, width]).domain([axisMin, axisMax]);
    const yScale = d3.scaleBand().range([0, height]).domain(names).padding(0.4);

    const translateAxis = `translate(0, ${height})`;

    const handleMouseOver = (d, index) => {
      chart.selectAll(`*[data-index='${index}']`)
        .attr('class', css.higlighted);
    };

    const handleMouseOut = (d, index) => {
      chart.selectAll(`*[data-index='${index}']`)
        .attr('class', '');
    };

    chart.append('g').call(d3.axisLeft(yScale));

    chart.append('g')
        .attr('transform', translateAxis)
        .call(d3.axisBottom(xScale));

    svg.append('text')
          .attr('x', width / 2 + margin)
          .attr('y', height + margin * 1.7)
          .attr('text-anchor', 'middle')
          .text(axisLabel)

    chart.append('g')
        .attr('transform', translateAxis)
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
      .attr('x', d => xScale(d.value))
      .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2)
      .text(d => d.value)
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    chart.selectAll('.tick text')
      .attr('data-index', (_, i) => i);
  }, [rankings]);

  return (
    <div className={css.graph}>
      <h1>{rankings.name}</h1>
      <svg width="1000" height="600" />
      <p className={css.nulls}></p>
    </div>
  );
}

export default Graph;
