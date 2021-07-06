import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const productSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    reviews: [reviewSchema],
    avgRating: {
        type: Number,
        required: true,
        default: 0
    },
    reviewCount: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        trim: true
    },
    stockQuantity: {
        type: Number,
        required: true,
        default: 0,
        trim: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;