import { createCustomCard, fetchVideos, setCustomCard } from './videos.actions';

describe('VideosActions', () => {
  describe('FetchVideos', () => {
    it('should create an action to fetch videos', () => {
      const expectedAction = {
        searchTerm: 'angular',
        type: fetchVideos.type,
      };
      const action = fetchVideos({ searchTerm: 'angular' });
      expect(action).toEqual(expectedAction);
    });
  });

  describe('setCustomCard', () => {
    it('should create an action to set Custom Card', () => {
      const expectedAction = {
        type: setCustomCard.type,
        id: '1',
      };
      const action = setCustomCard({
        id: '1',
      });
      expect(action).toEqual(expectedAction);
    });
  });

  describe('createCustomCard', () => {
    it('should create an action to create Custom Card', () => {
      const card = {
        id: `${Date.now()}`,
        title: 'Angular',
        description: '-',
        img: 'https://i.ytimg.com/vi/YN8zNnV0sK8/hqdefault.jpg',
        video: 'https://www.youtube.com/watch?v=iWX7qCGVt9U',
        date: '2023-11-01',
      };
      const expectedAction = {
        type: createCustomCard.type,
        newCard: card,
      };
      const action = createCustomCard({ newCard: card });
      expect(action).toEqual(expectedAction);
    });
  });
});
