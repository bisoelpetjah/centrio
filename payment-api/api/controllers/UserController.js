/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  showcase: function(req, res) {
    id = req.params['id']
    User
      .findOne({'id': id})
      .then(function (user) {
        user
          .get_items()
          .then(function (items) {
            items = items.sort(function(a,b) {return (a.updatedAt > b.updatedAt) ? -1 : ((b.updatedAt > a.updatedAt) ? 1 : 0);} ); 
            payload = {
              user: user,
              items: items,
            }
            res.view('showcase', payload)
          })
      })
      .catch((e) => {
        console.log(e.message)
        res.json(e.message)
      })
  },

  showcaseApi: function(req, res) {
    id = req.params['id']
    User
      .findOne({'id': id})
      .then(function (user) {
        user
          .get_items()
          .then(function (items) {
            items = items.sort(function(a,b) {return (a.updatedAt > b.updatedAt) ? -1 : ((b.updatedAt > a.updatedAt) ? 1 : 0);} ); 
            items = items.map(function(item) { item.qr = ''; item.merchant = null; return item });
            payload = items
            res.json(payload)
          })
      })
      .catch((e) => {
        console.log(e.message)
        res.json(e.message)
      })
  },

  transaction: function(req, res) {
    id = req.params['id']
    User
      .findOne({'id': id})
      .then(function (user) {
        return Transaction
          .find({customer:user.id})
          .sort('date_time DESC')
          .populate('item')
      })
      .then(function (transactions) {
        merchants = transactions
          .map(function (transaction) {
            return User.findOne(transaction.item.merchant)
          })
        p_transactions = [Promise.resolve().then(function () { return transactions})]
        proms = merchants.concat(p_transactions)
        return Promise.all(proms)
      })
      .then(function (proms) {
        transactions = proms.pop()
        merchants = proms
        transactions = transactions
          .map(function (transaction, idx) {
            transaction.item.merchant = merchants[idx]
            transaction.item.qr = ''
            return transaction
          })
        res.json(transactions)
      })
      .catch(console.log)
  },

  transaction_page: function(req, res) {
    id = req.params['id']
    
    p1 = User.findOne({'id': id})

    p2 = User
      .findOne({'id': id})
      .then(function (user) {
        return Transaction
          .find({customer:user.id})
          .sort('date_time DESC')
          .populate('item')
      })
      .then(function (transactions) {
        merchants = transactions
          .map(function (transaction) {
            return User.findOne(transaction.item.merchant)
          })
        p_transactions = [Promise.resolve().then(function () { return transactions})]
        proms = merchants.concat(p_transactions)
        return Promise.all(proms)
      })
      .then(function (proms) {
        transactions = proms.pop()
        merchants = proms
        transactions = transactions
          .map(function (transaction, idx) {
            transaction.item.merchant = merchants[idx]
            transaction.item.qr = ''
            return transaction
          })
        return transactions
      })
    
    Promise
      .all([p1, p2])
      .then(function (proms) {
        payload = {
          user: proms[0],
          transactions: proms[1]
        }
        res.view('transaction_page', payload)
      })
      .catch(console.log)
  },

  chart: function(req, res) {
    id = req.params['id']
    User
      .findOne({'id': id})
      .then(function (user) {
        p1 = user
          .get_items()
          .then(function (items) {
            items = items.sort(function(a,b) {return (a.updatedAt > b.updatedAt) ? -1 : ((b.updatedAt > a.updatedAt) ? 1 : 0);} ); 
            payload = {
              user: user,
              items: items,
            }                        
            return payload
          })
        p2 = Transaction.find()
          .then(function (transactions) {                        
            payload = {
              transactions: transactions,
            }
            return payload            
          })          
        return Promise.all([p1, p2])
      })
      .then(function(payloads) {
        payload = {
          user: payloads[0].user,
          items: payloads[0].items,
          transactions: payloads[1].transactions,
        }
        res.view('chart', payload)
      })
      .catch(console.log)
  },

  getBalance: function(req, res) {
    const accessToken = req.headers['access-token']
    const accountNumber = req.params['accountId']
    const corporateId = sails.config.bca.CORPORATE_ID
    BCAService
      .getBalanceInfo(accountNumber, corporateId, accessToken)
      .then((payloads) => {
        if (!payloads.ErrorCode) {
          res.json({'result': payloads})
        } else {
          res.status(401).json({'result': payloads})
        }
      })
      .catch((e) => {
        console.log(e.message)
        res.json(e.message)
      })
  },

  getAccessToken: function(req, res) {
    BCAService
      .getAccessToken()
      .then((payloads) => {
        res.json({'result': payloads})
      })
      .catch((e) => {
        console.log(e.message)
        res.json(e.message)
      })
  },

  getUserInfo: function(req, res) {
    const accessToken = req.headers['access-token']
    const accountNumber = sails.config.bca.BUYER_ACCOUNT_ID
    const corporateId = sails.config.bca.CORPORATE_ID
    const userId = req.params.id
    return User
      .findOne({id:userId})
      .then((user) => {
        return BCAService
          .getBalanceInfo(accountNumber, corporateId, accessToken)
          .then((info) => {
            if (info.ErrorCode) {
              res.status(401).json({'result': info})
            } else {
              let payload = user
              payload.balance = info.AccountDetailDataSuccess[0].AvailableBalance
              res.json(payload)
            }
          })
      })
      .catch((e) => {
        console.log(e.message)
        res.json(e.message)
      })
  },

  buySomething: function(req, res) {
    const accessToken = req.headers['access-token']
    const amount = req.body['amount']
    const buyerId = sails.config.bca.BUYER_ACCOUNT_ID
    const merchantId = sails.config.bca.MERCHANT_ACCOUNT_ID

    return BCAService
      .transact(buyerId, merchantId, amount, accessToken)
      .then((payload) => res.json(payload))
      .catch((e) => {
        console.log(e.message)
        res.json(e.message)
      })
  },


}

