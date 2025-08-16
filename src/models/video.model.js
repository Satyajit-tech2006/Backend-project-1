import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const { Schema } = mongoose;
const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Education', 'Entertainment', 'Music', 'Gaming', 'News', 'Sports', 'Lifestyle'],
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", videoSchema);