import { Schema, model, Types } from 'mongoose'

const locationSchema = new Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
)

locationSchema.index({ city: 1, country: 1 }, { unique: true })

export const Location = model('Location', locationSchema)
