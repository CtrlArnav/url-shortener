import express from "express";
import { Url } from "../models/Url.js";
const router = express.Router();

router.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;

    try {
        const url = await Url.findOne({ shortId });
        if (!url) {
            return res.status(404).send("Short link not found");
        }
        url.clicks += 1;
        await url.save();
        return res.redirect(url.originalUrl);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server error.");
    }
});

export default router;