import { Client, Databases, ID } from 'node-appwrite';
import generateOTP from './utils/generateOtp.js';
import addMinutesToDate from './utils/addMinutesToDate.js';
import generatePasswordRecoveryMessage from './utils/messages/recoverPassword.js';
import generatePhoneVerificationMessage from './utils/messages/phoneVerification.js';
import encode from './utils/encode.js';
import sendMessage from './utils/sendMessage.js';

export default async ({ req, res, log, error }) => {
  const { phone, type } = JSON.parse(req.body);

  try {
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

    const otp = generateOTP();
    const now = new Date();
    const expirationTime = addMinutesToDate(now, 3);

    let message;
    if (type === 'VERIFICATION') {
      message = generatePhoneVerificationMessage(otp);
    } else if (type === 'FORGOT PASSWORD') {
      message = generatePasswordRecoveryMessage(otp);
    }

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
      check: phone,
      success: true,
      message: 'OTP sent successfully',
      otpId: otpDocument.$id,
    };

    // Generate an encoded string of the details
    const encoded = await encode(JSON.stringify(details));

    // Sending the message
    const response = await sendMessage(phone, message);
    if (response) {
      log({ ok: true, token: encoded, message: 'OTP sent successfully' });
      return res.json({
        ok: true,
        token: encoded,
        message: 'OTP sent successfully',
      });
    }
  } catch (err) {
    error({ ok: false, message: err.message });
    return res.json(
      {
        ok: false,
        message: err.message,
      },
      400
    );
  }
};
