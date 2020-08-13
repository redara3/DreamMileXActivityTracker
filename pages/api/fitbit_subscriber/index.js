
export default function handler(req, res) {
  
    switch (req.method) {
        case 'GET':
            let code = req.query.verify || "";
            if (code == process.env.FITBIT_SUBSCRIBER_VERIFY_CODE && code != "") {
                res.status(204).end()
            } else if (code != process.env.FITBIT_SUBSCRIBER_VERIFY_CODE && code != "") {
                res.status(404).end();
            }
            else {
              res.status(404).end();
            }
            break;
        case 'POST':
           let notifications = req.body;
           console.log(notifications);
            // if(notifications.collectionType === 'activities') {
              // updateData(req, notifications.ownerId);
            // }
           res.status(204).end();
            
          break
        default:
          res.status(405).end() //Method Not Allowed
          break
      }
  
};





export default handler;