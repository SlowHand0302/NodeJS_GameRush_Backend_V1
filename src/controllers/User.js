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
        .select('_id name username email phoneNumb')
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
        .select('_id name username email phoneNumb role')
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
    console.log(req.query);
    await Users.find({})
        .select('_id name username email phoneNumb')
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
        .select('_id name username email phoneNumb')
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
                msg: 'Không tìm thấy tài khoản',
            });
        }
        const passwordIsValid = password === user.password;
        if (!passwordIsValid) {
            return res.status(401).json({
                auth: false,
                msg: 'Sai mật khẩu',
                token: null,
            });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: 86400 });
        return res.status(200).json({
            auth: true,
            msg: 'Đăng nhập thành công',
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                username: user.username,
                phoneNumb: user.phoneNumb,
                role: user.role,
            },
        });
    });
};

module.exports.VerifyAuth = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            msg: 'No token provided',
        });
    }

    jwt.verify(token.split('Bearer ')[1], process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({
                auth: false,
                msg: 'Failed to authentication token',
            });
        }
        if (Math.floor(Date.now() / 1000) > decoded.exp) {
            return res.status(401).json({
                auth: false,
                msg: 'Your token is expired',
            });
        }
        req.userRole = decoded.role;
        next();
    });
};

module.exports.checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            return res.status(403).json({
                auth: false,
                msg: 'Forbidden: You do not have the required role',
            });
        }
        next();
    };
};
