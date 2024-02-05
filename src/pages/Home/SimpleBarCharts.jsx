import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

function SimpleBarCharts({ data }) {
  return (
    <ResponsiveContainer width='100%' aspect={2}>
      <BarChart 
        data={data}
        margin={{
          top:5,
          right:30,
          left:30,
          bottom:5
        }}
      >
      <CartesianGrid strokeDasharray='4 1 2' />    
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip
        contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', color: '#fff', padding: '10px', border: 'none', borderRadius: '0.5rem' }}
      />
      <Legend />
      <Bar dataKey='total' fill='#6b48ff'/>
      </BarChart>
    </ResponsiveContainer>
  )
}

export { SimpleBarCharts }