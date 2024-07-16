import { searchPins, type ISearch } from "pinterest.js";
import { useEffect, useState } from "react";

export function useQuerySearch<T extends string>(query?: T | "wallpaper") {
  const [data, setData] = useState<ISearch[] | undefined>(undefined);

  useEffect(() => {
    const getResponse = async () => {
      const SEARCH_QUERY: string | undefined = query;
      const response = await searchPins(
        SEARCH_QUERY || ("wallpaper" as string),
        {
          limit: 20,
        }
      );
      setData(response?.response);
    };
    getResponse();
  }, []);

  return data;
}
