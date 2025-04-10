//? Importing required libraries
import express from "express"

//? Importing Message model
import Message from "../models/message.js"
import User from "../models/user.js"
import Room from "../models/rooms.js"
import mongoose from "mongoose"

//? Initializing Router for this controller
const router = express.Router()


//? create a new message
router.post("/create", async (req, res) => {
    try {
        const { user, room, body } = req.body

        if (!user || !room || !body) {
            throw new Error("User, room, and body are all required.");
        }

        //validate that object is in database
        if (
            !mongoose.Types.ObjectId.isValid(user) ||
            !mongoose.Types.ObjectId.isValid(room)
        ) {
            throw new Error("Invalid user or room ID format.")
        }

        //validate that user exists
        const userExists = await User.findById(user)
        if (!userExists) {
            throw new Error("User does not exist.")
        }

        //validate that room exists
        const roomExists = await Room.findById(room)
        if (!roomExists) {
            throw new Error("Room does not exist.")
        }

        const message = new Message({
            user: user,
            room: room,
            body: body,
        })

        const newMessage = await message.save()
        await newMessage
            .populate([{
                path: `user`,
                select: `firstName lastName`
            }, {
                path: `room`,
                select: `name`
            }])


        res.status(200).json({
            Created: newMessage
        })

    } catch (err) {
        res.status(500).json({
            Error: err.message
        })
    }
})

//? return ALL messages
router.get("/all", async (req, res) => {
    try {
        let allMessages = await Message.find()
            .populate(
                "user", "firstName lastName")
            .populate(
                "room", "name")
            .select({
                room: 1,
                body: 1,
                createdAt: 1,
                updatedAt: 1
            })

        if (!allMessages || allMessages.length === 0) {
            throw new Error("No messages found")
        }

        res.status(200).json({
            Results: allMessages
        })
    } catch (err) {
        res.status(500).json({
            Error: err.message
        })
    }
})

//? return ALL messages for specific room ID
router.get("/all/:roomID", async (req, res) => {
    try {
        let allMessages = await Message.find({room:req.params.roomID})
            .populate(
                "user", "firstName lastName")
            .populate(
                "room", "name")
            .select({
                room: 1,
                body: 1,
                createdAt: 1,
                updatedAt: 1
            })

        if (!allMessages || allMessages.length === 0) {
            throw new Error("No messages found")
        }

        res.status(200).json({
            Results: allMessages
        })
    } catch (err) {
        res.status(500).json({
            Error: err.message
        })
    }
})


//? update a specific message
router.patch("/update/:messageId", async (req, res) => {
    try {
        const { user, body } = req.body

        let newMessage = { body }

        let updateMessage = await Message.findOneAndUpdate({
            _id: req.params.messageId,
            user: req.body.user
        }, newMessage,
            { new: true })

        if (!updateMessage) throw new Error("Cannot update message")

        res.status(200).json({
            Updated: updateMessage
        })

    } catch (err) {
        res.status(500).json({
            Error: err.message
        })
    }
})


//? delete a specific message
router.delete("/delete/:messageId", async (req, res) => {
    try {
        const { user } = req.body

        let deleteMessage = await Message.findOneAndDelete({
            _id: req.params.messageId,
            user: user
        })

        if (!deleteMessage) throw new Error("Cannot delete message")

        res.status(200).json({
            Deleted: deleteMessage
        })

    } catch (err) {
        res.status(500).json({
            Error: err.message
        })
    }
})





export default router
