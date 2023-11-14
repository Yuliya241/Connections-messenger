export interface SearchResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  regionCode?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Item[];
}

export interface Item {
  kind: string;
  etag: string;
  id: {
    kind?: string;
    videoId?: string;
  }
  snippet: Snippet;
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}

export interface VideoResponse {
  kind: 'youtube#videoListResponse';
  etag: string;
  nextPageToken?: string;
  regionCode?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: VideoItem[];
}

export interface VideoItem {
  kind: 'youtube#video';
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: ThumbnailsItems;
    medium: ThumbnailsItems;
    high: ThumbnailsItems;
    standard: ThumbnailsItems;
    maxres: ThumbnailsItems;
  };
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage: string;
}

interface ThumbnailsItems {
  url: string;
  width: number;
  height: number;
}
