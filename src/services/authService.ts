import axios from 'axios';

const AUTH_URL = 'https://id.twitch.tv/oauth2/token'; // URL d'authentification de Twitch
type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

type User = {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
}

export const getAccessToken = async (): Promise<AuthResponse | null> => {
  try {
    const response = await axios.post<AuthResponse>(AUTH_URL, {
      client_id: import.meta.env.VITE_REACT_APP_TWITCH_CLIENT_ID,
      client_secret: import.meta.env.VITE_REACT_APP_TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching access token:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('access_token');
  return !!token;
};

export const getUserInfo = async (accessToken: string): Promise<User | null> => {
  try {
    const response = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-ID': import.meta.env.VITE_REACT_APP_TWITCH_CLIENT_ID as string,
      },
    });

    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};

export const logout = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const login = async (): Promise<void> => {
  const authResponse = await getAccessToken();

  if (authResponse) {
    localStorage.setItem('access_token', authResponse.access_token);
    localStorage.setItem('refresh_token', authResponse.refresh_token);
  }
};

export const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');

    const response = await axios.post<AuthResponse>(AUTH_URL, {
      client_id: import.meta.env.VITE_REACT_APP_TWITCH_CLIENT_ID,
      client_secret: import.meta.env.VITE_REACT_APP_TWITCH_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    const newAccessToken = response.data.access_token;
    localStorage.setItem('access_token', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};