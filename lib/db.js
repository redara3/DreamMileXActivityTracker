import _ from 'lodash'

export async function getUser(req, fitbit_id) {
  console.log(fitbit_id);
    
    const data = await req.db.collection('data').findOne({
      
      "user.fitbit_id": fitbit_id,
    });
    if (!data) return {};
    
    return {
      access_token: data.user.access_token, refresh_token: data.user.refresh_token, displayName: data.user.displayName, teamName: data.user.teamName, 
      fitbit_id: data.user.fitbit_id, challengeType: data.user.challengeType, activities_distance: data.activities_distance,
      activities_steps: data.activities_steps
    }
  }

  export async function getActivity(req) {
      const data = await req.db.collection('data').find();
      if (!data) return null;
      
      const activitydata = await data.toArray().then(items => {
        console.log(`Successfully found ${items.length} documents.`)
        return items;
      })
      .catch(err => console.error(`Failed to find documents: ${err}`));
      let returnarray = [];

      _.forEach(activitydata, function(item) {
        const totalDistance = _.sumBy(item.activities_distance, function(o){
          let value = parseFloat(o.value)
          return value;
        });
        const totalSteps = _.sumBy(item.activities_steps, function(o){
          let value = parseInt(o.value)
          return value;
        });
        const numDays = item.activities_steps.length;
        const averageSteps = totalSteps/numDays ;
        const id = item.user.fitbit_id
        const name = item.user.displayName
        const team = item.user.teamName
        const challenge = item.user.challengeType
        returnarray.push({id, name, team, challenge, totalDistance, totalSteps, averageSteps})
      })
      return returnarray;
    }