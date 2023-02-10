import axios from "axios";

const tokenRiot: string = "RGAPI-b80015a3-fe3c-47c5-9c0b-4b5a640cc327";

export const api = axios.create({
  baseURL: "https://br1.api.riotgames.com",
  headers: {
    "X-Riot-Token": tokenRiot,
  },
});
