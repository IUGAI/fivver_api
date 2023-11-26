import User from '../models/user.model.js'
import createError from '../utils/createError.js';

export const deleteuser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    
    if (!user) return next(createError(401, 'user was not found!'))

    if (req.userId !== user._id.toString()) {
        return next(createError(403, "You can delete only your account!"));
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).send('deleted')

}
