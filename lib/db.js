export async function getUser(req, fitbit_id) {
  console.log(fitbit_id);
    const user = await req.db.collection('users').findOne({
      
        "user.fitbit_id": fitbit_id,
    });
    if (!user) return null;
    console.log(user);
    
    const {
      firstName, fullName, averageDailySteps, avatar, access_token, refresh_token
    } = user.user;
    return {
      firstName, fullName, averageDailySteps, avatar, access_token, refresh_token
    }
  }