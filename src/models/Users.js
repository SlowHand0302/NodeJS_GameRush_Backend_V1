const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phoneNumb: { type: String, required: true },
        role: { type: String, required: true, default: 'Customer', enum: ['Customer', 'Admin'] },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Users', Users);
