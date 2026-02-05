import axios, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { setSession } from './utils';
import { STORAGE_KEY } from './constant';

// Helper to extract token from various response shapes
const resolveAccessToken = (res) => {
  if (!res) return null;
  const payload = res.data ?? res;
  if (!payload) return null;

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

    // Debug: log full URL being called
    const fullUrl = `${CONFIG.serverUrl}${endpoints.auth.signIn}`;
    console.log('[Auth Debug] Sign-in request to:', fullUrl);

    const res = await axios.post(endpoints.auth.signIn, params);

    // Debug: log response
    console.log('[Auth Debug] Sign-in response status:', res.status);
    console.log('[Auth Debug] Sign-in response data:', res.data);

    const accessToken = resolveAccessToken(res);

    if (!accessToken) {
      console.error('[Auth Debug] No token found in response. Full response:', {
        status: res?.status,
        headers: res?.headers,
        data: res?.data,
      });
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
    // Debug: log full URL being called
    const fullUrl = `${CONFIG.serverUrl}${endpoints.auth.signUp}`;
    console.log('[Auth Debug] Sign-up request to:', fullUrl);

    const res = await axios.post(endpoints.auth.signUp, params);

    // Debug: log response
    console.log('[Auth Debug] Sign-up response status:', res.status);
    console.log('[Auth Debug] Sign-up response data:', res.data);

    const accessToken = resolveAccessToken(res);

    if (!accessToken) {
      console.error('[Auth Debug] No token found in response. Full response:', {
        status: res?.status,
        headers: res?.headers,
        data: res?.data,
      });
      throw new Error('Access token not found in response');
    }

    // Use setSession for consistency
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
