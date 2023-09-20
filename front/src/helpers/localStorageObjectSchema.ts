import { z } from 'zod';

const localStorageObjectSchema = z
  .string()
  .nullable()
  .transform<unknown>((data) => {
    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  });

export default localStorageObjectSchema;
