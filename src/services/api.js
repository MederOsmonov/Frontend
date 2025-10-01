const fakePosts = [
  { id: 1, title: "First Post", content: "This is the content of the first post." },
  { id: 2, title: "Second Post", content: "Content of the second post goes here." }
];

export const fetchPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakePosts), 500);
  });
};
