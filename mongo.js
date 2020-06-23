const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://shamali:1234@cluster0-u7jdg.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(url);


const createTransaction = async (req, res, next) => {
  const newTransaction = {
    toAccount:req.body.toAccount,
    fromAccount: req.body.fromAccount,
    amount: req.body.amount*1,
    type: req.body.type, //credit or debit
  };

  try {
    await client.connect();
    const db = client.db();
    db.collection('transactions').insertOne(newTransaction)
  } catch (error) {
    return res.json({ message: " Could not store data." })
  };
  client.close();

  res.json(newTransaction);
};

const login = async (req, res, next) => {
  const userDets = {
     username:req.body.username,
     password:req.body.password  } ;

  let existingUser;

  try {
    await client.connect();
    const db = client.db();
    existingUser = await adminHome.collection('users').findOne({ username: username })
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  res.json({message:'Logged In!'});
};

const createUser = async (req, res, next) => {
  const newTransaction = {
    username: req.body.username,
    account: req.body.account,
    password: req.body.password,
    balance: req.body.balance*1, 
    type: req.body.type //admin or user
  };

  try {
    await client.connect();
    const db = client.db();
    db.collection('users').insertOne(newTransaction)
  } catch (error) {
    return res.json({ message: " Could not store data." })
  };
  client.close();

  res.json(newTransaction);
};


const getTransactions = async (req, res, next) => {
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
    toAccount:req.body.account,
    fromAccount: req.body.account,
    amount: req.body.amount*1,
    };

  try {
    await client.connect();
    const db = client.db();
     db.collection('transactions').insertOne(newTransaction)
    //  db.collection('users').updateOne({ account: toAccount }, { $set: { balance: balance + amount } })
    //  db.collection('users').updateOne({ account: fromAccount }, { $set: { balance: balance - amount } })

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
module.exports.login = login;