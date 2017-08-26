var Sails = require('sails')

Sails.lift({
  environment: 'test',
  port: 1337,
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
  console.log(sails.config.bca)
}
