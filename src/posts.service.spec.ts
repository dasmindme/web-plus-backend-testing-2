import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const foundPosts = postsService.findMany();

      expect(foundPosts).toEqual([
        {id: '1', text: 'Post 1'},
        {id: '2', text: 'Post 2'},
        {id: '3', text: 'Post 3'},
        {id: '4', text: 'Post 4'},
      ]);
    });

    it('should return correct posts for skip and limit options', () => {
      const foundPosts = postsService.findMany({skip: 1, limit: 2});

      expect(foundPosts).toEqual([
        {id: '2', text: 'Post 2'},
        {id: '3', text: 'Post 3'},
      ]);
    });

    it('should return posts with skip only', () => {
      const foundPosts = postsService.findMany({skip: 2});

      expect(foundPosts).toEqual([
        {id: '3', text: 'Post 3'},
        {id: '4', text: 'Post 4'},
      ]);
    });

    it('should return posts with limit only', () => {
      const foundPosts = postsService.findMany({limit: 3});

      expect(foundPosts).toEqual([
        {id: '1', text: 'Post 1'},
        {id: '2', text: 'Post 2'},
        {id: '3', text: 'Post 3'},
      ]);
    });

    it('should return empty array when skip is greater than posts count', () => {
      const foundPosts = postsService.findMany({skip: 10});

      expect(foundPosts).toEqual([]);
    });

    it('should return all posts when limit is greater than posts count', () => {
      const foundPosts = postsService.findMany({limit: 10});

      expect(foundPosts).toEqual([
        {id: '1', text: 'Post 1'},
        {id: '2', text: 'Post 2'},
        {id: '3', text: 'Post 3'},
        {id: '4', text: 'Post 4'},
      ]);
    });
  });
});