// import { Mongoose } from "mongoose";

import mongoose from "mongoose";

const connectDB = async (params) => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			// useCreateIndex: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
	} catch (error) {
		console.error(`Error: ${error.message}`.red.underline.bold);
	}
};

export default connectDB;
