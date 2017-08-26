/**
 * TransactionController
 *
 * @description :: Server-side logic for managing transactions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const getUserSharedsecret = (userId) => {
  return 'RL722DYux4ZIJ0/oIm0Uw51nQ+ofXPtjMjYn7IJksCfz2+Tz9NVV0JerfAzzHD/v1Hxpz+sGeiw/HJ89XQjpbHILm+saLN9Xom0eIMpxVexbthG/YZ3g+ZQmcLCP/pKde3XuzyCwLDdzkPwYfLVP9ElQH07RMBlHfJk0M2nAx44='
}

module.exports = {

  create: function(req, res) {
    const accessToken = req.headers['access-token']
    const item_uuid = req.body['item']
    const customer_id = req.body['customer']
    const amount = req.body['amount']
    const buyerId = sails.config.bca.BUYER_ACCOUNT_ID
    const merchantId = sails.config.bca.MERCHANT_ACCOUNT_ID
    return Promise
      .resolve()
      .then(function () {
        return Item
          .findOne({item_id: item_uuid})
      })
      .then(function (item) {
        let proms = [
          BCAService.transact(buyerId, merchantId, amount * item.price, accessToken),
          Transaction.create({
            customer: customer_id,
            item: item.id,
            amount: amount
          })
        ] 
        return Promise.all(proms)
      })
      .then(function (proms) {
        res.json({})
      })
      .catch((e) => {
        res.json({'error':e.message})
      })
  },
}

