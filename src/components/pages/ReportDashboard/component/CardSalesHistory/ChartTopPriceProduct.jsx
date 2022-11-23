import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import dayjs from 'dayjs'

function ChartTopPriceProduct(props) {
  const { isTopProducts } = props
  const canvasEl = useRef(null)

  useEffect(() => {
    const productName = []
    const productNumber = []
    isTopProducts.forEach(element => {
      productName.push(element.product_name)
      productNumber.push(Math.abs(element.pdh_change_number))
    })

    const data = {
      labels: productName,
      datasets: [
        {
          label: 'Dataset 1',
          data: productNumber,
          backgroundColor: [
            'rgb(138,43,226)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(0,255,127)'
          ]
        },
        {
          label: 'Dataset 2',
          data: productNumber,
          backgroundColor: [
            'rgb(138,43,226)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(0,255,127)'
          ]
        }
      ]
    }
    const ctx = canvasEl.current.getContext('2d')

    const config = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'TOP 5 สินค้าขายดีที่สุด'
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
    <div>
      {' '}
      <div className='App'>
        <canvas id='myChart' ref={canvasEl} />
      </div>
    </div>
  )
}

export default ChartTopPriceProduct
