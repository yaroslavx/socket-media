import { unlink } from 'fs/promises';
import { dirname, join } from 'path';
import { fileUrlToPath } from 'url';
import { onError } from './onError';

// путь к текущей директории
const _dirname = dirname(fileUrlToPath(import.meta.url));

// путь к директории с файлами
const fileDir = join(_dirname, '../files');

// утилита для получения пути к файлу
export const getFilePath = (filePath) => join(fileDir, filePath);

// утилита для удаления файла
export const removeFile = async (filePath) => {
  try {
    await unlink(join(fileDir, filePath));
  } catch (err) {
    onError(err);
  }
};
