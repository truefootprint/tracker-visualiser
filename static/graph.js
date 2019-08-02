const urlParams = new URLSearchParams(window.location.search);

const sector = urlParams.get('sector');
const year = urlParams.get('year');
const type = urlParams.get('type');
const id = urlParams.get('id');
const graph = `${sector}-${year}-${type}-${id}`;

d3.json(`http://localhost:3000/company_rankings/${graph}`).then(ranking => {
  // Optional things we can set:
  const optionalMin = null;
  const optionalMax = null;
  const axisLabel = ranking.name;
  //

  d3.select('.title').text(ranking.name);

  const companies = ranking.ranked_companies.filter(c => c.value !== null);
  const nulls = ranking.ranked_companies.filter(c => c.value === null);

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
      .attr('class', 'highlighted');
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
});
