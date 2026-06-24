import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
        },
        originalUrl: {
            type: String,
            required: true,
        },
        clicks: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Url = mongoose.model("Url", urlSchema);