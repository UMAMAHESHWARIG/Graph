import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

    const line = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d));

    svg.selectAll("*").remove(); // Clear existing chart
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg.append("g")
      .call(d3.axisBottom(x).ticks(data.length));

    svg.append("g")
      .call(d3.axisLeft(y));

  }, [data]);

  return (
    <svg ref={svgRef} width={500} height={300}></svg>
  );
};

export default LineChart;
