export type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

const blogs: Blog[] = [
  { id: 1, title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 },
  { id: 2, title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf", likes: 5 },
  { id: 3, title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12 },
];

export const getBlogs = () => blogs;

export const addBlog = (blog: Omit<Blog, "id" | "likes">) => {
  // shortcut: length + 1 is unique only because blogs are never deleted; use a real id once deletion exists
  const newBlog = { ...blog, id: blogs.length + 1, likes: 0 };
  blogs.push(newBlog);
  return newBlog;
};

export const getBlog = (id: number) => blogs.find((blog) => blog.id === id);

export const likeBlog = (id: number) => {
  const blog = getBlog(id);
  if (blog) blog.likes += 1;
  return blog;
};
