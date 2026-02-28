import mongoose from 'mongoose'
import config from '../config'

mongoose.set('strictQuery', false)

let cached: any = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export const databaseConnect = async () => {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(config.database_url as string, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
      family: 4,
    })
  }

  cached.conn = await cached.promise
  console.log('🛢 Database connected')
  return cached.conn
}
