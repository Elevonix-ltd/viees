export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  slug: string;
}

const posts: Post[] = [
  {
    id: "1",
    title: "Welcome to VIEES 🎉",
    content: "VIEES is a fast, minimal blogging platform built for real stories. Write anything — thoughts, tutorials, opinions, life updates. Share it with your community on WhatsApp in one tap.\n\nThis is the first post. Create your own using the menu above!",
    createdAt: new Date().toISOString(),
    slug: "welcome-to-viees",
  },
  {
    id: "2",
    title: "Why Simple Beats Complex Every Time",
    content: "We always want to add more features. More options. More settings. But the best products in the world are the ones that do one thing really well.\n\nVIEES does one thing: lets you write and share stories. No clutter. No noise. Just your words and an audience waiting to read them.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    slug: "why-simple-beats-complex",
  },
];

export function getPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPostById(id: string): Post | undefined {
  return posts.find((p) => p.id === id);
}

export function createPost(title: string, content: string): Post {
  const id = Date.now().toString();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const post: Post = { id, title, content, createdAt: new Date().toISOString(), slug };
  posts.unshift(post);
  return post;
}
