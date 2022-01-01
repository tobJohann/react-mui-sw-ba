import mongoose from 'mongoose'

export function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to Database')
  }
  catch (e) {
    throw new Error(`Database connection error: ${e}`)
  }
}

