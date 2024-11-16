import { NextApiRequest, NextApiResponse } from 'next';
import { upsertUser } from '../../lib/pgInterface';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    try {  
      console.log(`USER: ${req.body.name}, ${req.body.email}`)
      await upsertUser(req.body.name, req.body.email);
      res.status(200).json({ message: 'User upserted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to upsert user' });
    }
  } 
  else if (req.method === 'GET') {
    res.status(200).json({ message: 'User upserted successfully' });
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
