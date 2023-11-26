import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import createError from '../utils/createError.js'
export const register = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5)
        const currentUSer = await User.findOne({ username: req.body.username });
        if (currentUSer) return next(createError(404, 'Have user with same id'));
        const newuser = new User({
            ...req.body,
            password: hash
        })
        await newuser.save();
        res.status(201).send("user was created")
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res) => {
    res
        .clearCookie("accessToken", {
            sameSite: "none",
            secure: true,
        })
        .status(200)
        .send("User has been logged out.");

}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) return next(createError(404, 'user was not found'))

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong password or username!"));
        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
        },
            process.env.JWT_KEY
        )

        const { password, ...info } = user
        res.cookie("accessToken", token, { httpOnly: true }).status(201).send(user);
    } catch (err) {
        next(err)
    }


}