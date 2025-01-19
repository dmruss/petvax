import { NextApiRequest, NextApiResponse } from 'next';
import { insertVaccine, upsertUser, getVaccines, deleteVaccine } from '../../../lib/pgInterface';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {  

    try {  
      console.log(`vaccine: ${req.body.userEmail}, ${req.body.name}, ${req.body.dateAdministered}, ${req.body.nextDueDate}, ${req.body.notificationEmail}, ${req.body.notificationPhone}`)
      let response = await insertVaccine(req.body.userEmail, req.body.name, req.body.dateAdministered, req.body.nextDueDate, req.body.notificationEmail, req.body.notificationPhone);
      res.status(200).json({
         message: 'Notification inserted successfully',
         response: response });
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
      if (paramName.email) {
        console.log(`PARAMNAME: ${paramName}`);
        console.log(`paranname email: ${paramName.email}`);
        if (paramName.email.includes(' ')) {
          paramName.email = (paramName.email as string).replace(/ /g, '+');
        }
        data = await getVaccines(paramName.email as string);
        console.log(`GET VACCINES data: ${data}`);
        console.log(data);
    }
    }
    res.status(200).json(data);
  }
  else if (req.method == 'DELETE') {
    try {  
      console.log(`vaccine: ${req.body.email}, ${req.body.id}`)
      await deleteVaccine(req.body.email, req.body.id);
      res.status(200).json({ message: 'Vaccine record deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to delete vaccine record' });
    }    
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
