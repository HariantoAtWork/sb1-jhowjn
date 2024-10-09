export default defineEventHandler(async (event) => {
  // In a real application, you would fetch the user data from a database based on the authenticated user
  // For this example, we'll just return a mock response
  return {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    additionalEmails: ['john.doe@work.com'],
  }
})