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
      text: "<b>Tumor-Up Kinase Activity Scores</b>",
      ...layoutOptions,
    },)
  // }
  // if (showBottom) {
    res.push({
      y: '--',
      text: "<b>Tumor-Down Kinase Activity Scores</b>",
      ...layoutOptions,
    },)

      res.push(    {
      y: '---',
      text: "<b>Global protein abundance foldchange <br>(tumor/normal)</b>",
      ...layoutOptions,
    },)
  // }
  res.push(
        {
              // y: '----',
      x: 0,
      y: 0,
      // xanchor: 'left',
      // yanchor: 'top',
      xref: 'paper',
      yref: 'paper',
      // text: `<b>Tumor-Up Kinase Activity Scores:</b>
      //   <br>A higher value suggests a higher impact
      //   <br> of the kinase on the phosphosites up-regulated
      //   <br> in the tumor than the matched normal tissues.<br><br>
      //   <b>Tumor-Down Kinase Activity Scores</b>: 
      //   <br>A higher value suggests a higher impact
      //   <br>of the kinase on the phosphosites down-regulated 
      //   <br>in the tumors than in the matched normal tissues.   
      //   `,
      text: `<b>Tumor-Up Kinase Activity Scores:</b> A higher value suggests a higher impact of the kinase on the phosphosites up-regulated in the tumor than the matched normal tissues.<br><b>Tumor-Down Kinase Activity Scores</b>: A higher value suggests a higher impact of the kinase on the phosphosites down-regulated in the tumors than in the matched normal tissues.`,
      showarrow: false,
      ax: 0,
      ay: -40,
      align: 'left',
      font: {
        family: 'Arial',
        size: 15,
      },
    },
  )



  //     {
  //     x: 1.03,
  //     y: 1.05,
  //     xanchor: 'left',
  //     yanchor: 'top',
  //     xref: 'paper',
  //     yref: 'paper',
  //     text: `<b>SCORES</b>`,
  //     showarrow: false,
  //     arrowhead: 7,
  //     ax: 0,
  //     ay: -40
  //   }
  // ]
  return res
}