# sendMessage

## 🚀 Usage

The `sendMessage` function allows you to send a custom message to a specified phone number. It utilised the `afrikastalking SMS` API. 

### POST /

- Sends a message to the provided phone number.

**Request Body**

- `phone` (string, required): The phone number to which the message will be sent.
- `message` (string, required): The message to be sent.

**Response**

Sample `200` Response:

```json
{
  "ok": true,
  "message": "Message sent successfully"
}
```

Sample `400` Response:

```json
{
  "ok": false,
  "message": "Failure sending message"
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

- APPWRITE_FUNCTION_AFRICASTALKING_USERNAME: The username of your africastalking application.
- APPWRITE_FUNCTION_AFRICASTALKING_API_KEY: The api key of your africastalking application.

## 📝 Notes

- The "sendMessage" function allows you to send text messages to the specified phone number. It's important to ensure that both the `phone` and `message` fields are provided in the request body.
- Error messages and status codes are returned in case of any issues during the message sending process.
- For more details on how to use the "sendMessage" function in your project, refer to the function's implementation.

## 📖 Additional Resources

- [Appwrite Documentation](https://appwrite.io/docs): The official Appwrite documentation provides in-depth information on using and configuring Appwrite for your projects.
- [Appwrite Community](https://appwrite.io/discord): Join the Appwrite community on Discord to connect with other developers, ask questions, and share your experiences.
- [Africastalking API Documentation](https://developers.africastalking.com/docs/sms/overview): If you're using africastalking for sending messages, you may find their API documentation helpful.
