// src/components/Graph.js
import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Graph = ({
  data,
  type = 'bar',
  title,
  width = 500,
  height = 300
}) => {
  // Render different chart types based on the type prop
  const renderChart = () => {
    switch (type.toLowerCase()) {
      case 'line':
        return (
          <LineChart data={data.datasets ? data.datasets[0].data.map((value, index) => ({
            name: data.labels[index],
            value
          })) : data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        );
      
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data.datasets ? data.labels.map((label, index) => ({
                name: label,
                value: data.datasets[0].data[index]
              })) : data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        );
      
      case 'bar':
      default:
        return (
          <BarChart data={data.datasets ? 
            data.labels.map((label, i) => {
              const entry = { name: label };
              data.datasets.forEach((dataset, j) => {
                entry[dataset.label] = dataset.data[i];
              });
              return entry;
            }) : data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {data.datasets ? 
              data.datasets.map((dataset, index) => (
                <Bar 
                  key={index}
                  dataKey={dataset.label} 
                  fill={dataset.backgroundColor || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
                />
              )) : 
              <Bar dataKey="value" fill="#8884d8" />
            }
          </BarChart>
        );
    }
  };

  return (
    <div className="graph-component" style={{ width: '100%', maxWidth: width }}>
      {title && <h3 className="graph-title text-xl font-semibold mb-4 text-center">{title}</h3>}
      <div className="graph-container" style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;