import { useEffect, useState } from "react";
import Client from "../../helpers/client";
import Tooltip from "../tooltip";
import Info from "../info";
import * as d3 from "d3";
import css from "./styles.scss";

const LineGraph = () => {
  const [rankings, setRankings] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const sector = "Mining";
  const outcomeId = 5;
  const companyId = 6;

  useEffect(() => {
    (new Client()).trend(sector, outcomeId, companyId)
      .then(({ data }) => setRankings(data));
  }, [sector, outcomeId, companyId])

  const id = "foo";
  const [svgWidth, svgHeight] = [1100, 580];

  useEffect(() => {
    if (rankings === null) {
      return;
    }

    const handleMouseOver = (d) => {
      setTooltip(<Info ranking={d} />);
    };

    const handleMouseOut = (d) => {
      setTooltip(null);
    };

    d3.select(`#${id}`).html("");

    const marginLeft = 100;
    const marginRight = 10;
    const marginTop = 25;
    const marginBottom = 30;

    const width = svgWidth - marginLeft - marginRight;
    const height = svgHeight - marginTop - marginBottom;

    const svg = d3.select(`#${id}`);

    const offset = `translate(${marginLeft}, ${marginTop})`;
    const chart = svg.append('g').attr('transform', offset);

    const years = rankings.map(d => d.year);
    const values = rankings.map(d => parseFloat(d.value));

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

    const axisLabel = rankings[0].unit_name;

    // y-axis label
    svg.append('text')
      .attr('x', marginLeft - 35)
      .attr('y', 15)
      .attr('class', css.y_axis_label)
      .attr('text-anchor', 'left')
      .text(axisLabel);

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
        .duration(length * 2)
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
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);
    };

    plot(rankings);

  }, [rankings]);

  return (
    <div className={css.graph}>
      <svg id={id} width={svgWidth} height={svgHeight} />
      <Tooltip content={tooltip} />
    </div>
  );
}

export default LineGraph;
