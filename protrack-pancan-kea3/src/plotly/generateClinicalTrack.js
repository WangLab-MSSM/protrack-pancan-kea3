import generateColorScale from './colors/generateColorScale'

/*
Input

clinicalTracks: object of objects
{
  sampleId (str): {
    val: str,
    colorKey: int
  },
  ...
}
*/

/*
Output

Plotly trace group object (group of tracks)

{
    x: [...sampleIds],
    y: [...trackNamesAlphabetized],
    z: [...colorKeys],
    type: 'heatmap',
    hovertemplate: zScoreHoverTemplate,
    colorscale: colorScale,
    zmin:-3,
    zmax:3,
    showscale: false,
    connectgaps: false,
    hoverongaps: false,
    autocolorscale: false,
}
 */

export default function generateClinicalTrack(
  trackName,
  trackObj,
  samples
) {

  // let customData = samples.map(s => trackObj[s].val)
  const colorVals = samples.map((s) => {
      return trackObj[s].colorKey
  })

  const colorOptions = generateColorScale(trackName)

  return {
    x: [...samples],
    y: [trackName],
    z: [colorVals],
    type: 'heatmap',
    connectgaps: false,
    hoverongaps: false,
    autocolorscale: false,
    ...colorOptions,
  }
}