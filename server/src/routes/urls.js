import express from "express";
import { Url } from "../models/Url.js";
import { generateUniqueCode } from "../utils/base62.js";

const router = express.Router();

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
        return false;
    }
}

router.post("/shorten", async (req, res) => {
    const { originalUrl } = req.body;
    //1. Validate
    if (!originalUrl || !isValidUrl(originalUrl)) {
        return res.status(400).json({
            error: "Please provide a valid URL",
        });
    }
    try {
        //2. Already shortened this URL before? Reusing it
        const existing = await Url.findOne({ originalUrl });
        if (existing) {
            return res.json({
                shortId: existing.shortId,
                shortUrl: `${process.env.BASE_URL}/${existing.shortId}`,
                reused: true,
            });
        }
        //3. Generate a unqiue short code
        const shortId = await generateUniqueCode((code) =>
            Url.exists({ shortId: code })
        );
        //4. Save to database
        const newUrl = await Url.create({ shortId, originalUrl });
        //5. Send back the result
        return res.status(201).json({
            shortId: newUrl.shortId,
            shortUrl: `${process.env.BASE_URL}/${newUrl.shortId}`,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error." });
    }
});

export default router;