import * as fs from 'node:fs';
import { Error } from 'mongoose';
import { dirname, join } from 'path';

export type File = {
  filename: string;
  mimetype: string;
  data: string;
};

export const writeFile = async (file: File, path: string) => {
  const buffer = Buffer.from(file.data, 'binary');
  const fileNameWithPath = join(process.cwd(), `public/${path}`, file.filename);
  const dirName = dirname(fileNameWithPath);

  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }

  try {
    await fs.promises.writeFile(fileNameWithPath, buffer, 'binary');
  } catch (error) {
    throw new Error(
      `Error uploading image: ${file.filename} to path: ${fileNameWithPath}`,
    );
  }
};
