import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import dayjs from 'dayjs'

const formatValue = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23'
]

const formatValue2 = [
  '00.00 น.',
  '01.00 น.',
  '02.00 น.',
  '03.00 น.',
  '04.00 น.',
  '05.00 น.',
  '06.00 น.',
  '07.00 น.',
  '08.00 น.',
  '09.00 น.',
  '10.00 น.',
  '11.00 น.',
  '12.00 น.',
  '13.00 น.',
  '14.00 น.',
  '15.00 น.',
  '16.00 น.',
  '17.00 น.',
  '18.00 น.',
  '19.00 น.',
  '20.00 น.',
  '21.00 น.',
  '22.00 น.',
  '23.00 น.'
]

export default function App({ isReportsDateNow }) {
  const canvasEl = useRef(null)

  const colors = {
    purple: {
      default: 'rgba(149, 76, 233, 1)',
      half: 'rgba(149, 76, 233, 0.5)',
      quarter: 'rgba(149, 76, 233, 0.25)',
      zero: 'rgba(149, 76, 233, 0)'
    },
    indigo: {
      default: 'rgba(80, 102, 120, 1)',
      quarter: 'rgba(80, 102, 120, 0.25)'
    }
  }

  useEffect(() => {
    isReportsDateNow.map(item => console.log(dayjs(item.report_timestamp).format('HH')))
    const values = []
    formatValue.forEach(element => {
      const filterDate = isReportsDateNow.filter(item => dayjs(item.report_timestamp).format('HH') === element)
      if (filterDate.length !== 0) {
        const reduceValue = filterDate.reduce((sum, item) => sum + item.report_grand_total, 0)
        values.push(reduceValue)
      } else {
        values.push(0)
      }
    })
    const ctx = canvasEl.current.getContext('2d')

    const gradient = ctx.createLinearGradient(0, 16, 0, 600)
    gradient.addColorStop(0, colors.purple.half)
    gradient.addColorStop(0.65, colors.purple.quarter)
    gradient.addColorStop(1, colors.purple.zero)

    const weight = values

    const labels = formatValue2

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: 'ยอดรวม',
          data: weight,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3
        }
      ],
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        }
      }
    }

    const config = {
      type: 'line',
      data: data,
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        scales: {
          y: {
            // defining min and max so hiding the dataset does not change scale range
            min: 0
          }
        }
      }
    }

    const myLineChart = new Chart(ctx, config)

    return function cleanup() {
      myLineChart.destroy()
    }
  })

  return (
    <div className='App'>
      <canvas id='myChart' ref={canvasEl} height='100' />
    </div>
  )
}
