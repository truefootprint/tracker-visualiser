import { useEffect, useState } from "react";
import Tooltip from "../tooltip";
import Info from "../info";
import * as d3 from "d3";
import css from "./styles.scss";

const LineGraph = ({ rankingGroups, thumbnail, size }) => {
  const [tooltip, setTooltip] = useState(null);

  const id = Math.random().toString(36).replace(/[^a-z]+/g, '');
  const [svgWidth, svgHeight] = size || [1400, 400];

  useEffect(() => {
    const handleMouseOver = (d) => {
      setTooltip(<Info ranking={d} />);
    };

    const handleMouseOut = (d) => {
      setTooltip(null);
    };

    d3.select(`#${id}`).html("");

    const marginLeft = thumbnail ? 8 : 100;
    const marginRight = thumbnail ? 0 : 80;
    const marginTop = thumbnail ? 4 : 25;
    const marginBottom = thumbnail ? 8 : 30;

    const width = svgWidth - marginLeft - marginRight;
    const height = svgHeight - marginTop - marginBottom;

    const svg = d3.select(`#${id}`);

    const offset = `translate(${marginLeft}, ${marginTop})`;
    const chart = svg.append('g').attr('transform', offset);

    const years = rankingGroups[0].map(d => d.year);

    const values = rankingGroups.flatMap(group => group.map(d => parseFloat(d.value)));
    const max = d3.max(values);

    const axisMin = 0;
    const axisMax = max;

    const xScale = d3.scaleBand().domain(years).range([0, width]);
    const yScale = d3.scaleLinear().domain([axisMin, axisMax]).range([height, 0])

    // y-axis
    chart.append('g')
      .attr('class', css.y_axis)
      .call(d3.axisLeft(yScale)
        .ticks(thumbnail ? 4 : null)
        .tickFormat(thumbnail ? "" : null)
      );

    // x-axis
    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', css.x_axis)
      .call(d3.axisBottom(xScale).tickFormat(thumbnail ? "" : null));

    const axisLabel = thumbnail ? "" : rankingGroups[0][0].unit_name;

    // y-axis label
    svg.append('text')
      .attr('x', marginLeft - 35)
      .attr('y', 15)
      .attr('class', css.y_axis_label)
      .attr('text-anchor', 'left')
      .text(axisLabel);

    const x = (d) => xScale(d.year) + xScale.bandwidth() / 2;
    const y = (d) => yScale(d.value);

    const labelX = (d) => x(d) + 20;
    const labelY = (d) => y(d) + 6;

    const plot = (data, index) => {
      const dataWithValues = data.filter(d => d.value !== null);
      const companyLabel = thumbnail ? "" : data[0].company_name;

      const path = svg.append("path")
        .datum(dataWithValues)
        .attr('data-index', index)
        .attr('transform', offset)
        .attr("class", css.line)
        .attr("d", d3.line().x(x).y(y).curve(d3.curveMonotoneX));

      const length = path.node().getTotalLength();

      path
        .attr("stroke-dasharray", length + " " + length) // TODO: dashes
        .attr("stroke-dashoffset", length)
        .transition()
        .duration(thumbnail ? 0 : 1000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

      svg.selectAll(".dot")
        .data(dataWithValues)
        .enter()
        .append("circle")
        .attr('data-index', index)
        .attr('transform', offset)
        .attr("class", css.dot)
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", thumbnail ? 3 : 8)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);

      const lastDatum = dataWithValues[dataWithValues.length - 1];

      if (lastDatum) {
        svg.selectAll(".dot")
          .data([lastDatum])
          .enter()
          .append("text")
          .attr('data-index', index)
          .attr('transform', offset)
          .attr("x", labelX)
          .attr("y", labelY)
          .attr('text-anchor', 'left')
          .attr('class', css.company_label)
          .text(companyLabel);
      }
    };

    rankingGroups.forEach((rankings, index) => plot(rankings, index));
  }, [rankingGroups]);

  return (
    <div className={`${css.line_graph} ${thumbnail && css.thumbnail}`}>
      <svg id={id} width={svgWidth} height={svgHeight} />
      <Tooltip content={tooltip} />
    </div>
  );
}

export default LineGraph;
