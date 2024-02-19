import {
  Client,
  Users,
  Query,
  Databases,
  Teams,
  Role,
  ID,
  Permission,
} from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  // Create the appwrite client
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

  // Instantiate the appwrite user's api using the appwrite client
  const users = new Users(client);
  const database = new Databases(client);
  const teams = new Teams(client);

  const body = JSON.parse(req.body);

  const { intent } = body;
  log("Intent: ")
  log(intent)

  if (intent === 'CHECK REGISTRATION STATUS') {
    const { phone } = body;

    let emailFormattedPhoneString;
    if (!phone) {
      return res.json({ ok: false, message: 'Phone not provided' }, 400);
    } else {
      emailFormattedPhoneString = `${phone}@autofore.co`;
    }

    try {
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
  } else if (intent === 'CREATE USER') {
    const { phone, password, firstName } = body;

    if (!phone) {
      return res.json({ ok: false, message: 'Phone not provided' }, 400);
    }

    if (!password) {
      return res.json({ ok: false, message: 'Password not provided' }, 400);
    }

    if (!firstName) {
      return res.json({ ok: false, message: 'First name not provided' }, 400);
    }

    try {
      // Create the user
      const user = await users.create(ID.unique(), phone, undefined, password);

      // Add the user to the custome's team.
      const customerMembership = await teams.createMembership(
        process.env.APPWRITE_FUNCTION_CUSTOMER_TEAM_ID,
        [],
        process.env.APPWRITE_FUNCTION_ENDPOINT,
        undefined,
        user.$id
      );

      // Add the user's firstName, PhoneNumber and userId to the profiles collection.
      const customerProfile = await database.createDocument(
        process.env.APPWRITE_FUNCTION_DATABASE_ID,
        process.env.APPWRITE_FUNCTION_PROFILES_COLLECTION_ID,
        user.$id,
        {
          firstName,
          phoneNumber: phone.slice(0, 10),
          userId: user.$id,
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.read(
            Role.team(process.env.APPWRITE_FUNCTION_ADMIN_TEAM_ID)
          ),
          Permission.update(Role.user(user.$id)),
          Permission.update(
            Role.team(process.env.APPWRITE_FUNCTION_ADMIN_TEAM_ID)
          ),
          Permission.delete(Role.user(user.$id)),
          Permission.delete(
            Role.team(process.env.APPWRITE_FUNCTION_ADMIN_TEAM_ID)
          ),
        ]
      );

      return res.json({
        ok: true,
        message: 'User created successfully',
        userId: customerProfile.$id,
        customerMembershipId: customerMembership.$id,
      });
    } catch (error) {
      return res.json({ ok: false, message: error.message }, 400);
    }
  } else {
    return res.json({ ok: false, message: 'Invalid intent.' }, 400);
  }
};
