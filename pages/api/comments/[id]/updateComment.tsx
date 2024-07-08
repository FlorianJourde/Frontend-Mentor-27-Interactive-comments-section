import { updateComment } from '../../../../../lib/queries';

export default async function handler(req: any, res: any) {
  const {
    query: { id },
    body: { content }
  } = req;

  if (req.method === 'PUT') {
    try {
      await updateComment(id, content);
      res.status(200).json({ message: 'Comment updated successfully' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}