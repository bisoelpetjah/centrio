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

  let accountNumber = "8220000011"
  let corporateId = "finhacks01"
  let accessToken = "hdCKsAfFXZskdCTiN7KcicdcLGhFhZwCbrDpmFLHnqfMWrUBkxeewL"

  console.log()
  console.log(sails.config.bca)
  
  BCAService
    .getBalanceInfo(accountNumber, corporateId, accessToken)
    .then(console.log)
}

