import { defineStore } from "pinia";
import { getPlaylists, createPlaylist } from "../services/api";

export const usePlaylistStore = defineStore("playlist", {
  state: () => ({
    playlists: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPlaylists() {
      this.loading = true;
      try {
        this.playlists = await getPlaylists();
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async addPlaylist(data) {
      try {
        const newPlaylist = await createPlaylist(data);
        this.playlists.push(newPlaylist);
      } catch (err) {
        this.error = err;
      }
    },
  },
});
