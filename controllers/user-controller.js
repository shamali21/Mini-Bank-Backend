// const uuid = require('uuid/v4');
// const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Shamali Shinde',
        account: '78987654345678',
        balance: '$5325',
        password: '1234'
    },
    {
        id: 'u2',
        name: 'Micheal Scott',
        account: '1234587654543',
        balance: '$25754',
        password: 'ms123'
    }
];

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { name, account, password, balance } = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        );
        return next(error);
    }

    const createdUser = new User({
        name,
        account,
        password,
        balance
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email })
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

    res.json({ message: 'Logged in!' });
};

const getTransactionsByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let transc;
    try {
        transc = await user.find({ creator: userId });
    } catch (err) {
        const error = new HttpError(
            'Fetching transactions failed, please try again later',
            500
        );
        return next(error);
    }

    if (!transc || transc.length === 0) {
        return next(
            new HttpError('Could not find transactions for the provided user id.', 404)
        );
    }

    res.json({ transc: transc.map(trans => trans.toObject({ getters: true })) });
};


const transfer = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { account, amount } = req.body;

    const createdTransfer = new Transfer({
        account, amount
    });

    try {
        await createdTransfer.save();
    } catch (err) {
        const error = new HttpError(
            'Completeing transfer',
            500
        );
        return next(error);
    }

    res.status(201).json({ trans: createdTransfer });
};

const getUserByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let user;
    try {
        user = await User.find({ creator: userId });
    } catch (err) {
        const error = new HttpError(
            'Fetching user failed, please try again later',
            500
        );
        return next(error);
    }

    if (!user || user.length === 0) {
        return next(
            new HttpError('Could not find user for the provided user id.', 404)
        );
    }

    res.json({ user: user.map(us => us.toObject({ getters: true })) });
};

exports.getUserByUserId = getUserByUserId;
exports.transfer = transfer;
exports.getTransactionsByUserId = getTransactionsByUserId;
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
