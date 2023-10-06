# createUser

The `createUser` function is responsible for creating a new user in your application using Appwrite. It takes user information such as phone, password, and first name as input and performs the necessary operations to create the user in Appwrite.

## 🧰 Usage

### POST

- Returns a "Hello, World!" message.
  **Request Body**
- `phone` (string): The phone number of the user.
- `password` (string): The user's password.
- `firstName` (string): The user's first name.

**Response**

Sample `200` Response:

```json
{
  "ok": true,
  "message": "User created successfully",
  "userId": "user_id_here",
  "customerMembershipId": "membership_id_here"
}
```

Sample `400` Response:

```json
{
  "ok": false,
  "message": "error message here"
}
```

## ⚙️ Configuration

| Setting           | Value         |
| ----------------- | ------------- |
| Runtime           | Node (18.0)   |
| Entrypoint        | `src/main.js` |
| Build Commands    | `npm install` |
| Permissions       | `any`         |
| Timeout (Seconds) | 15            |

## 🔒 Environment Variables

- APPWRITE_FUNCTION_ENDPOINT: The endpoint of the Appwrite instance.
- APPWRITE_FUNCTION_PROJECT_ID: The project ID of the Appwrite instance.
- APPWRITE_FUNCTION_API_KEY: The API key for the Appwrite instance.
- APPWRITE_FUNCTION_CUSTOMER_TEAM_ID: The ID of the customer's team in Appwrite.
- APPWRITE_FUNCTION_DATABASE_ID: The ID of the Appwrite database.
- APPWRITE_FUNCTION_PROFILES_COLLECTION_ID: The ID of the profiles collection in the database.
- APPWRITE_FUNCTION_ADMIN_TEAM_ID: The ID of the admin team in Appwrite.

## 🚀 Implementation

The createUser function is implemented using Node.js and the node-appwrite library. It performs the following steps:

1. It parses the request body to extract the phone, password, and firstName.

2. It initializes the Appwrite client using the provided environment variables.

3. It performs input validation to ensure that phone, password, and firstName are provided. If any of these values are missing, it returns an error response.

4. It creates the user using the users.create method.

5. It adds the user to the customer's team using the teams.createMembership method.

6. It creates a document in the profiles collection with the user's firstName, phoneNumber, and userId.

7. It assigns appropriate permissions to the user and the admin team for the user's document.

8. If all the operations are successful, it returns a success response with the user's ID and membership ID. If there's an error, it returns an error response.

## 📝 Notes
- Ensure that the required environment variables are correctly set to enable the function to connect to your Appwrite instance.

- Proper input validation and error handling have been implemented to ensure the robustness of the function.

- The function utilizes the node-appwrite library for interaction with the Appwrite API.

- This function is a part of your user registration flow and should be triggered when a new user signs up.


## 📖 Additional Resources

Explore these additional resources to learn more about Appwrite:

- [Appwrite Documentation](https://appwrite.io/docs): The official Appwrite documentation provides in-depth information on using and configuring Appwrite for your projects.

- [Appwrite Community](https://appwrite.io/discord): Join the Appwrite community on Discord to connect with other developers, ask questions, and share your experiences.

