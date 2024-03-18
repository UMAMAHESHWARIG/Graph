import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart1 = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(d => d);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = pie(data);

    svg.selectAll("*").remove(); // Clear existing chart
    svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc);

  }, [data]);

  return (
    <svg ref={svgRef} width={500} height={300}></svg>
  );
};

export default PieChart1;
