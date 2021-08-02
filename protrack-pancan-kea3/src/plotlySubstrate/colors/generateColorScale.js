import categorical from './categoricalColors'
import continuous from './continuousColors'

export default function discreteColorScale(dataType){
    // bvals - list of values bounding intervals/ranges of interest
    // colors - list of rgb or hex colorcodes for values in [bvals[k], bvals[k+1]],0<=k < len(bvals)-1
    // returns the plotly  discrete colorscale

    if (dataType in continuous) {
        return continuous[dataType]
    }

    let bvals = []
    let colors = []
    let zmax, zmin

    Object.entries(categorical[dataType]).forEach(([k, v]) => {
        bvals.push(parseInt(k))
        colors.push(v.color)
    })
    zmax = Math.max(...bvals)
    zmin = Math.min(...bvals)
    bvals.push(zmax + 1)

    if (bvals.length !== colors.length+1) {
        throw 'len(boundary values) should be equal to  len(colors)+1'
    }
    bvals.sort()
    const nvals = bvals.map((v) => {
        return (v-bvals[0])/(bvals[bvals.length - 1]-bvals[0])
    })
    let dcolorscale = []
    colors.forEach((v, k) => {
        const colorRange = [[nvals[k], colors[k]], [nvals[k+1], colors[k]]]
        dcolorscale.push(...colorRange)
    })
    return { colorscale: dcolorscale, showscale: false, hoverinfo: 'none', zmin, zmax }
}

