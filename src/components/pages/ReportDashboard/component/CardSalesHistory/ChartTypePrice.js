import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import dayjs from 'dayjs'

export default function ChartTypePrice({ isReports }) {
  const canvasEl = useRef(null)
  useEffect(() => {
    const valueSummary = {
      เงินสด: 0,
      โอนจ่าย: 0,
      บัตรเครดิต: 0,
      อื่น: 0
    }
    if (isReports && isReports.length !== 0) {
      isReports.forEach(element => {
        if (element.report_payment_type === 'เงินสด') {
          valueSummary.เงินสด += element.report_grand_total
        } else if (element.report_payment_type === 'โอนจ่าย') {
          valueSummary.โอนจ่าย += element.report_grand_total
        } else if (element.report_payment_type === 'บัตรเครดิต') {
          valueSummary.บัตรเครดิต += element.report_grand_total
        } else {
          valueSummary.อื่น += element.report_grand_total
        }
      })
    }

    const ctx = canvasEl.current.getContext('2d')

    const data = {
      labels: ['เงินสด', 'โอนจ่าย', 'บัตรเครดิต', 'อื่น ๆ'],
      datasets: [
        {
          label: 'ประเภทการชำระ',
          data: [valueSummary.เงินสด, valueSummary.โอนจ่าย, valueSummary.บัตรเครดิต, valueSummary.อื่น],
          backgroundColor: ['rgb(138,43,226)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          hoverOffset: 4
        }
      ]
    }

    const config = {
      type: 'doughnut',
      data: data
    }

    const myLineChart = new Chart(ctx, config)

    return function cleanup() {
      myLineChart.destroy()
    }
  })

  return (
    <div className='App'>
      <canvas id='myChart' ref={canvasEl} />
    </div>
  )
}
