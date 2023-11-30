import localStorageObjectSchema from '../../helpers/localStorageObjectSchema';
import { z } from 'zod';

interface LocalStorageUserToken {
  userToken: string;
  userId: string;
}

const LocalStorageUserTokenSchema = z.object({
  userToken: z.string(),
  userId: z.string(),
});

const USER_TOKEN_LOCAL_STORAGE_KEY = 'userTokenData';

export const getUserTokenFromLocalStorage =
  (): LocalStorageUserToken | null => {
    const userTokenData = localStorageObjectSchema
      .pipe(LocalStorageUserTokenSchema)
      .safeParse(window.localStorage.getItem(USER_TOKEN_LOCAL_STORAGE_KEY));
    console.log('userTokenData', userTokenData);
    if (userTokenData.success) {
      return userTokenData.data;
    }

    return null;
  };

export const saveUserTokenInLocalStorage = (
  userTokenObj: LocalStorageUserToken,
) => {
  window.localStorage.setItem(
    USER_TOKEN_LOCAL_STORAGE_KEY,
    JSON.stringify(userTokenObj),
  );
};

export const removeUserTokenFromLocalStorage = () => {
  window.localStorage.removeItem(USER_TOKEN_LOCAL_STORAGE_KEY);
};
