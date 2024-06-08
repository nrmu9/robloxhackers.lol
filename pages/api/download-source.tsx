import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.resolve('./protected-files', 'MacSploit-source.zip');
  if (!fs.existsSync(filePath)) {
    res.status(404).send('File not found');
    return;
  }

  const fileContents = fs.readFileSync(filePath);
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=MacSploit-source.zip');
  res.send(fileContents);
}
