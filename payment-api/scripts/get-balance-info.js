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

  let accountNumber = "8220000509"
  let corporateId = "finhacks30"
  let accessToken = "wacxBDxBoj6mgUuYPeORwOJNUay40D0hE1kjVYlyWySXLx3YN56INI"

  console.log()
  console.log(sails.config.bca)
  
  BCAService
    .getBalanceInfo(accountNumber, corporateId, accessToken)
    .then(console.log)
}

