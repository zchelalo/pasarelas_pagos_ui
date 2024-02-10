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
import moment from 'moment'

function SimpleBarCharts({ data, t }) {

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      if (moment(payload[0].payload.name, 'MMMM YYYY', true).isValid()) {
        return (
          <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', color: '#fff', padding: '10px', border: 'none', borderRadius: '0.5rem' }}>
            <p>{`${t((payload[0].payload.name).split(' ')[0].toLowerCase())} ${(payload[0].payload.name).split(' ')[1]}`}</p>
            <p className='text-violet-500'>{`${payload[0].name}: ${payload[0].value}`}</p>
          </div>
        )
      } else {
        return (
          <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', color: '#fff', padding: '10px', border: 'none', borderRadius: '0.5rem' }}>
            <p>{payload[0].payload.name}</p>
            <p className='text-violet-500'>{`${payload[0].name}: ${payload[0].value}`}</p>
          </div>
        )
      }
    }
    return null
  }

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
      <Tooltip content={customTooltip} />
      <Legend />
      <Bar dataKey='total' fill='#6b48ff'/>
      </BarChart>
    </ResponsiveContainer>
  )
}

export { SimpleBarCharts }