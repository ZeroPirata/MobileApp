import axios from "axios";

const tokenRiot: string = "";

export const api = axios.create({
  baseURL: "https://br1.api.riotgames.com",
  headers: {
    "X-Riot-Token": tokenRiot,
  },
});
