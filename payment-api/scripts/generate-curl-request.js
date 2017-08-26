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
  let relativeUrl = "/general/rate/forex"
  let accessToken = "EDFv06b3MI5c0WLvy2UrskCIqtMsdg517l2xn37pym352MBBOkmcGY"
  let requestBody = ""

  console.log()
  console.log(sails.config.bca)
  
  let curlReq = BCAService.generateCURLRequest(HTTPMethod, relativeUrl, accessToken, requestBody)
  console.log()
  console.log(curlReq)
}

