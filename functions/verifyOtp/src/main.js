import { Client, Databases } from 'node-appwrite';
import decode from './utils/decode.js';
import compareDates from './utils/compareDates.js';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  const currentDate = new Date();

  // Initialize appwrite client
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

  // Instantiating the appwrite database
  const database = new Databases(client);

  const { verificationKey, otp, check } = JSON.parse(req.body);

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
            return res.json({ ok: true, message: 'OTP verified successfully' });
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
};
