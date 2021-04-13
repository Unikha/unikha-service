import { INft } from '../interfaces/INft';
import mongoose from 'mongoose';

const Nft = new mongoose.Schema(
  {
    token_id: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    attributes: {
        type: Array,
        required: true,
        default: []
    }
  },
  { timestamps: true },
);

export default mongoose.model<INft & mongoose.Document>('Nft', Nft);