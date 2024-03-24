const userModel = require("../model/usermodel")
const bcrypt = require("../utils/bcrypt")
const jwt = require("../utils/jwt")
const task = require("../model/taskmodel")

exports.signup = async (req, res) => {
    try {
        console.log("HELLLOOOOO")
        const { password, confirmpassword } = req.body;
        console.log(password, confirmpassword);
        if (password !== confirmpassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match", data: [] });
        }

        const pass = await bcrypt.passwordEncryption(password);
        console.log(pass, ":PASS")
        const data = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            emailid: req.body.emailid,
            password: pass,
            phonenumber: req.body.phonenumber
        };
        console.log(data, ":DATA")
        let find = await userModel.findOne({ username: data.username })
        if (find) {
            return res.status(500).json({ success: false, message: "UserName Already Exists!!", data: [] })
        }
        let finduser = await userModel.findOne({ emailid: data.emailid })
        if (finduser) {
            return res.status(500).json({ success: false, message: "Email Id Already Exists!!", data: [] })
        }


        const newUser = new userModel(data);
        const user = await newUser.save();
        console.log(user,":USER")
        if(user){
            return res.status(200).json({ success: true, message: "User registered successfully", data: newUser });
        }else{
            return res.status(500).json({ success: false, message: "User Not Registered ", data: newUser });
        }

        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, data: [] });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        let user = await userModel.findOne({ username: username })
        if (!user) {
            return res.status(500).json({ success: false, message: "UserName Not Found!!", data: [] })
        }
        let compare = await bcrypt.passwordComparison(password, user.password)
        if (!compare) {
            return res.status(500).json({ success: false, message: "Password is Incorrect!!", data: [] })
        }
        let payload = {
            userId: user._id,
            username: user.username,
            emailid: user.emailid
        }
        const token = await jwt.generate_token(payload, "your-secret-key", '1h')
        
        return res.status(200).json({ success: true, message: "Login Successfull!!", data: { username, token } })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, data: [] })
    }
}
exports.create_task = async (req, res) => {
    try {
        console.log("HELLOO")
        const user = req.user
        console.log(user,":USERRRR")
        let find = await userModel.findOne({ username: user.username })
        if (!find) {
            return res.status(500).json({ success: false, message: "User Name Not Found!!", data: [] })
        }
        const data = {
            username: user.username,
            action: req.body.action,
            category: req.body.category,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            dueDate: req.body.dueDate
        };
        console.log(data,":DATA")

        const newTask = new task(data);
        const usertask = await newTask.save();
        if (usertask) {
            return res.status(200).json({ success: true, message: "Task created successfully", data: newTask });
        } else {
            return res.status(500).json({ success: false, message: "Task  Not Created!!", data: [] });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, data: [] });
    }
};
exports.update_task = async (req, res) => {
    try {
        const user = req.user
        const _id = req.body._id
        let data = {
            action: req.body.action,
            category: req.body.category,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            dueDate: req.body.dueDate

        }
        let update = await task.updateOne({ username: user.username , _id:_id},
            {
                $set: {
                    action: data.action,
                    category: data.category,
                    description: data.description,
                    priority: data.priority,
                    status: data.status,
                    dueDate: data.dueDate
                }
            }, { upsert: true })
        if (update.upsertedCount > 0 || update.modifiedCount > 0) {
            return res.status(200).json({ success: true, message: "Task Updated Successfully", data: update })
        }
        return res.status(500).json({ success: false, message: "Task Not Updated Successfully!!", data: [] })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, data: [] });
    }
}
exports.fetch_task = async (req, res) => {
    try {
        // Extract query parameters for filtering and pagination
        const { username, action, priority, category, status, page = 1, limit = 10 } = req.query;
        let findData = await task.find()
        if(!findData){
            return res.status(500).json({success:false, message:"No Data Found!!", data:[]})
        }

        // Build the filter object based on the provided query parameters
        let filter = {};
        if (username) filter.username = username;
        if (action) filter.action = action;
        if (priority) filter.priority = priority;
        if (category) filter.category = category;
        if (status) filter.status = status;

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        // Find tasks based on the filter object and apply pagination
        let tasks = await task.find(filter).limit(limit).skip(startIndex).exec();
        if(!tasks){
            return res.status(500).json({success:false, message:"No Data Found!!", data:[]})
        }

        // Count total number of tasks (without pagination)
        const total = await task.countDocuments(filter);

        // Response
        return res.status(200).json({
            success: true,
            message: "Tasks retrieved successfully",
            data: {
                tasks,
                totalPages: Math.ceil(total / limit),
                currentPage: page
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, data: [] });
    }
};
exports.delete_task = async(req,res)=>{
    try {
        const user = req.user
        const _id = req.body._id
        let del = await task.deleteOne({username:user.username,_id:_id})
        if(del){
            return res.status(200).json({success:true, messgae:"Task Deleted Successfully", data:del})
        }else{
            return res.status(500).json({success:false , message:"Task Not Deleted!!", data:[]})
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, data: [] });
    }
}