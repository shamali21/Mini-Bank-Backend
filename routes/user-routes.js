var express = require('express');
var router = express.Router();

// router.get('/', function (req, res, next) {
//     // res.send('API is working properly');
//     res.json({
//         status: 'Transactions',
//         trans1: '+$134',
//         trans2: '-$30',
//         trans3: '+$1400'

//     })
// });

// router.get('/', function (req, res, next) {
//     // res.send('API is working properly');
//     res.json({
//         status: 'API is working',
//         accTo: 2345678909876543,
//         accFrom: 123456898765432
//     })
// });

// router.get('/', async (req, res) => {
//     const users = await req.context.models.User.find();
//     return res.send(users);
// });

// router.get('/', function(req, res, next) {
//     // res.send('API is working properly');
    
//     res.json({
//       status: 'API is working',
//       name: 'Shamali Shinde',
//       acc_no: 123456898765432,
//       acc_balance: '$23454'
//     })
//   });
  

// module.exports = router;

const usersController = require('../controllers/user-controller');

router.get('/:uid', usersController.getUserByUserId);

router.post('/transfer',usersController.transfer);





router.get('/transaction', usersController.getTransactionsByUserId);

module.exports = router;
exports.getUserByUserId = getUserByUserId;
exports.transfer = transfer;
exports.getTransactionsByUserId = getTransactionsByUserId;


