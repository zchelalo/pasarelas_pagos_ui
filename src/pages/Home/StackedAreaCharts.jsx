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
        <Tooltip />
        <Area type='monotone' dataKey='total' stackId='1' stroke='#6b48ff' fill='#6b48ff' />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export { StackedAreaCharts }