import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const cartSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      trim: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      trim: true,
    },
  },
  { timestamps: true }
);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
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
      default: false,
    },
    cartItems: [cartSchema],
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(13);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
