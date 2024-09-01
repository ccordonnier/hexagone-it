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

export const addStreamerAvatar = async (stream) => {
  let streamerAvatarRequest = await fetchStreamerByLogin(stream.user_login);
  let newStream = {...stream, avatar: streamerAvatarRequest.profile_image_url};
  return newStream
}

// Fonction pour récupérer les streams en direct
export const fetchLiveStreams = async (nbStreams = 5, userId: string): Promise<Stream[]> => {
  try {
    const response = await apiClient.get(`/streams?first=${nbStreams}&language=fr${userId ? `&user_id=${userId}` : ''}`);
    let streams = response.data.data;
    streams.forEach(async (stream, index) => {
      streams[index] = await addStreamerAvatar(stream);
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

