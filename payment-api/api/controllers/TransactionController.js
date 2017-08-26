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
    item_uuid = req.body['item']
    customer_id = req.body['customer']
    amount = req.body['amount']
    return Promise
      .resolve()
      .then(function () {
        return Item
          .findOne({item_id: item_uuid})
      })
      .then(function (item) {
        return Transaction
          .create({
            customer: customer_id,
            item: item.id,
            amount: amount
          })
      })
      .then(function (transaction) {
        res.json({})
      })
      .catch((e) => {
        res.json({'error':e.message})
      })
  },
}

