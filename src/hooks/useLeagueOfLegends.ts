import { useCallback, useEffect, useState } from "react";
import { api } from "../configs/riot";
import { LeagueOfLegends } from "../interfaces/LeagueInterface";
import { useAuthentication } from "./useAuthentication";

const { user } = useAuthentication();

const [summoner, setSummoner] = useState<LeagueOfLegends>();

async function getSummonerInfo() {
  await api
    .get<LeagueOfLegends>(
      `/lol/summoner/v4/summoners/by-name/${encodeURI(
        String(user?.riot.summonerName)
      )}`
    )
    .then(({ data }) => {
      setSummoner(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
