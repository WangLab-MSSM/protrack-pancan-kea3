import annotations from './annotations'
import xAxis from './xAxis'
import yAxis from './yAxis'

export default function generateLayout(data, samples, showTop, showBottom) {
  const yAxisLabels = data.map(el => el.y).flat()
  return {
            xaxis: xAxis(),
            yaxis: yAxis(),
            autosize: true,
            margin: {
                l: Math.max(...yAxisLabels.map(y => y.length)) * 8.5,
            },
            height: yAxisLabels.length * 35,
            showlegend: true,
            legend: {
                traceorder: 'normal',
                font: {
                    family: 'sans-serif',
                    size: 12,
                    color: '#000'
                },
                bgcolor: '#E2E2E2',
                bordercolor: '#FFFFFF',
                borderwidth: 2,
                "orientation": "h",
            },
            annotations: samples.length ? annotations(samples, showTop, showBottom) : []
        };
}