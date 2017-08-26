const crypto = require('crypto')

const BASE_URL = 'https://api.finhacks.id'

const CLIENT_ID = sails.config.bca.CLIENT_ID
const CLIENT_ID_SECRET = sails.config.bca.CLIENT_ID_SECRET
const OAUTH_CREDENTIAL = sails.config.bca.OAUTH_CREDENTIAL
const API_KEY = sails.config.bca.API_KEY
const API_SECRET = sails.config.bca.API_SECRET

const generateSignature = (HTTPMethod, relativeUrl, accessToken, requestBodySHA256, timestamp) => {
  let stringToSign = HTTPMethod.toUpperCase() + ":" + relativeUrl.trim() + ":" + accessToken + ":" + requestBodySHA256 + ":" + timestamp
  // console.log(stringToSign)
  let signature = crypto.createHmac('sha256', API_SECRET).update(stringToSign).digest('hex')
  return signature
}

const generateXBCA = (HTTPMethod, relativeUrl, accessToken, requestBody) => {
  let requestBodySHA256 = sha256(requestBody)
  let timestamp = moment().toISOString()
  let signature = generateSignature(HTTPMethod, relativeUrl, accessToken, requestBodySHA256, timestamp)
  let XBCAKey = API_KEY
  let XBCATimestamp = timestamp
  let XBCASignature = signature
  return {
    'X-BCA-Key': XBCAKey,
    'X-BCA-Timestamp': XBCATimestamp,
    'X-BCA-Signature': XBCASignature
  }
}

const generateCURLRequest = (HTTPMethod, relativeUrl, accessToken, requestBody) => {
  let relativeUrl_ = relativeUrl.trim()
  let XBCAPayload = generateXBCA(HTTPMethod, relativeUrl_, accessToken, requestBody)
  let reqs = [
    'curl "https://api.finhacks.id'+relativeUrl_+'" ',
    '-H "Authorization: Bearer '+accessToken+'" ',
    '-H "Content-Type: application/json" ',
    '-H "Origin: centr.io" ',
    '-H "X-BCA-Key: '+XBCAPayload['X-BCA-Key']+'" ',
    '-H "X-BCA-Timestamp: '+XBCAPayload['X-BCA-Timestamp']+'" ',
    '-H "X-BCA-Signature: '+XBCAPayload['X-BCA-Signature']+'"'
  ]
  let req = reqs.join('')
  return req
}

const getAccessToken = () => {
  const params = querystring.stringify({
      'grant_type': 'client_credentials'
    })
  const headers = {
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${OAUTH_CREDENTIAL}`
    }
  }
  console.log(sails.config.bca)
  console.log(JSON.stringify(headers, null, 2))
  return axios
    .post(`${BASE_URL}/api/oauth/token`, params, headers)
    .then(resp => resp.data.access_token)
    .catch(console.log)
}

const getBalanceInfo = (accountNumber, corporateId, accessToken) => {
  const HTTPMethod = 'GET'
  const relativeUrl = `/banking/v4/corporates/${corporateId}/accounts/${accountNumber}`
  const URL = `${BASE_URL}${relativeUrl}`
  const XBCAPayload = generateXBCA(HTTPMethod, relativeUrl, accessToken, "")
  const headers = Object.assign({},
    {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Origin': 'centr.io',
    }, XBCAPayload)
  console.log(sails.config.bca)
  console.log(URL)
  console.log(JSON.stringify(headers, null, 2))
  const params = {'headers': headers}
  return axios
    .get(URL, params)
    .then(resp => resp.data)
    .catch(console.log)
}

module.exports = {

  generateSignature,
  
  generateXBCA,

  generateCURLRequest,

  getAccessToken,

  getBalanceInfo,

}


