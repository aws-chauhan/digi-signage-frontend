import axios from "axios";

const API_URL = "http://localhost:3000/api";

export async function getPlaylists() {
  const res = await axios.get(`${API_URL}/playlists`);
  return res.data;
}

export async function createPlaylist(data) {
  const res = await axios.post(`${API_URL}/playlists`, data);
  return res.data;
}
