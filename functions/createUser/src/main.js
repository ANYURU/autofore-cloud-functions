import {
  Client,
  Databases,
  Teams,
  Users,
  Permission,
  Role,
  ID,
} from 'node-appwrite';

export default async ({ req, res }) => {
  const { phone, password, firstName } = JSON.parse(req.body);
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

  if (!phone) {
    return res.json({ ok: false, message: 'Phone not provided' }, 400);
  }

  if (!password) {
    return res.json({ ok: false, message: 'Password not provided' }, 400);
  }

  if (!firstName) {
    return res.json({ ok: false, message: 'First name not provided' }, 400);
  }

  const database = new Databases(client);
  const teams = new Teams(client);
  const users = new Users(client);

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
        Permission.read(Role.team(process.env.APPWRITE_FUNCTION_ADMIN_TEAM_ID)),
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
};
