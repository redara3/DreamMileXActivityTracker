export async function getUser(req, username) {
    const user = await req.db.collection('users').findOne({
        fullName: username,
    });
    if (!user) return null;
    return  {
      _id, firstName, fullName, averageDailySteps, avatar, access_token, refresh_token
    };
  }