import mongoose from "mongoose";

export const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.lmyjm.mongodb.net/filpkart?retryWrites=true&w=majority`;

  try {
    mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("database connectd successfully");
  } catch (e) {
    console.log("Database connection failed : ", e.message);
  }
};

export default Connection;
