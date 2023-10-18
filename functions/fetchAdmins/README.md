# fetchAdmins

## 🧰 Usage

### GET /

Returns a list of administrators' phone numbers and first names.

**Response**

Sample `200` Response:

```json
{
  "ok": true,
  "admins": [
    {
      "phoneNumber": "123-456-7890",
      "firstName": "John"
    },
    // Additional admin profiles
  ]
}
```

Sample `400` Response: 
```json
{
  "ok": false,
  "message": "Detailed Error Message"
}
```

## ⚙️ Configuration

| Setting           | Value         |
|-------------------|---------------|
| Runtime           | Node (18.0)   |
| Entrypoint        | `src/main.js` |
| Build Commands    | `npm install` |
| Permissions       | `any`         |
| Timeout (Seconds) | 15            |

## 🔒 Environment Variables

- APPWRITE_FUNCTION_ENDPOINT
- APPWRITE_FUNCTION_PROJECT_ID
- APPWRITE_FUNCTION_API_KEY
- APPWRITE_FUNCTION_ADMIN_TEAM_ID
- APPWRITE_FUNCTION_DATABASE_ID
- APPWRITE_FUNCTION_PROFILES_COLLECTION_ID

## ⚡️ Description

The `fetchAdmins` function is designed to run server-side code and interact with the Appwrite API to retrieve phone numbers and first names of administrators within your Appwrite project. This function is essential for sending notifications to administrators about critical updates, announcements, or important communication.

## 🔧 Implementation

This function is implemented using the Appwrite Node.js SDK. It performs the following steps:

1. Create an Appwrite client, setting the endpoint, project ID, and API key using environment variables.
2. Instantiate the Appwrite team's API and the Databases API using the Appwrite client.
3. Retrieve the memberships of the admin team using `listMemberships` to get a list of user IDs.
4. Create a query for the user profiles database to select phone numbers and first names based on the user IDs.
5. Return the retrieved information in a structured JSON format in the response.

The function also handles errors gracefully, providing informative error messages in case of any issues.

## 📝 Note

- This function is designed for server-side use only. Use a `GET` request to access admin information.
- Make sure to configure the function's environment variables with your Appwrite endpoint, project ID, and API key.
- The function's permissions are set to `any` to allow for public access.

For more information on Appwrite, please visit [Appwrite Documentation](https://appwrite.io/docs).

## 🚀 Getting Started

To use the `fetchAdmins` function, make a `GET` request to `/` to retrieve the list of administrators' phone numbers and first names. Be sure to set up the required environment variables and configure the function according to your Appwrite project's details.

## 🌐 Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Community](https://appwrite.io/discord)

