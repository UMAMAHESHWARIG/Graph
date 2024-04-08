
import Draggable from 'react-draggable';
import React, { useState } from 'react';
import * as d3 from 'd3';
import './App.css';
 
interface Graph {
  id: number;
  type: string;
  position: { x: number; y: number };
}
 
function App() {
  const [graphs, setGraphs] = useState<Graph[]>([]);
 
  const handleAddGraph = (graphType: string) => {
    const newGraph: Graph = { id: Date.now(), type: graphType, position: { x: 0, y: 0 } };
    setGraphs([...graphs, newGraph]);
  };
 
  const handleGraphDrag = (id: number, deltaX: number, deltaY: number) => {
    const newGraphs = graphs.map(graph => {
if (graph.id === id) {
        return {
          ...graph,
          position: {
            x: graph.position.x + deltaX,
            y: graph.position.y + deltaY
          }
        };
      }
      return graph;
    });
    setGraphs(newGraphs);
  };
 
  return (
    <div className="App">
      <div className="left-section">
        {/* Render graphs in the left section */}
        {graphs.map(graph => (
          <Draggable
key={graph.id}
            defaultPosition={{ x: graph.position.x, y: graph.position.y }}
onStop={(e, data) => handleGraphDrag(graph.id, data.deltaX, data.deltaY)}
          >
            <div className="graph">
              {/* Render D3.js graph based on graph type */}
              {graph.type === 'bar' && <BarChart />}
              {graph.type === 'pie' && <PieChart />}
            </div>
          </Draggable>
        ))}
      </div>
      <div className="right-section">
        <h2>Graph Widgets</h2>
        {/* Add graph widgets */}
        <button onClick={() => handleAddGraph('bar')}>Bar Chart</button>
        <button onClick={() => handleAddGraph('pie')}>Pie Chart</button>
        {/* Add more buttons for other graph types */}
      </div>
    </div>
  );
}
 
const BarChart: React.FC = () => {
  const data = [30, 70, 150, 225, 50, 80, 120];
 
  const svgWidth = 300;
  const svgHeight = 200;
 
  const xScale = d3.scaleBand()
    .domain(data.map((_, index)=>index.toString()))
    .range([0, svgWidth])
    .paddingInner(0.1);
 
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data) as number])
    .range([svgHeight, 0]);
 
  return (
    <svg width={svgWidth} height={svgHeight}>
      {data.map((value, index) => (
        <rect
          key={index}
          x={xScale(index.toString()) as number}
          y={yScale(value)}
          width={xScale.bandwidth()}
          height={svgHeight - yScale(value)}
          fill="blue"
        />
      ))}
    </svg>
  );
};
 
const PieChart: React.FC = () => {
  const data = [30, 70, 150, 225, 50];
 
  const svgWidth = 200;
  const svgHeight = 200;
  const radius = svgWidth / 2;
 
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const pie = d3.pie<any>().value((d: number) => d);
 
  const arc = d3.arc<any>()
    .innerRadius(0)
    .outerRadius(radius);
 
  const pieData = pie(data);
 
  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${radius},${radius})`}>
        {pieData.map((slice, index) => (
          <path
            key={index}
            d={arc(slice) as string}
            fill={color(index.toString())}
          />
        ))}
      </g>
    </svg>
  );
};
 
export default App;
