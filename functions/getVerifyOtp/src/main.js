import { Client, Databases, ID } from 'node-appwrite';

// Get OTP helpers
import generateOTP from './utils/generateOtp.js';
import addMinutesToDate from './utils/addMinutesToDate.js';
import generatePasswordRecoveryMessage from './utils/messages/recoverPassword.js';
import generatePhoneVerificationMessage from './utils/messages/phoneVerification.js';
import encode from './utils/encode.js';
import sendMessage from './utils/sendMessage.js';

// Verify OTP helpers
import decode from './utils/decode.js';
import compareDates from './utils/compareDates.js';

export default async ({ req, res, log, error }) => {
  const body = JSON.parse(req.body);
  const { intent } = body;

  try {
    // Initializing the client
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

    // Initalizing the database connection
    const database = new Databases(client);

    if (!intent) {
      return res.json({ ok: false, message: 'Intent not provided' }, 400);
    }

    if (intent === 'GET') {
      // Destructure the needed property
      const { phone, type } = body;

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
    }

    if (intent === 'VERIFY') {
      const { verificationKey, otp, check } = body;

      if (!verificationKey) {
        return res.json(
          { ok: false, message: 'Verification key not provided' },
          400
        );
      }

      if (!check) {
        return res.json({ ok: false, message: 'Check not provided' }, 400);
      }

      if (!otp) {
        return res.json({ ok: false, message: 'Otp not provided' }, 400);
      }

      let decoded;

      try {
        decoded = await decode(verificationKey);
        log(`Decoded: ${decoded}`);
      } catch (err) {
        error(err);
        return res.json({ ok: false, message: 'Bad request' }, 400);
      }

      let { otpId, check: checkObj } = JSON.parse(decoded);
      log(`checkObj: ${checkObj}`);

      if (checkObj !== check) {
        return res.json(
          {
            ok: false,
            message: 'OTP was not sent to this particular phone number',
          },
          400
        );
      }

      try {
        const otpDocument = await database.getDocument(
          process.env.APPWRITE_FUNCTION_DATABASE_ID,
          process.env.APPWRITE_FUNCTION_OTPS_COLLECTION_ID,
          otpId
        );

        if (otpDocument?.isVerified !== true) {
          const expirationDate = new Date(otpDocument.expirationTime);

          if (compareDates(expirationDate, currentDate) === 1) {
            if (otpDocument.otp === otp) {
              try {
                await database.updateDocument(
                  process.env.APPWRITE_FUNCTION_DATABASE_ID,
                  process.env.APPWRITE_FUNCTION_OTPS_COLLECTION_ID,
                  otpId,
                  {
                    isVerified: true,
                    updatedAt: currentDate,
                  }
                );
                error({ ok: true, message: 'OTP verified successfully' });
                return res.json({
                  ok: true,
                  message: 'OTP verified successfully',
                });
              } catch (err) {
                error({ ok: false, message: err?.message });
                return res.json({ ok: false, message: err?.message }, 400);
              }
            } else {
              error({ ok: false, message: 'OTP not matched' });
              return res.json({ ok: false, message: 'OTP not matched' }, 400);
            }
          } else {
            error({ ok: false, message: 'OTP expired' });
            return res.json({ ok: false, message: 'OTP expired' }, 400);
          }
        } else {
          error({ ok: false, message: 'OTP has already been used' });
          return res.json(
            { ok: false, message: 'OTP has already been used.' },
            400
          );
        }
      } catch (err) {
        error(err);
        return res.json({ ok: false, message: err?.message }, 400);
      }
    }

    return res.json({ ok: false, message: 'Invalid intent' }, 400);
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
