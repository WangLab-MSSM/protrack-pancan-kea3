import tumor from './colors/tumor'

let tumorColors = {}
Object.entries(tumor).forEach(([colorKey, d]) => {
  tumorColors[d.label] = d.color
})
//
// export default function generateBoxPlot(pw, tracks, cancer, samples) {
//   console.log(' this is it: ', )
//   console.log('pw: ', pw)
//   console.log('tracks: ', tracks)
//   console.log('cancer: ',  cancer)
//   console.log('samples ', samples)
//
//   let data = []
//   const Plotly = window.Plotly;
//
//   tracks.forEach((track) => {
//     let x = []
//     let y = []
//     Object.entries(track.data).forEach(([sample, zscore]) => {
//       if (samples.includes(sample)) {
//         x.push(sample)
//         y.push(zscore)
//       }
//     })
//     console.log('x' x)
//     console.log(y)
//   })
//

//   var y0 = [];
// var y1 = [];
// for (var i = 0; i < 50; i ++) {
// 	y0[i] = Math.random();
// 	y1[i] = Math.random() + 1;
// }
//
// var trace1 = {
//   y: y0,
//   type: 'box'
// };
//
// var trace2 = {
//   y: y1,
//   type: 'box'
// };
//
// // var data = [trace1, trace2];
//   Plotly.newPlot(`plotly-boxplot-${cancer}-${pw}`, data);
//
//
// }
// export default function generateBoxPlot(pathway, tracks, samples, sampleMeta) {
//   const Plotly = window.Plotly;
//   const cancerSamples = {}
//   sampleMeta.forEach(([sample, metadata]) => {
//     if (!samples.includes(sample)) {
//       return
//     }
//
//     if (!(metadata.Tumor in cancerSamples)) {
//       cancerSamples[metadata.Tumor] = []
//     }
//     cancerSamples[metadata.Tumor].push(sample)
//   })
//   let data = []
//     Object.entries(cancerSamples).forEach(([cancer, sampleList]) => {
//       tracks.forEach((track) => {
//       let x = []
//       let y = []
//       sampleList.forEach(sample => {
//         x.push(cancer)
//         y.push(track.data[sample])
//       })
//       data.push({
//         x,
//         y,
//         name: `<b>${cancer} ${track.tissue_type}</b>`,
//         type: 'box',
//         fillcolor: tumorColors[cancer],
//         width: 0.5,
//         marker: {
//           color: track.tissue_type === 'N' ? 'black':'gray'
//         },
//       })
//     })
//
//
//
//   })
//
//   console.log('data: ', data)
//   const layout = {
//     title: pathway,
//     boxmode: 'group'
//   };
//   Plotly.newPlot(`plotly-boxplot`, data, layout);
//
//   // console.log('data: ', data)
//   //
//   // Object.entries(cancerSamples).forEach(([cancer, sampleList]) => {
//   //   let y = []
//   //   let x = []
//     // tracks.forEach((track) => {
//     //   sampleList.forEach((sample) => {
//     //     x.push(track.name)
//     //     y.push(track.data[sample])
//     //   })
//     // })
//     // cancerTrace.push({
//     //   name: cancer,
//     //   type: 'box',
//     //   marker: {color: tumorColors[cancer]},
//     //   y,
//     //   x,
//     // })
//   // })
//   // Plotly.newPlot(`plotly-boxplot-${score}-${tissue}`, cancerTrace, layout);
//
//   console.log('track: ', pathway)
// }

export default function generateBoxPlot(heatmapTracks, samples, sampleMeta, score, tissue) {
  const tracks = heatmapTracks.filter(el => el.score === score && el.tissue_type === tissue)
  const cancerSamples = {}
  sampleMeta.forEach(([sample, metadata]) => {
    if (!samples.includes(sample)) {
      return
    }

    if (!(metadata.Tumor in cancerSamples)) {
      cancerSamples[metadata.Tumor] = []
    }
    cancerSamples[metadata.Tumor].push(sample)
  })
  let cancerTrace = []

  Object.entries(cancerSamples).forEach(([cancer, sampleList]) => {
    let y = []
    let x = []
    tracks.forEach((track) => {
      sampleList.forEach((sample) => {
        x.push(track.name)
        y.push(track.data[sample])
      })
    })
    cancerTrace.push({
      name: cancer,
      type: 'box',
      marker: {color: tumorColors[cancer]},
      y,
      x,
    })
  })

  const Plotly = window.Plotly;

  var layout = {
    yaxis: {
      title: 'zscore',
      zeroline: false,
    },
    xaxis: { tickangle: 0 },
    margin:{
    t: 50,
      b:50
  },
    boxmode: 'group',
    height: 400,
    title: `${score} ${tissue}`
  };

  console.log('boxplot trace: ', cancerTrace)
  Plotly.newPlot(`plotly-boxplot-${score}-${tissue}`, cancerTrace, layout);
}