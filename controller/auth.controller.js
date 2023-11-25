import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5)
        const newuser = new User({
            ...req.body,
            password: hash
        })
        await newuser.save();
        res.status(201).send("user was created")
    } catch (error) {
        res.status(500).send("Something was wrong")
    }
}

export const logout = (req, res) => {

}

export const login = async (req, res) => {
    try{
       const user = await User.findOne({username: req.body.username});
        if (!user) return res.status(404).send('User was not found');
        
        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) return res.status(404).send("Wrong password or username");
        
        const {password, ...info} = user
        res.status(201).send(user);
    } catch(err) {
        res.status(500).send('Something was wrong')
    }
   

}