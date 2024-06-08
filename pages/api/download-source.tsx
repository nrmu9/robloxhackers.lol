// pages/api/download-source.js
import fs from 'fs';
import path from 'path';


export default function handler(req: { headers: { referer: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; send: (arg0: Buffer) => void; }) {
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
