import { ParamListBase } from '@react-navigation/native';

export interface Gif {
    id: string;
    title: string;
    images: {
      fixed_height?: { url: string };
      fixed_width?: { url: string };
      original?: { url: string; width: string; height: string };
    };
  }
  
  export interface RootStackParamList extends ParamListBase {
    Splash: undefined;
    Home: undefined;
    Feedback: { gif: Gif };
  }
  
  export interface GiphyResponse {
    data: Gif[];
    pagination: {
      total_count: number;
      count: number;
      offset: number;
    };
  }

  export interface FeedbackData {
    gifId: string;
    comment?: string;
    rating: number;
    timestamp: number;
  }