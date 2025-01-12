import { useState, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

const useCachedFetch = ({ url, dataKey }: { url: string; dataKey: any }) => {
  const [cachedData, setCachedData] = useState({});

  const skipCacheRef = useRef(false)

  const { isPending, error, data, refetch } = useQuery({
    queryKey: [dataKey],

    queryFn: async () => {         
      if (!skipCacheRef.current && dataKey in cachedData) {
        return cachedData[dataKey as keyof typeof cachedData];
      }

      const data = await fetch(url);
      const jsonData = await data.json();

      setCachedData((prev) => ({ ...prev, [dataKey]: jsonData }));

      skipCacheRef.current = false;

      return jsonData;

    },  });

  const refetchWithoutCache = useCallback(() => {
    skipCacheRef.current = true;

    return refetch();
  }, [refetch, dataKey]);

  return { isPending, error, data, refetch: refetchWithoutCache };
};

export default useCachedFetch;
