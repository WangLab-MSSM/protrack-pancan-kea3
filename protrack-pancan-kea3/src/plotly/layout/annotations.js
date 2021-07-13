export default function annotations(samples) {
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
  // if (showTop) {
    res.push(    {
      y: '-',
      text: "<b>KEA3 Score - Top</b>",
      ...layoutOptions,
    },)
  // }
  // if (showBottom) {
    res.push({
      y: '--',
      text: "<b>KEA3 Score - Bottom</b>",
      ...layoutOptions,
    },)

      res.push(    {
      y: '---',
      text: "<b>Global protein abundance foldchange</b>",
      ...layoutOptions,
    },)
  // }
  return res
}