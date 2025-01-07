import express from 'express';
import User from '../models/users.js';
import SubmitedProblem from '../models/problemSbmitUser.js';

const Profile = express.Router();

Profile.post("/User/:id", async (req, res) => {
    const ID = req.params.id;
    try {
        const result = await User.findOne({ _id: ID });
        const result2 = await SubmitedProblem.find({ UserID: ID, status: 'Accepted' });
        const result3 = await SubmitedProblem.find({ UserID: ID });

        console.log(ID);
        console.log("result2 = ", result2.length); // Use .length to get the count of accepted submissions
        console.log("result=", result);
        const arr = [];
        const count = 0;
        const obj = {
            email: result.email,
            name: result.name,
            CorrectSubmission: result2.length,
            TotalSubmission: result3.length, // Use .length to get the count of all submissions
            Language: arr,
            Contest: count
        }
        return res.status(200).send(obj);
    } catch (error) {
        console.log("ERROR WHILE CALLING PROFILE API =", error);
        return res.status(500).send("Error while calling getprofile API");
    }
});

export default Profile;
