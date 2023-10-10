# Get OTP Function

The "Get OTP" function is a serverless function that allows you to generate and send one-time passwords (OTP) via SMS to a provided phone number. This function is designed for use with [Appwrite](https://appwrite.io/), an open-source backend server for building web and mobile apps.

## Usage

### POST /

This endpoint is used to generate and send OTP to a specified phone number.

#### Request

- **phone** (string): The phone number to which the OTP should be sent.
- **type** (string): The type of OTP to generate. It can be one of the following values: "VERIFICATION" or "FORGOT PASSWORD".

Example request body:

```json
{
  "phone": "0757501751",
  "type": "VERIFICATION"
}
```

**Responses**

Sample `200` Response:

```json
{
  "ok": true,
  "token": "encoded_token_here",
  "message": "OTP sent successfully"
}
```

Sample `400` Responses:

1. Phone number not provided

```json
{
  "ok": false,
  "message": "Phone not provided"
}
```

2. Type not provided.

```json
{
  "ok": false,
  "message": "Type not provided"
}
```

3. Error due to the execution of the function

```json
{
  "ok": false,
  "message": any_other_error_message
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

This function relies on the following environment variables:

- APPWRITE_FUNCTION_ENDPOINT: The Appwrite API endpoint.
- APPWRITE_FUNCTION_PROJECT_ID: The Appwrite project ID.
- APPWRITE_FUNCTION_API_KEY: The Appwrite API key.
- APPWRITE_FUNCTION_DATABASE_ID: The ID of the Appwrite database to use.
- APPWRITE_FUNCTION_OTPS_COLLECTION_ID: The ID of the collection to store OTPs.
- APPWRITE_FUNCTION_AFRICASTALKING_USERNAME: The username of your africastalking application.
- APPWRITE_FUNCTION_AFRICASTALKING_API_KEY: The api key of your africastalking application.

## 📝 Notes

- Ensure that all the environment variables are properly set without any naming inconsistencies.
- This is to be used to verify the identity of the user when recovering the password and verifying their identity during onboarding.


## 📖 Additional Resources

- [Appwrite Documentation](https://appwrite.io/docs): The official Appwrite documentation provides in-depth information on using and configuring Appwrite for your projects.
- [Appwrite Community](https://appwrite.io/discord): Join the Appwrite community on Discord to connect with other developers, ask questions, and share your experiences.
- [Africastalking API Documentation](https://developers.africastalking.com/docs/sms/overview): If you're using africastalking for sending messages, you may find their API documentation helpful.

