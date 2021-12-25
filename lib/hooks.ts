import fetcher from "./fetcher";
import useSWR from "swr";

export const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);

  return {
    user: data,
    isLoadind: !data && !error,
    isError: error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR("/playlist", fetcher);

  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};
