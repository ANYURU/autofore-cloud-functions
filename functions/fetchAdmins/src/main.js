import { Client, Teams, Databases, Query } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ res, error }) => {
  try {
    // Create the appwrite client
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

    // Instantiate the appwrite team's api using the appwrite client
    const teams = new Teams(client);
    const databases = new Databases(client);

    // Fetch all the users with emails that are the same as the formatted email string
    const { memberships } = await teams.listMemberships(
      process.env.APPWRITE_FUNCTION_ADMIN_TEAM_ID
    );
    const userIdQueryList = memberships.map((member) => member.userId);
    const { documents } = await databases.listDocuments(
      process.env.APPWRITE_FUNCTION_DATABASE_ID,
      process.env.APPWRITE_FUNCTION_PROFILES_COLLECTION_ID,
      [
        Query.equal('userId', userIdQueryList),
        Query.select(['phoneNumber', 'firstName']),
      ]
    );
    return res.json({ ok: true, admins: documents });

  } catch (err) {
    error(err);
    return res.json({ ok: false, message: err?.message }, 400);
  }
};
