import { VideoItem } from '../youtube/models/search-item.model';

export interface VideosState {
  cards: CustomCard[];
  selectedCard?: CustomCard;
  items: VideoItem[];
  searchTerm: string;
  favoriteList: VideoItem[];
  pageNumber: number;
  pageToken: string;
}

export interface CustomCard {
  title: string;
  description: string;
  img: string;
  video: string;
  date: string;
  id: string;
}

export const initialState: VideosState = {
  cards: [],
  items: [],
  searchTerm: '',
  favoriteList: [],
  pageNumber: 1,
  pageToken: '',
};
