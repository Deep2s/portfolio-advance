export interface AudiusTrack {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  duration: number;
}

const APP_NAME = "portfolio_app";
const DISCOVERY_NODE = "https://discoveryprovider.audius.co";

export async function fetchTracksByCategory(category: string, offset: number = 0, limit: number = 30): Promise<AudiusTrack[]> {
  try {
    let searchQuery = category;
    if (category.toLowerCase() === "hindi") {
      // Enhance 'Hindi' query to find better matches on Audius
      searchQuery = "Bollywood Hindi";
    }

    const endpoint = category.toLowerCase() === "trending" 
      ? `${DISCOVERY_NODE}/v1/tracks/trending?app_name=${APP_NAME}&limit=${limit}&offset=${offset}`
      : `${DISCOVERY_NODE}/v1/tracks/search?query=${encodeURIComponent(searchQuery)}&app_name=${APP_NAME}&limit=${limit}&offset=${offset}`;

    const res = await fetch(endpoint, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const json = await res.json();
    if (!json.data) return [];
    
    return json.data.map((track: any) => {
      // Use user's profile picture as fallback if track artwork is missing
      const artwork = track.artwork?.["480x480"] 
        || track.user?.profile_picture?.["480x480"] 
        || track.user?.profile_picture?.["150x150"] 
        || "";

      return {
        id: track.id,
        title: track.title,
        artist: track.user.name,
        artwork: artwork,
        duration: track.duration,
      };
    });
  } catch (error) {
    console.error(`Error fetching Audius tracks for category ${category}:`, error);
    return [];
  }
}

export function getStreamUrl(trackId: string): string {
  return `${DISCOVERY_NODE}/v1/tracks/${trackId}/stream?app_name=${APP_NAME}`;
}
