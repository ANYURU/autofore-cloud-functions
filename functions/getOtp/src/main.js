import { Client, Databases, ID } from 'node-appwrite';
import generateOtp from './utils/generateOtp';
import addMinutesToDate from './utils/addMinutesToDate';
import encode from './utils/encode';
import sendMessage from './utils/sendMessage';

export default async ({ req, res, log, error }) => {
  // Destructuring the phone and type
  const { phone, type } = JSON.parse(req.body);

  // Initializing the client
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

  // Initalizing the database connection
  const database = new Databases(client);

  // Request body validation
  if (!phone) {
    return res.json({ ok: false, message: 'Phone not provided' }, 400);
  }

  if (!type) {
    return res.json({ ok: false, message: 'Type not provided' }, 400);
  }

  try {
    const otp = generateOtp();
    const now = new Date();
    const expirationTime = addMinutesToDate(now, 3);

    let message;

    if (type) {
      if (type === 'FORGOT PASSWORD') {
        const generateMessage = await import(
          './utils/messages/recoverPassword'
        );
        message = generateMessage(otp);
      } else if (type === 'VERIFICATION') {
        const generateMessage = await import(
          './utils/messages/phoneVerification'
        );
        message = generateMessage(otp);
      }
    }

    // Creating the otp document
    const otpDocument = await database.createDocument(
      process.env.APPWRITE_FUNCTION_DATABASE_ID,
      process.env.APPWRITE_FUNCTION_OTPS_COLLECTION_ID,
      ID.unique(),
      {
        otp: otp,
        updatedAt: now,
        createdAt: now,
        expirationTime: expirationTime,
      }
    );

    // Extract information for encoding
    let details = {
      timestamp: now,
      check: phoneNumber,
      success: true,
      message: 'OTP sent successfully',
      otpId: otpDocument.$id,
    };

    // Generate an encoded string of the details
    const encoded = encode(JSON.stringify(details));

    // Sending the message
    sendMessage(phone, message)
      .then(() => {
        log('return ');
        return res.json({
          ok: true,
          token: encoded,
          message: 'OTP sent successfully',
        });
      })
      .catch((err) => {
        error(err);
        return res.json(
          {
            ok: false,
            message: error?.message,
          },
          400
        );
      });
  } catch (err) {
    error(error);
    return res.json(
      {
        ok: false,
        message: error?.message,
      },
      400
    );
  }
};
