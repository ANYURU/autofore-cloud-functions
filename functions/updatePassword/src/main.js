import { Client, Users, Query } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const { phone, password } = JSON.parse(req.body);
  let emailFormattedPhoneString;
  if (!phone) {
    return res.json({ ok: false, message: 'Phone not provided' }, 400);
  } else {
    // Format the phone string into an email string
    emailFormattedPhoneString = `${phone}@autofore.co`;
  }

  if (!password) {
    return res.json({ ok: false, message: 'Password not provided' }, 400);
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
      // Get the id of the user
      const userId = response.users[0]?.$id;

      // Update the user's password
      const user = await users.updatePassword(userId, password);

      if (user) {
        // Logging the user to the appwrite console.
        log(user);
        return res.json({
          ok: true,
          message: 'Password successfully updated',
        });
      }
    } else if (response?.total === 0) {
      // Logging a message if the user does not exist.
      log({
        ok: false,
        message: 'Phone number is not registered',
      });
      return res.json(
        {
          ok: false,
          message: 'Phone number is not registered',
        },
        400
      );
    }
  } catch (err) {
    error(err);
    return res.json({ ok: false, message: err?.message }, 400);
  }
};
