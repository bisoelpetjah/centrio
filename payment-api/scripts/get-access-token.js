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

  console.log()
  console.log(sails.config.bca)

  BCAService
    .getAccessToken()
    .then(console.log)
}

