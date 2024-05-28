const { Users } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// api/user/create
module.exports.POST_CreateUser = async (req, res, next) => {
    return await Users.create({ ...req.body })
        .then((user) => {
            return res.status(200).json({
                success: true,
                msg: 'Create Success',
                data: user,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/user/readMany
module.exports.GET_ReadMany = async (req, res, next) => {
    return await Users.find({})
        .then((users) => {
            if (users.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: 'Empty Database',
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Found ${users.length} users`,
                users,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/user/readOne/:_id
module.exports.GET_ReadOne = async (req, res, next) => {
    const { _id } = req.params;
    return await Users.findOne({ _id })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: `Not found ${_id}`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: 'User is found',
                user,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err.message,
            });
        });
};

// api/user/readBySort?sort=type
module.exports.GET_ReadBySort = async (req, res, next) => {
    const { sort } = req.query;
    await Users.find({})
        .sort(sort)
        .then((users) => {
            if (users.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: 'Empty Database',
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Found ${users.length} users`,
                users,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/user/updateOne/:_id
module.exports.PUT_UpdateOne = async (req, res, next) => {
    const { _id } = req.params;
    return await Users.findOneAndUpdate({ _id }, { ...req.body }, { returnOriginal: false })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: `Not found ${_id}`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: 'Update successfully',
                user,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/user/search?name=
module.exports.GET_Search = async (req, res, next) => {
    const name = req.query.name;
    return await Users.find({ name: { $regex: name, $options: 'i' } })
        .limit(10)
        .exec()
        .then((users) => {
            if (!users) {
                return res.status(400).json({
                    success: false,
                    msg: 'Not Found User match condition',
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Found router ${users.length} users`,
                users,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/user/auth
module.exports.POST_Authentication = async (req, res, next) => {
    const { email, password } = req.body;
    return await Users.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(404).json({
                auth: false,
                msg: 'Not found User',
            });
        }
        const passwordIsValid = password === user.password;
        if (!passwordIsValid) {
            return res.status(401).json({
                auth: false,
                msg: 'Wrong Password',
                token: null,
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: 86400 });
        return res.status(200).json({
            auth: true,
            msg: 'Login Success',
            token,
            user: {
                id: user._id,
                name: user.name,
                phoneNumber: user.phoneNumb,
                email: user.email,
            },
        });
    });
};
