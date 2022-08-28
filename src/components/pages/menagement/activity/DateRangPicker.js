import React from 'react'
import 'antd/dist/antd.css'
import { DatePicker, Space } from 'antd'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

const App = ({ setDateSelect }) => {
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
    setDateSelect(dateString)
  }

  const onOk = value => {
    console.log('onOk: ', value)
  }

  return (
    <Space direction='vertical' size={12}>
      <RangePicker
        showTime={{
          format: 'HH:mm'
        }}
        format='YYYY-MM-DD HH:mm'
        onChange={onChange}
        onOk={onOk}
      />
    </Space>
  )
}

export default App
