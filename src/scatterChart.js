import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[0])])
      .range([margin.left, width + margin.left]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[1])])
      .range([height + margin.top, margin.top]);

    svg.selectAll("*").remove(); // Clear existing chart
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d[0]))
      .attr("cy", d => y(d[1]))
      .attr("r", 5)
      .attr("fill", "steelblue");

    svg.append("g")
      .attr("transform", `translate(0, ${height + margin.top})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

  }, [data]);

  return (
    <svg ref={svgRef} width={500} height={300}></svg>
  );
};

export default ScatterPlot;
