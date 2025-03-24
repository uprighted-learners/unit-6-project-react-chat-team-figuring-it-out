import mongoose from "mongoose";
import User from "./user.js";
import Rooms from "./rooms.js"


const MessageSchema = new mongoose.Schema(
    {
        when: {
            type : Date, 
            default : Date.now,
            required: true,
        },
        user: {
            type: mongoose.ObjectId,
            required : true,
            ref: User //added to reference user
        },
        room: {
            type : mongoose.ObjectId,
            required: true,
            ref: Rooms
        },
        body: {
            type : String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("message", MessageSchema)