import { useEffect, useState } from "react";
import { fetchTrendingGifs, fetchSearchGifs } from "../api/giphyApi";

type Gif = {
  id: string;
  title: string;
  images: {
    original: {
      url: string;
      width: string;
      height: string;
    };
  };
};

export const useGifs = (query: string = "") => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadGifs = async (reset: boolean = false) => {
    if (loading) return;

    const currentOffset = reset ? 0 : offset;
    setLoading(true);

    try {
      const data: Gif[] = query
        ? await fetchSearchGifs(query, currentOffset)
        : await fetchTrendingGifs(currentOffset);

      setGifs(reset ? data : [...gifs, ...data]);
      setOffset(currentOffset + data.length);
      setHasMore(data.length === 15);
    } catch (err) {
      console.error("Failed to load GIFs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGifs(true);
  }, [query]);

  return { gifs, loadGifs, loading, hasMore };
};
