export default {
    'Overall survival (days)': {
      colorscale: [
        [0.0, '#cdcdcd'],
        [1.0, '#00429d']
      ],
      colorbar: {
        title: '<b>Overall survival<br>(days)</b>',
          x: 1.2,
          thickness: 10,
      },
      showscale: true,

    },
    'Estimate Tumor Purity (T)': {
      colorscale: [
        [0.0, '#cdcdcd'],
        [1.0, '#6b2983']
      ],
      colorbar: {
        title: '<b>ESTIMATE<br>purity</b>',
          x: 1.1,
          thickness: 10,
      },
      showscale: true,
      zmin: 0,
      zmax: 1
    },
    'Estimate Tumor Purity (N)': {
      colorscale: [
        [0.0, '#cdcdcd'],
        [1.0, '#6b2983']
      ],
      showscale: false, // duplicate of previous colorbar
      zmin: 0,
      zmax: 1
    },

}