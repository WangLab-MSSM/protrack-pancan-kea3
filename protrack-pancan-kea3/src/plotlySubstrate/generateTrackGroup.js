
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

export function generateTrackGroup(tracks, samples, fc=false) {
  // const tracks = trackObj.filter(el => el[filterKey] === filterVal)
  tracks.sort((a, b) => a.name - b.name)
  let colorbar, colorscale, zmax, zmin, showscale, autocolorscale;

  if (fc) {
    zmax = 3
    zmin = -3
    colorscale =  [
      [0.0, '#0059fe'],
      [1.0, '#e00b2d']
    ]
    colorbar = {
        title: '<b>fc</b>',
        x: 1.1,
        thickness: 10,
        len: 0.5,
        y: 0.7
    }
    showscale = true
    autocolorscale = true
  } else {
    showscale = true
    zmax = 3
    zmin = -3
    colorscale =  [
      [0.0, '#002CFE'],
      [1.0, '#FFFF00']
    ]
    colorbar = {
        title: '<b>-zscore</b>',
        x: 1.02,
        thickness: 10,
        side: 'bottom',
        len: 0.5,
        y: 0.7
    }
    autocolorscale = false
  }
  return {
    x: [...samples],
    y: tracks.map(el => el.name),
    z: tracks.map((el) => {
      return samples.map(sample => el.data[sample])
    }),
    type: 'heatmap',
    colorscale,
    connectgaps: false,
    hoverongaps: false,
    autocolorscale,
    zmin,
    zmax,
    colorbar,
    showscale
    // title: 'zscore'
  }
}

export function generateSubstrateTracks({ tracks, samples }) {
  let colorbar, colorscale, zmax, zmin, showscale, autocolorscale;

  zmax = 3
  zmin = -3
  colorscale =  [
    [0.0, '#0059fe'],
    [1.0, '#e00b2d']
  ]
  colorbar = {
      title: '<b>fc</b>',
      x: 1.1,
      thickness: 10,
      len: 0.5,
      y: 0.7
  }
  showscale = false
  autocolorscale = true

  return {
    x: [...samples],
    y: Object.keys(tracks.data),
    z: Object.entries(tracks.data).map(([substrate, substrateFC]) => {
      return samples.map(sample => substrateFC[sample])
    }),
    type: 'heatmap',
    colorscale,
    connectgaps: false,
    hoverongaps: false,
    autocolorscale,
    zmin,
    zmax,
    colorbar,
    showscale
  //   // title: 'zscore'
  }
}
