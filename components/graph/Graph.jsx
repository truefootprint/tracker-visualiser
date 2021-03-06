import * as d3 from "d3";
import { useEffect, useState } from "react";
import round from "../../helpers/round";
import Tooltip from "../tooltip";
import css from "./styles.scss";

const Graph = ({ rankings, current, threshold, year, subject, setSubject, thumbnail, size }) => {
  const index = rankings.findIndex(r => r.company_id === (current && current.company_id));

  const [unranked, setUnranked] = useState([]);
  const [tooltip, setTooltip] = useState(null);

  const id = Math.random().toString(36).replace(/[^a-z]+/g, '');
  const [svgWidth, svgHeight] = size || [1000, 590];

  const visitCompanyById = (id) => {
    setSubject({ type: "trend", id: `${subject.type}-${subject.id}-${id}` });
  }

  const thresholdPercentage = parseFloat(threshold) * 100;

  useEffect(() => {
    d3.select(`#${id}`).html("");

    // Optional things we can set:
    const optionalMin = null;
    const optionalMax = null;
    const axisLabel = rankings[0].unit_name;
    //

    const companies = rankings.filter(c => c.rank !== null);
    const unranked = rankings.filter(c => c.rank === null)
      .sort((a, b) => {
        if (a.data_points > b.data_points) {
          return -1;
        } else if (a.data_points < b.data_points) {
          return 1;
        }

        return a.company_name < b.company_name ? -1 : 1;
      });

    setUnranked(unranked);

    const data = companies.map(d => ({
      id: d.company_id,
      name: d.company_name,
      value: d.value,
      band: d.band,
      auditor_name: d.auditor_name,
      url: d.url,
      page: d.page,
    }));

    const names = data.map(d => d.name);
    const values = data.map(d => parseFloat(d.value));

    const max = d3.max(values);

    const marginLeft = thumbnail ? 0 : 220;
    const marginRight = thumbnail ? 0 : 30;
    const marginY = thumbnail ? 0 : 50;

    const width = svgWidth - marginLeft - marginRight;
    const height = svgHeight - marginY;

    const svg = d3.select(`#${id}`);

    const chart = svg.append('g')
        .attr('transform', `translate(${marginLeft}, 0)`);

    const axisMin = optionalMin || 0;
    const axisMax = optionalMax || max;

    const padding = Math.max(0.9 - (names.length - 1) * 0.05, 0.4);

    const xScale = d3.scaleLinear().range([0, width]).domain([axisMin, axisMax]);
    const yScale = d3.scaleBand().range([0, height]).domain(names).padding(padding);

    const translateAxis = `translate(0, ${height})`;

    const unitName = (ranking) => {
      if (ranking.rankable_type === "Group") {
        return "points";
      } else {
        return ranking.unit_name || "";
      }
    };

    const handleMouseOver = (d, index) => {
      chart.selectAll(`*[data-index='${index}']`)
        .attr('class', css.highlighted);

      const datum = data[index];
      if (!datum) return;

      setTooltip(<>
        <p>{round(datum.value)} {unitName(rankings[0])}</p>
        {datum.auditor_name && <p>Assured by {datum.auditor_name}</p>}
      </>);
    };

    const handleMouseOut = (d, index) => {
      chart.selectAll(`*[data-index='${index}']`)
        .attr('class', '');

      setTooltip(null);
    };

    const visitCompanyByIndex = (index) => {
      const datum = data[index];
      if (!datum) return;

      visitCompanyById(datum.id);
    };

    const visitPageReference = (d) => {
      if (d.url === null || d.page === null) {
        return;
      }

      const pageUrl = `${d.url}#page=${d.page}`;
      const tab = window.open(pageUrl, '_blank');

      tab.focus();
    };

    if (!thumbnail) {
      console.log(window.location.href.includes("Water"))
      if (window.location.href.includes("Water") && year !== "2018"){
        year = parseInt(year) + 1  //alert("yes")
        chart.append('text')
              .attr('class', css.year)
              .attr('y', height)
              .text(year);
      } else if (!window.location.href.includes("Water") && year !== "2018") {
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
        .call(d3.axisBottom(xScale).ticks(5));

      svg.append('text')
        .attr('x', svgWidth - 80)
        .attr('y', height + marginY * 0.8)
        .attr('class', css.x_axis_label)
        .attr('text-anchor', 'middle')
        .text(axisLabel);

      chart.selectAll('.tick text')
        .attr('data-index', (_, i) => i)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        .on('click', (_, i) => visitCompanyByIndex(i));
    }

    chart.selectAll()
        .data(data)
        .enter()
        .append('rect')
        .attr('data-index', (_, i) => i)
        .attr('data-band', d => d.band)
        .attr('data-current', (_, i) => i === index)
        .attr('y', d => yScale(d.name))
        .attr('height', yScale.bandwidth())
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        .on('click', visitPageReference)
        .transition()
        .duration(500)
        .delay((_, i) => (data.length - i - 1) * 100)
        .attr('width', d => xScale(d.value))
  }, [rankings]);

  return (
    <div className={css.graph}>
      <svg id={id} width={svgWidth} height={svgHeight} />

      {!thumbnail && <div>
        <Tooltip content={tooltip} />

        <div className={css.unranked}>
          <h3 className={css.title}>
            Unranked companies
          </h3>

          <p className={css.subtitle}>
            To get an ESG score, companies need to provide data for at least {thresholdPercentage}% of the outcomes.
            <br/>These companies did not provide sufficient data:
          </p>

          {unranked.map((c, i) => (
            <div className={css.row} key={i}>
              <span className={css.left}>
                <a onClick={() => visitCompanyById(c.company_id)}>
                  {c.company_name}
                </a>
              </span>

              <span className={css.right}>
                {c.data_points === 0 && "No data points" }
                {c.data_points === 1 && "Only 1 data point" }
                {c.data_points > 1   && `Only ${c.data_points} data points` }
              </span>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}

export default Graph;
