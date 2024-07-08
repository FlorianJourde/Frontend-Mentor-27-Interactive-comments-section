import { getComments } from '../lib/queries';

export default async function handler(req: any, res: any) {
  console.log('API called');
  
  try {
    const comments = await getComments();
    res.status(200).json(comments);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}