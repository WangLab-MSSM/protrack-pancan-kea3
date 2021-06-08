export default function getSortedKeys(seriesData, tumor, filteredSamples, asc=true, tumorsLocked=true) {

  // const seriesDataHack = {}
  // Object.entries(seriesData).el

  if (asc) {
    if (tumorsLocked) {
        return filteredSamples.sort(
          function(b,a){
                  if (tumor[a] === tumor[b]) { // if tumors are same, check only z score
                      return seriesData[b] - seriesData[a]
                  }
                  return tumor[b] > tumor[a] ? -1 : 1
              }
          );
    }

    return filteredSamples.sort((b,a) => seriesData[b] - seriesData[a])
  } else {

    if (tumorsLocked) {
        return filteredSamples.sort(
              function(a,b){
                  if (tumor[a] === tumor[b]) { // if tumors are same, check only z score
                      return seriesData[b] - seriesData[a]
                  }
                  return tumor[b] > tumor[a] ? 1 : -1
              }
          );
      }

    return filteredSamples.sort((a,b) => seriesData[b] - seriesData[a])
  }
}