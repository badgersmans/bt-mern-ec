import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

userSchema.methods.matchPassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
};

const User = mongoose.model('User', userSchema);

export default User;