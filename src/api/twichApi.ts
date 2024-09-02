import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://api.twitch.tv/helix'; // L'URL de base de l'API Twitch

// Cration d'une instance d'Axios configurée avec les en-têtes requis par l'API de Twitch.
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Client-ID': import.meta.env.VITE_REACT_APP_TWITCH_CLIENT_ID as string,
    'Authorization': `Bearer ${localStorage.getItem("access_token") as string}`,
  },
});

export type Stream = {
  id: string;
  user_id: string;
  user_name: string;
  game_id: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
}

export type Game = {
  id: string;
  name: string;
  box_art_url: string;
}

export const validateToken = async (accessToken) => {
  try {
    const response = await axios.get('https://id.twitch.tv/oauth2/validate', {
      headers: {
        'Authorization': `OAuth ${accessToken}`,
      }
    });

    const userId = response.data.user_id;
    return userId;

  } catch (error) {
    console.error('Error validating token:', error);
    return null;
  }
};

export const addStreamerAvatar = async (stream) => {
  let streamerAvatarRequest = await fetchStreamerByLogin(stream.user_login);
  return streamerAvatarRequest.profile_image_url
};


// Fonction pour récupérer les streams en direct
export const fetchLiveStreams = async (nbStreams = 5, userId: string): Promise<Stream[]> => {
  try {
    const response = await apiClient.get(`/streams?first=${nbStreams}&language=fr${userId ? `&user_id=${userId}` : ''}`);
    let streams = response.data.data;
    streams.forEach(async (stream, index) => {
      let avatar = await addStreamerAvatar(stream);
      streams[index] = { ...stream, avatar };
    });
    return streams;
  } catch (error) {
    console.error('Error fetching live streams:', error);
    return [];
  }
};

// Fonction pour récupérer les jeux populaires
export const fetchTopGames = async (): Promise<Game[]> => {
  try {
    const response = await apiClient.get('/games/top');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching top games:', error);
    return [];
  }
};

// Fonction pour récupérer les détails d'un streamer par son ID
export const fetchStreamerByLogin = async (login: string): Promise<any> => {
  try {
    const response = await apiClient.get(`/users?login=${login}`);
    return response.data.data[0];
  } catch (error) {
    console.error(`Error fetching streamer with login ${login}:`, error);
    return null;
  }
};

// Fonction pour rechercher des streams par nom de jeu
export const searchStreamsByGame = async (gameName: string): Promise<Stream[]> => {
  try {
    const gamesResponse = await apiClient.get(`/games?name=${encodeURIComponent(gameName)}`);
    const gameId = gamesResponse.data.data[0]?.id;

    if (gameId) {
      const streamsResponse = await apiClient.get(`/streams?game_id=${gameId}`);
      return streamsResponse.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error searching streams by game ${gameName}:`, error);
    return [];
  }
};

// Fonction pour rechercher le nombre de followers d'un streamer
export const getStreamerFollowersCount = async (streamerId: string): Promise<number> => {
  try {
    const followersResponse = await apiClient.get(`/channels/followers?broadcaster_id=${streamerId}`);
    return followersResponse.data.total;
  } catch (error) {
    console.error(`Error searching followers by streamer id ${streamerId}:`, error);
  }
};


// Fonction pour rechercher le nombre de followers d'un streamer
export const getStreamerChannel = async (streamerId: string): Promise<number> => {
  try {
    const channelsResponse = await apiClient.get(`/channels?broadcaster_id=${streamerId}`);
    return channelsResponse.data.data[0];
  } catch (error) {
    console.error(`Error searching followers by streamer id ${streamerId}:`, error);
  }
};

export const getStreamInformations = async (streamId: string): Promise<number> => {
  try {
    const streamResponse = await apiClient.get(`/streams?user_id=${streamId}`);
    return streamResponse.data.data[0];
  } catch (error) {
    console.error(`Error searching Stream informations:`, error);
  }
};

export const getRecommendedChannelsForSidebar = async (): Promise<any[]> => {
  try {
    // Récupére des streams populaires
    const streamsResponse = await apiClient.get('https://api.twitch.tv/helix/streams?first=10');
    const streams = streamsResponse.data.data;

    // Extrait les IDs des streamers
    const userIds = streams.map(stream => stream.user_id);

    // Récupére les informations des streamers
    const usersResponse = await apiClient.get(`https://api.twitch.tv/helix/users?id=${userIds.join('&id=')}`);
    let users = usersResponse.data.data;

    // Ajouter le game_name à chaque utilisateur correspondant
    users = users.map(user => {
      const stream = streams.find(stream => stream.user_id === user.id);
      return {
        ...user,
        game_name: stream ? stream.game_name : 'Unknown' // Ajouter le game_name au user
      };
    });

    return users;

  } catch (error) {
    console.error('Error fetching recommended channels:', error);
    return [];
  }
}

// Fonction pour récupérer les chaînes suivies
export const getFollowedChannels = async (userId) => {
  try {
    const response = await apiClient.get('https://api.twitch.tv/helix/streams/followed?user_id='+userId);
    console.log("getFollowedChannels", response);
    
    const followedChannels = response.data.data;
    return followedChannels;

  } catch (error) {
    console.error('Error fetching followed channels:', error);
    return [];
  }
};

// Fonction pour récupérer l'id d'un utilisateur connecté
export const getLoggedInUserId = async (accessToken) => {
  try {
    const userResponse = await apiClient.get(`https://api.twitch.tv/helix/users`);
    const user = userResponse.data.data;
    return user.id;

  } catch (error) {
    console.error('Error fetching followed channels:', error);
    return [];
  }
};

