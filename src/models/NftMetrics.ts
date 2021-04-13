import { INftMetrics } from '../interfaces/INft';
import mongoose from 'mongoose';

const NftMetrics = new mongoose.Schema(
  {
    contract: {
        type: String,
        required: true
    },
    token_id: {
        type: Number,
        required: true
    },
    creator: {
        type: String, 
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    on_sale: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
  },
  { timestamps: true },
);

export default mongoose.model<INftMetrics & mongoose.Document>('NftMetrics', NftMetrics);