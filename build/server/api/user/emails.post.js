import { connectToDatabase } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = await connectToDatabase()
  const users = db.collection('users')

  // In a real application, you would get the user ID from the authenticated session
  const userId = 'user_id_here'

  const result = await users.updateOne(
    { _id: userId },
    { $addToSet: { additionalEmails: body.email } }
  )

  if (result.modifiedCount === 0) {
    throw createError({
      statusCode: 400,
      message: 'Failed to add email or email already exists',
    })
  }

  return { success: true, message: `Email ${body.email} added successfully` }
})