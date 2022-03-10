export default async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const responseJson = await response.json()

    return responseJson
  } catch (error) {
    console.log(error)
  }
}