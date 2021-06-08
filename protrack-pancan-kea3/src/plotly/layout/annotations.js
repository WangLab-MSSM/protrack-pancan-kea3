export default function annotations(samples, showTop, showBottom) {
  const middleSample = samples[Math.floor(samples.length/2)]
  const layoutOptions = {
      font: {
        family: 'Arial',
        size: 16,
        color: 'black',
      },
      showarrow: false,
      xref: 'x',
      yref: 'y',
      x: middleSample,
  }
  let res = []
  if (showTop) {
    res.push(    {
      y: '-',
      text: "<b>Top</b>",
      ...layoutOptions,
    },)
  }
  if (showBottom) {
    res.push({
      y: '--',
      text: "<b>Bottom</b>",
      ...layoutOptions,
    },)
  }
  return res
}