var Sails = require('sails')

Sails.lift({
  environment: 'test',
  port: 1330,
  models: {
    connection: 'test',
    migrate: 'drop'
  }
}, function(err, server) {
  sails = server
  main(sails)
  Sails.lower()
})

const main = (sails) => {

  let HTTPMethod = "GET"
  let relativeUrl = "/banking/v4/corporates/finhacks01/accounts/8220000011"
  let accessToken = "hdCKsAfFXZskdCTiN7KcicdcLGhFhZwCbrDpmFLHnqfMWrUBkxeewL"
  let requestBody = ""

  console.log()
  console.log(sails.config.bca)
  
  let curlReq = BCAService.generateCURLRequest(HTTPMethod, relativeUrl, accessToken, requestBody)
  console.log()
  console.log(curlReq)
}

