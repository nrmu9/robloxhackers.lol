import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const filePath = path.resolve('.', 'protected-files/MacSploit-source.zip');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'File not found' });
      }

      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename=MacSploit-source.zip');
      res.send(data);
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
