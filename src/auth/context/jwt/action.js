import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';
import { STORAGE_KEY } from './constant';

const resolveAccessToken = (res) => {
  if (!res) return null;
  // response may be in res.data or res itself depending on axios wrapper
  const payload = res.data ?? res;
  if (!payload) return null;

  // common token keys
  return (
    payload.accessToken ||
    payload.access_token ||
    payload.token ||
    (payload.tokens && (payload.tokens.accessToken || payload.tokens.access_token)) ||
    (payload.data && (payload.data.accessToken || payload.data.access_token)) ||
    null
  );
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }) => {
  try {
    const params = { email, password };

    const res = await axios.post(endpoints.auth.signIn, params);

    const accessToken = resolveAccessToken(res);

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({ email, password, firstName, lastName }) => {
  const params = {
    email,
    password,
    firstName,
    lastName,
  };

  try {
    const res = await axios.post(endpoints.auth.signUp, params);

    const accessToken = resolveAccessToken(res);

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    // keep behavior consistent with sign in
    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
