import React from 'react'
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from 'recharts'

const COLORS = ['#ce93d8', '#5c6bc0', '#b39ddb', '#4dd0e1', '#f48fb1', '#d500f9']

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function SimplePieCharts({ data }) {
  return (
    <ResponsiveContainer width='100%' aspect={2}>
      <PieChart>
        <Pie
          dataKey='total' 
          data={data}
          innerRadius={0}
          outerRadius='100%'
          labelLine={false}
          label={renderCustomizedLabel}
          fill='#82ca9d'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}     
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export { SimplePieCharts }