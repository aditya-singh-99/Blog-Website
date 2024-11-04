import mongoose from "mongoose"

const connectDB = async (url) => {
    try {
        await mongoose.connect(url)
        console.log('Connected to the Database')
    } catch (error) {
        console.log('Can not connect to the Database')
    }
}

export default connectDB