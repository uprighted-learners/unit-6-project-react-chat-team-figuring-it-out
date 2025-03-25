    /* Peer review: 
    overall code is good...minor updates to get to clean it up
    - do a CTRL+ALT+F to format your document as you go
    - the "import bcrypt..." is missing, but using in line 22/59
    - check for typo's to maintain name convention and consistencies. See line 20 compared to line 25 with "firstName"
    - line 98 and 114 should be for update users and delete users per the "IceBox" guide
    */

    import express from "express";
    import bcrypt from "bcrypt"
    import User from "../models/user.js";



    const router = express.Router();

    router.post("/signup", async (req, res) => {

        try {
            const { firstName, lastName, email, password } = req.body;

            const passwordhashed = bcrypt.hashSync(password, +process.env.SALT);

            let newUser = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: passwordhashed,
            });

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: "20m",
            });

            res.status(200).json({
                Msg: "Success! User was Created!",
                user: newUser,
                Token: token,
            });

        } catch (err) {
            res.status(500).json({
                Error:
                    err.code === 11000
                        ? "Error signing u p... probably a duplicate email"
                        : err.message
            });
        }
    });

    router.post("/login", async (req, res) => {
        try {
            const { email, password } = req.body;

            const foundUser = await User.findOne({ email: email });

            if (!foundUser) throw new Error("Error logging in");

            const verifiedPassword = await bcrypt.compare(password, foundUser.password);

            if (!verifiedPassword) throw new Error("Error logging in");

            const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
                expiresIn: "5 days",
            });

            res.status(200).json({
                Msg: "Success! you are logged in!",
                User: foundUser,
                Token: token,
            });

        } catch (err) {
            res.status(500).json({
                Error: err.message,
            });
        }

    });

    router.get("/all", async (req, res) => {

        try {
            const users = await User.find()
                .sort("firstName")
                .select({ firstName: 1, lastName: 1, email: 1, });

            res.status(200).json({
                AllUsers: users,
            });
        } catch (err) {
            res.status(500).json({
                Error: err.message,
            });
        }
    });

    router.get("/one/:userdId", async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);


            res.status(200).json({
                User: user,
            });
        } catch (err) {
            res.status(500)({
                Error: err.message,
            });
        }
    });


    router.get("/one/name/:userFirstName", async (req, res) => {
        try {
            const user = await User.find({
                firstName: { $regex: req.params.userFinrstName, $options: "i" },
            }).select({ firstName: 1, lastName: 1, email: 1 });

            res.status(200).json({
                User: user,
            });
        } catch (err) {
            res.status(500).json({
                Error: err.message,
            });
        }

    });

    router.delete("/delete/:userId", async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.userId);
    
            if (!deletedUser) {
                return res.status(404).json({
                    Error: "User not found",
                });
            }
    
            res.status(200).json({
                Msg: "User deleted successfully",
            });
        } catch (err) {
            res.status(500).json({
                Error: err.message,
            });
        }
    });
    
  



    export default router;