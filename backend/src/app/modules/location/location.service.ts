import { Location } from './location.model'

export const createLocationService = async (payload: {
  city: string
  country: string
}) => {
  // prevent duplicate
  const existing = await Location.findOne({
    city: payload.city,
    country: payload.country,
  })

  if (existing) {
    throw new Error('Location already exists')
  }

  const location = await Location.create(payload)

  return location
}

export const getAllLocationsService = async (query: any) => {
  const { page = '1', limit = '10', search } = query

  const filter: any = {}

  if (search) {
    filter.$or = [
      { city: { $regex: search, $options: 'i' } },
      { country: { $regex: search, $options: 'i' } },
    ]
  }

  const skip = (Number(page) - 1) * Number(limit)

  const locations = await Location.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 })

  const total = await Location.countDocuments(filter)

  return { locations, total }
}

export const getSingleLocationService = async (id: string) => {
  const location = await Location.findById(id)

  if (!location) {
    throw new Error('Location not found')
  }

  return location
}

export const deleteLocationService = async (id: string) => {
  const location = await Location.findByIdAndDelete(id)

  if (!location) {
    throw new Error('Location not found')
  }

  return location
}
