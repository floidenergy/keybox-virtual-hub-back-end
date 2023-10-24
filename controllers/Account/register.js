const User = require("../../model/userModel")

const { genPassword, validatePassword } = require("../../utils/passwordUtils")

const Register = async (req, res, next) => {
    console.log("creating");
    try {
        const { firstname, lastname, username, email, mobile, password, accountType, age } = req.body

        const usernameExist = await User.findOne({ username: username });
        if (usernameExist)
            return res.json({ message: "Username Already Taken" });

        const emailExist = await User.findOne({ email: email });
        if (emailExist)
            return res.json({ message: "E-mail Already Taken" });

        const pass = genPassword(password)

        const myUser = new User({
            username,
            firstname,
            lastname,
            accountType,
            email,
            mobile,
            hash: pass.hash,
            salt: pass.salt,
            age
        });

        const result = await myUser.save()

        if (!result) 
            return res.status(400).json({message: "Couldn't create user"})

        
        res.status(200).json({ message: "User created succefully" });
        return console.log(`user: ${myUser.username} under ID of ${myUser._id}`)
    } catch (error) {
        console.log(error);
        next(error)
    }

}

module.exports.Register = Register;