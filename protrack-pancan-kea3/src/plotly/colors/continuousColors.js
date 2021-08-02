export default {
    'Overall survival (days)': {
      colorscale: [
        [0.0, '#cdcdcd'],
        [1.0, '#00429d']
      ],
      colorbar: {
        title: '<b>Overall<br>survival<br>(days)</b>',
          x: 1.24,
          thickness: 10,
          len: 0.5,
          y: 0.7
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
          x: 1.17,
          thickness: 10,
          len: 0.5,
          y: 0.7
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