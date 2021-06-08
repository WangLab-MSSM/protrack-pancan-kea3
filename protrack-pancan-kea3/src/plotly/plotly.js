import generateClinicalTrack from './generateClinicalTrack'
import generateTrackGroup from './generateTrackGroup'
import generateLayout from './layout/generateLayout'


export default function generateHeatmap(clinicalTracks, samples, top, bottom, showTop=true, showBottom=true) {
  const Plotly = window.Plotly;
  const clinical = Object.entries(clinicalTracks).map(c => generateClinicalTrack(c[0], c[1], samples))

  const topTracks = generateTrackGroup(top, samples)
  topTracks.showscale = true
  //separate topTracks from bottomTracks
  topTracks.z.splice(0,0,[])
  topTracks.y.splice(0,0,'--')

  const bottomTracks = generateTrackGroup(bottom, samples)

  // const IPAS = generateTrackGroup(tracks, 'score', 'IPAS', samples)
  let data = []

  if (showBottom) {
    data.push(bottomTracks)
  }

  if (showTop) {
    data.push(topTracks)
  }

  data = [...data, ...clinical]

  // Insert filler track between clinical and scores
  let i = data.flat().length
  const fillerArr = new Array(samples.length).fill(0)
  data.splice(i-clinical.length,0,{
      x: samples,
      y: !showTop && showBottom ? ['--'] : ['-'],
      z: [fillerArr],
      type: 'heatmap',
      showscale: false,
      connectgaps: false,
      hoverongaps: false,
      autocolorscale: false,
      hoverinfo: 'none',
      colorscale: [
         [0, 'rgba(214, 39, 40, 0.85)'],
         [0.5, 'rgba(255, 255, 255, 0.85)'],
         [1, 'rgba(6,54,21, 0.85)']
      ],
      zmax: 0,
      zmin: 1,
  })
  // need this for some mysterious reason
  data.forEach((track) => {
        if (track) {
            track.z.splice(0,0,[])
            track.y.splice(0,0,'')
        }
  })

  const layout = generateLayout(data, samples, showTop, showBottom)

  Plotly.newPlot('plotly-heatmap', data, layout);
  return document.getElementById('plotly-heatmap')
}