const User = require('../models/UserModel');
const validator = require('validator');

module.exports.userAdd = async (req, res) => {
    try {
        let { firstname, lastname, username, email, phone, address } = req.body;

        console.log('Received data:', req.body); // Debug log

        if (!firstname || !lastname || !username || !email || !phone || !address) {
            return res.status(400).send("Please fill all the details properly!");
        }

        email = email.trim();

        if (!validator.isEmail(email)) {
            return res.status(400).send("Please provide a valid email!");
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(409).send("User already exists!");
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).send("Please provide a valid phone number!");
        }

        const newUser = new User({
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            username: username.trim(),
            email: email,
            phone: phone.trim(),
            address: address.trim()
        });

        const response = await newUser.save();

        res.status(201).send({
            success: true,
            data: response,
            message: "User successfully created!"
        });

    } catch (error) {
        console.error("Error in userAdd controller:", error); // More detailed error log
        res.status(500).send({
            success: false,
            message: "An error occurred while creating the user."
        });
    }
};


module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({
            success: true,
            data: users,
            message: "Users fetched successfully!"
        });
    } catch (error) {
        console.error("Error in getUsers controller:", error.message);
        res.status(500).send({
            success: false,
            message: "An error occurred while fetching users."
        });
    }
};


module.exports.fetchUser = async (req, res) => {
    try {
        const {id} = req.params;
        const users = await User.findById({ _id : id});
        res.status(200).send({
            success: true,
            data: users,
            message: "User having concerned id fetched successfully!"
        });
    } catch (error) {
        console.error("Error in fetchUser controller:", error.message);
        res.status(500).send({
            success: false,
            message: "An error occurred while fetching particular user."
        });
    }
};


module.exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, username, email, phone, address } = req.body;



        if (!firstname || !lastname || !username || !email || !phone || !address) {
            return res.status(400).send("Please fill all the details properly!");
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).send("Please provide a valid phone number!");
        }

        const existingUser = await User.findOne({ username, _id: { $ne: id } });
        if (existingUser) {
            return res.status(400).send("Username is already taken!");
        }

        const response = await User.findByIdAndUpdate(
            id,
            { firstname, lastname, username, email, phone, address },
            { new: true }
        );

        if (!response) {
            return res.status(404).send({
                success: false,
                message: "User not found!"
            });
        }

        res.status(201).send({
            success: true,
            data: response,
            message: "User Updated!"
        });

    } catch (error) {
        console.error("Error in update controller:", error);
        if (error.code === 11000) {
            res.status(400).send({
                success: false,
                message: "Duplicate key error: A user with this username already exists."
            });
        } else {
            res.status(500).send({
                success: false,
                message: "An error occurred while updating the user."
            });
        }
    }
};


module.exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const users = await User.findByIdAndDelete({ _id : id} , {new : true});
        res.status(201).send({
            success: true,
            data: users,
            message: "Users deleted successfully!"
        });
    } catch (error) {
        console.error("Error in deleteUser controller:", error.message);
        res.status(500).send({
            success: false,
            message: "An error occurred while deleting user."
        });
    }
};