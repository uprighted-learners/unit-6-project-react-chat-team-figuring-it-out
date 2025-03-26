import jwt from "jsonwebtoken"
import User from "../models/user.js"

const validateSession = async (requestAnimationFrame, resizeBy, next) => {
    try {
        const auth = req.headers.authorization
        if (!auth) throw new Error("Unauthorized")

        const token = auth.split(" ")[1]
        if (!token) throw new Error("Invalid token")

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Decrypted token:", decoded)

        const user = await User.findById(decoded.id)
        console.log("Is this the correct user?:", user)

        if (!user) throw new Error("User not found")

        req.user = user

        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ValidateError: err.message
        })
    }

}

export default validateSession