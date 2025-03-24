/* Peer review: 
overall code is good...minor updates to get to clean it up
- did not need to include "import jwt..."
- line 23 should be addedUsers following the model
- line 41-43 should reference Rooms model as a return
*/

import express from "express"
//import jwt from "jsonwebtoken"
import Room from "../models/rooms"


const router = express.Router();


router.post("/create", async (req, res) => {
    try {
        const { name, description } = req.body;

        const newRoom = new Room({
            name: name,
            description: description,
            user_id: req.user_id,
        });

        const room = await newRoom.save();
        res.status(200).json({
            Msg: "Room created successfully!",
            Room: room,
        });


    } catch (err) {
        res.status(500).json({
            Error: err.message,
        });
    }
});
router.get("/all", async (req, res) => {
    try {
        const rooms = await Room.find()
            .populate("user_id", ["firstName", "lastName", "-_id"])
            .select({ name: 1, description: 1, createId: 1 });

        res.status(200).json(rooms);

    } catch (err) {
        res.status(500).json({
            Error: err.message,
        });
    }
});



export default router;