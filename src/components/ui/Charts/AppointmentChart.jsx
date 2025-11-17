// import React, { useEffect, useRef } from 'react'

// const AppointmentChart = ({ data = [], type = 'line' }) => {
//   const canvasRef = useRef(null)
//   const chartRef = useRef(null)

//   useEffect(() => {
//     if (!canvasRef.current) return

//     const ctx = canvasRef.current.getContext('2d')
    
//     // Destroy existing chart
//     if (chartRef.current) {
//       chartRef.current.destroy()
//     }

//     // Mock chart implementation - in real app, use Chart.js or similar
//     const drawChart = () => {
//       const canvas = canvasRef.current
//       const width = canvas.width
//       const height = canvas.height
      
//       ctx.clearRect(0, 0, width, height)
      
//       // Draw grid
//       ctx.strokeStyle = '#e5e7eb'
//       ctx.lineWidth = 1
      
//       // Vertical lines
//       for (let i = 0; i <= width; i += width / 6) {
//         ctx.beginPath()
//         ctx.moveTo(i, 0)
//         ctx.lineTo(i, height)
//         ctx.stroke()
//       }
      
//       // Horizontal lines
//       for (let i = 0; i <= height; i += height / 4) {
//         ctx.beginPath()
//         ctx.moveTo(0, i)
//         ctx.lineTo(width, i)
//         ctx.stroke()
//       }
      
//       // Draw line
//       if (type === 'line' && data.length > 0) {
//         ctx.strokeStyle = '#3b82f6'
//         ctx.lineWidth = 3
//         ctx.beginPath()
        
//         data.forEach((point, index) => {
//           const x = (index / (data.length - 1)) * width
//           const y = height - (point.value / 100) * height
          
//           if (index === 0) {
//             ctx.moveTo(x, y)
//           } else {
//             ctx.lineTo(x, y)
//           }
//         })
        
//         ctx.stroke()
        
//         // Draw points
//         ctx.fillStyle = '#3b82f6'
//         data.forEach((point, index) => {
//           const x = (index / (data.length - 1)) * width
//           const y = height - (point.value / 100) * height
          
//           ctx.beginPath()
//           ctx.arc(x, y, 4, 0, 2 * Math.PI)
//           ctx.fill()
//         })
//       }
//     }

//     drawChart()

//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy()
//       }
//     }
//   }, [data, type])

//   return (
//     <div className="w-full h-full">
//       <canvas 
//         ref={canvasRef} 
//         className="w-full h-full"
//         width={400}
//         height={200}
//       />
//     </div>
//   )
// }

// export default AppointmentChart













  import React, { useEffect, useRef } from 'react'

  const AppointmentChart = ({ data = [], type = 'line' }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
      if (!canvasRef.current) return

      const ctx = canvasRef.current.getContext('2d')
      const canvas = canvasRef.current
      const width = canvas.width
      const height = canvas.height
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height)
      
      if (!data || data.length === 0) {
        // Draw placeholder when no data
        ctx.fillStyle = '#9CA3AF'
        ctx.font = '14px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('No data available', width / 2, height / 2)
        return
      }

      // Calculate max value for scaling
      const maxValue = Math.max(...data.map(item => item.value))
      const padding = 40
      const chartWidth = width - 2 * padding
      const chartHeight = height - 2 * padding

      // Draw grid
      ctx.strokeStyle = '#F3F4F6'
      ctx.lineWidth = 1
      
      // Horizontal grid lines
      const gridLines = 4
      for (let i = 0; i <= gridLines; i++) {
        const y = padding + (i * chartHeight / gridLines)
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(width - padding, y)
        ctx.stroke()
      }

      // Draw line chart
      if (type === 'line') {
        ctx.strokeStyle = '#3B82F6'
        ctx.lineWidth = 3
        ctx.beginPath()

        data.forEach((point, index) => {
          const x = padding + (index * chartWidth / (data.length - 1))
          const y = height - padding - ((point.value / maxValue) * chartHeight)
          
          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        
        ctx.stroke()

        // Fill area under line
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)'
        ctx.beginPath()
        ctx.moveTo(padding, height - padding)
        
        data.forEach((point, index) => {
          const x = padding + (index * chartWidth / (data.length - 1))
          const y = height - padding - ((point.value / maxValue) * chartHeight)
          ctx.lineTo(x, y)
        })
        
        ctx.lineTo(width - padding, height - padding)
        ctx.closePath()
        ctx.fill()

        // Draw points
        ctx.fillStyle = '#3B82F6'
        data.forEach((point, index) => {
          const x = padding + (index * chartWidth / (data.length - 1))
          const y = height - padding - ((point.value / maxValue) * chartHeight)
          
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, 2 * Math.PI)
          ctx.fill()
          ctx.strokeStyle = '#FFFFFF'
          ctx.lineWidth = 2
          ctx.stroke()
        })

        // Draw labels
        ctx.fillStyle = '#6B7280'
        ctx.font = '12px Arial'
        ctx.textAlign = 'center'
        
        data.forEach((point, index) => {
          const x = padding + (index * chartWidth / (data.length - 1))
          const y = height - 20
          
          ctx.fillText(point.label, x, y)
          
          // Value labels above points
          ctx.fillStyle = '#3B82F6'
          ctx.font = 'bold 12px Arial'
          const valueY = height - padding - ((point.value / maxValue) * chartHeight) - 15
          ctx.fillText(point.value.toString(), x, valueY)
          ctx.fillStyle = '#6B7280'
        })

        // Draw Y-axis labels
        ctx.textAlign = 'right'
        for (let i = 0; i <= gridLines; i++) {
          const value = Math.round((maxValue * i) / gridLines)
          const y = padding + (i * chartHeight / gridLines)
          ctx.fillText(value.toString(), padding - 10, y + 4)
        }
      }

    }, [data, type])

    return (
      <div className="w-full h-full">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
          width={600}
          height={256}
        />
      </div>
    )
  }

  export default AppointmentChart