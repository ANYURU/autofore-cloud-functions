import { Client, Users, Query } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const { phone } = JSON.parse(req.body);
  let emailFormattedPhoneString;
  if (!phone) {
    return res.json({ ok: false, message: 'Phone not provided' }, 400);
  } else {
    // Format the phone string into an email string
    emailFormattedPhoneString = `${phone}@autofore.co`;
  }

  try {
    // Create the appwrite client
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

    // Instantiate the appwrite user's api using the appwrite client
    const users = new Users(client);

    // Fetch all the users with emails that are the same as the formatted email string
    const response = await users.list([
      Query.equal('email', emailFormattedPhoneString),
    ]);

    if (response?.total === 1) {
      return res.json({
        ok: true,
        message: 'Phone number is already registered',
        userExists: true,
      });
    } else if (response?.total === 0) {
      return res.json({
        ok: true,
        message: 'Phone number is not registered',
        userExists: false,
      });
    }
  } catch (err) {
    error(err);
    return res.json({ ok: false, message: err?.message }, 400);
  }
};
