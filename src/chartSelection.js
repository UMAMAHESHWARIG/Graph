// import React, { useState } from 'react';
// import LineChart from './LineChart';

// import ScatterPlot from './scatterChart';
// import PieChart1 from './PieChart1';

// const ChartSelector = () => {
//   const [data, setData] = useState([]);
//   const [fieldName, setFieldName] = useState('');
//   const [chartType, setChartType] = useState('');

//   const generateRandomData = () => {
//     const newData = [];
//     for (let i = 0; i < 10; i++) { // Generate 10 random data points
//       newData.push(Math.floor(Math.random() * 100)); // Random value between 0 and 100
//     }
//     setData(newData);
//   };

//   const handleFieldChange = (event) => {
//     setFieldName(event.target.value);
//   };

//   const handleChartTypeChange = (event) => {
//     setChartType(event.target.value);
//   };

//   const renderChart = () => {
//     switch (chartType) {
//       case 'line':
//         return <LineChart data={data} />;
//       case 'pie':
//         return <PieChart1 data={data} />;
//       case 'scatter':
//         return <ScatterPlot data={data} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <select value={fieldName} onChange={handleFieldChange}>
//         <option value="field1">Field 1</option>
//         <option value="field2">Field 2</option>
//         <option value="field3">Field 3</option>
//         {/* Add more options as needed */}
//       </select>

//       <select value={chartType} onChange={handleChartTypeChange}>
//         <option value="line">Line Chart</option>
//         <option value="pie">Pie Chart</option>
//         <option value="scatter">Scatter Plot</option>
//         {/* Add more options as needed */}
//       </select>

//       {/* Button to fetch data based on selected field and render chart */}
//       <button onClick={generateRandomData}>Fetch Data</button>

//       {/* Render the selected chart */}
//       {renderChart()}
//     </div>
//   );
// };

// export default ChartSelector;

import React, { useState } from 'react';
import { Select, MenuItem, Button, Grid } from '@mui/material';
import LineChart from './LineChart';

import ScatterPlot from './scatterChart';
import PieChart1 from './PieChart1';

const ChartSelector = () => {
  const [fieldName, setFieldName] = useState('');
  const [chartType, setChartType] = useState('');
  const [data, setData] = useState([]);

  const generateRandomData = () => {
    const newData = [];
    for (let i = 0; i < 10; i++) { // Generate 10 random data points
      newData.push(Math.floor(Math.random() * 100)); // Random value between 0 and 100
    }
    setData(newData);
  };

  const handleFieldChange = (event) => {
    setFieldName(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <LineChart data={data} />;
      case 'pie':
        return <PieChart1 data={data} />;
      case 'scatter':
        return <ScatterPlot data={data.map((d, i) => [i, d])} />;
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Select value={fieldName} onChange={handleFieldChange} variant="outlined">
          <MenuItem value="field1">Field 1</MenuItem>
          <MenuItem value="field2">Field 2</MenuItem>
          <MenuItem value="field3">Field 3</MenuItem>
          {/* Add more options as needed */}
        </Select>
      </Grid>
      <Grid item>
        <Select value={chartType} onChange={handleChartTypeChange} variant="outlined">
          <MenuItem value="line">Line Chart</MenuItem>
          <MenuItem value="pie">Pie Chart</MenuItem>
          <MenuItem value="scatter">Scatter Plot</MenuItem>
          {/* Add more options as needed */}
        </Select>
      </Grid>
      <Grid item>
        <Button onClick={generateRandomData} variant="contained" color="primary">
          Generate Random Data
        </Button>
      </Grid>
      <Grid item xs={12}>
        {renderChart()}
      </Grid>
    </Grid>
  );
};

export default ChartSelector;


