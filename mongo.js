const { request } = require('./app');
// const { mongo } = require('mongoose');
const { find } = require('./models/user');

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://shamali:1234@cluster0-u7jdg.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(url);

const createTransaction = async (req, res, next) => {
  const newTransaction = {
    account: req.body.account,
    amount: req.body.amount,
    type: req.body.type, //credit or debit
  };

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection('transactions').insertOne(newTransaction)
  } catch (error) {
    return res.json({ message: " Could not store data." })
  };
  client.close();

  res.json(newTransaction);
};

const loginUsers = async (req, res, next) => {
  const newTransaction = {
    username: req.body.username,
    account: req.body.account,
    type: req.body.type //admin or user
  };

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection('users').insertOne(newTransaction)
  } catch (error) {
    return res.json({ message: " Could not store data." })
  };
  client.close();

  res.json(newTransaction);
};


const createUser = async (req, res, next) => {
  const newTransaction = {
    username: req.body.username,
    account: req.body.account,
    balance: req.body.balance, //credit or debit
    type: req.body.type //admin or user
  };

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection('users').insertOne(newTransaction)
  } catch (error) {
    return res.json({ message: " Could not store data." })
  };
  client.close();

  res.json(newTransaction);
};


const getTransactions = async (req, res, next) => {
  let transactions;

  try {
    await client.connect();
    const db = client.db();
    transactions = db.collection('transactions').find({}).toArray(function (error, trx) {
      console.log(error)
      console.log(trx)
      res.send(trx);
    });
  } catch (error) {
    return res.json({
      message: 'Could not retrieve transactions.',
      error: error
    });
  };

};


const getUsers = async (req, res, next) => {
  let transactions;

  try {
    await client.connect();
    const db = client.db();
    transactions = db.collection('users').find({type: "user"}).toArray(function (error, usr) {
      console.log(error)
      console.log(usr)
      res.send(usr);
    });
  } catch (error) {
    return res.json({
      message: 'Could not retrieve transactions.',
      error: error
    });
  };

};

const getTransactionsbyId = async (req, res, next) => {

  let transactions;

  try {
    await client.connect();
    const db = client.db();
    transactions = db.collection('transactions').find({ account: req.params.account}).toArray(function (error, trx) {
      console.log(req.params.account)
      console.log(error)
      console.log(trx)
      res.send(trx);
    });
  } catch (error) {
    return res.json({
      message: 'Could not retrieve transactions.',
      error: error
    });
  };

};

const getuserbyName = async (req, res, next) => {

  let user;

  try {
    await client.connect();
    const db = client.db();
    user = db.collection('users').find({ username: req.params.username }).toArray(function (error, trx) {
      console.log(error)
      console.log(trx)
      res.send(trx);
    });
  } catch (error) {
    return res.json({
      message: 'Could not retrieve transactions.',
      error: error
    });
  };

};

const getUserCount = async (req, res, next) => {

  try {
    await client.connect();
    const db = client.db();
    userCount =  db.collection('users').find({type:"user"}).count({},function(err, result){

      if(err){
          res.send(err)
      }
      else{
          res.json(result)
      }

 })
  } catch (error) {
    return res.json({
      message: 'Could not retrieve transactions.',
      error: error
    });
  };

};

const adminHome = async (req, res, next) => {

  let home;

  try {
    await client.connect();
    const db = client.db();
    totalBalance = db.collection('users').aggregate([
      { $group: { _id: "$type", total: { $sum: "$balance" } } }
    ]
    ).toArray(function (error, bal) {
      console.log(error)
      console.log(bal)
      res.send(bal);
    });
  } catch (error) {
    return res.json({
      message: 'Could not retrieve transactions.',
      error: error
    });
  };

};

const transferToAcc = async (req, res, next) => {
  const newTransaction = {
    account: req.body.account,
    amount: req.body.amount,
    };

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection('transactions').insertOne(newTransaction)
  } catch (error) {
    return res.json({ message: " Could not store data." })
  };
  client.close();

  res.json(newTransaction);
};


module.exports.transferToAcc=transferToAcc;
module.exports.adminHome = adminHome;
module.exports.getTransactions = getTransactions;
module.exports.createTransaction = createTransaction;
module.exports.getTransactionsbyId = getTransactionsbyId;
module.exports.createUser = createUser;
module.exports.getuserbyName = getuserbyName;
module.exports.getUserCount=getUserCount;
module.exports.getUsers=getUsers;