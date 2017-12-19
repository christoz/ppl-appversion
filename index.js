
/**
 * get the latest app version from google play and itunes
 * @param  {string} bundleId [com.prod.ppl|com.prod.deo2]
 * @param  {string} locale [gb|de]
 * @param  {string} service [itunes|googleplay]
 * @return {string}
 */
module.exports = getLatestAppVersion = (bundleId, locale, service) => {
  let serviceUrl = ''
  if (service === 'itunes') serviceUrl = `http://itunes.apple.com/lookup?bundleId=${bundleId}&country=${locale}`
  if (service === 'googleplay') serviceUrl = `https://androidquery.appspot.com/api/market?app=${bundleId}`
  if(!service) return false

  return fetch(serviceUrl)
  .then(response => {
    if (response) {
      if (service === 'itunes') {
        if (response.resultsCount > 0) {
          return results[0].version
        }
      }

      if (service === 'googleplay') {
        return response.version
      }
    }
  })
  .catch (err => {
    console.log(err)
    throw err
  })
}

