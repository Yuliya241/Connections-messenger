export interface Item {
  kind: string;
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
