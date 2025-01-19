import { NextApiRequest, NextApiResponse } from 'next';
import { insertVaccine, upsertUser, getVaccines } from '../../../lib/pgInterface';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {  

    try {  
      console.log(`vaccine: ${req.body.userEmail}, ${req.body.name}, ${req.body.dateAdministered}, ${req.body.nextDueDate}, ${req.body.notificationEmail}, ${req.body.notificationPhone}`)
      await insertVaccine(req.body.userEmail, req.body.name, req.body.dateAdministered, req.body.nextDueDate, req.body.notificationEmail, req.body.notificationPhone);
      res.status(200).json({ message: 'Notification inserted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to insert notification' });
    }
  } 
  else if (req.method === 'GET') {
    let data;
    const paramName  = req.query;
    if (!paramName) {
      console.log('no query param')
    }
    if (Array.isArray(paramName)) {
      console.log('more than one query param')
    }
    else {
      console.log(`PARAMNAME: ${paramName}`);
      console.log(`paranname email: ${paramName.email}`);
      data = await getVaccines(paramName.email as string);
      console.log(`GET VACCINES data: ${data}`);
      console.log(data);
      
    }
    res.status(200).json(data);
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
