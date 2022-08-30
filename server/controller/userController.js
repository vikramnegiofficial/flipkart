import User from "../models/userSchema.js";

export const userSignUp = async (req, res) => {
  try {
    const exit = await User.findOne({ username: req.body.username });
    if (exit) {
      return res.status(401).json({ message: "Username already exist" });
    }

    const user = req.body;
    // console.log(user);
    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json({ message: user });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default userSignUp;
