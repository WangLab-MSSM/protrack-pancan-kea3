
/*
Input

tracks: array of objects
[
  {
    kinase: str,
    direction: str,
    data: {
      sampleId (str): zscore (float),
      ...
    }
  },
  ...
]

filterKey: str
filterVal: str
*/

/*
Output

Plotly trace group object (group of tracks)

{
    x: [...sampleIds],
    y: [...trackNamesAlphabetized],
    z: [...zScores],
    type: 'heatmap',
    hovertemplate: zScoreHoverTemplate,
    colorscale: colorscaleValueZscore,
    showscale: true,
    connectgaps: false,
    hoverongaps: false,
    autocolorscale: false,
    zmin:-3,
    zmax:3,
    colorbar: {
      title: '<b>zscore</b>',
        x: 1.00,
        thickness: 10,
        side: 'bottom',
    },
    title: 'zscore'
}
 */

export default function generateTrackGroup(tracks, samples) {
  // const tracks = trackObj.filter(el => el[filterKey] === filterVal)
  tracks.sort((a, b) => a.name - b.name)

  return {
    x: [...samples],
    y: tracks.map(el => el.name),
    z: tracks.map((el) => {
      return samples.map(sample => el.data[sample])
    }),
    type: 'heatmap',
    colorscale: [
      [0.0, '#002CFE'],
      [1.0, '#FFFF00']
    ],
    showscale: false,
    connectgaps: false,
    hoverongaps: false,
    autocolorscale: false,
    zmin:-3,
    zmax:3,
    colorbar: {
      title: '<b>zscore</b>',
        x: 1.02,
        thickness: 10,
        side: 'bottom',
    },
    title: 'zscore'
  }
}