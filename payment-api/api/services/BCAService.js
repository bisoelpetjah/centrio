const crypto = require('crypto')

const BASE_URL = 'https://api.finhacks.id'

const CLIENT_ID = sails.config.bca.CLIENT_ID
const CLIENT_ID_SECRET = sails.config.bca.CLIENT_ID_SECRET
const OAUTH_CREDENTIAL = sails.config.bca.OAUTH_CREDENTIAL
const API_KEY = sails.config.bca.API_KEY
const API_SECRET = sails.config.bca.API_SECRET

const generateSignature = (HTTPMethod, relativeUrl, accessToken, requestBodySHA256, timestamp) => {
  let stringToSign = HTTPMethod + ":" + relativeUrl + ":" + accessToken + ":" + requestBodySHA256 + ":" + timestamp
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
  let XBCAPayload = generateXBCA(HTTPMethod, relativeUrl, accessToken, requestBody)
  let reqs = [
    'curl "https://api.finhacks.id'+relativeUrl+'" ',
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
  return axios
    .post(`${BASE_URL}/api/oauth/token`, params, headers)
    .then(resp => resp.data.access_token)
}

module.exports = {

  generateSignature,
  
  generateXBCA,

  generateCURLRequest,

  getAccessToken,

}


