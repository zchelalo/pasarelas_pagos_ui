import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

function StackedAreaCharts({ data }) {
  return (
    <ResponsiveContainer width='100%' aspect={2}>
      <AreaChart
        data={data}
        margin={{
          top:5,
          right:30,
          left:30,
          bottom:5
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', color: '#fff', padding: '10px', border: 'none', borderRadius: '0.5rem' }} />
        <Area type='monotone' dataKey='total' stackId='1' stroke='#6b48ff' fill='#6b48ff' />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export { StackedAreaCharts }