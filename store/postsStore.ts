import { PostItemInterface } from "@/types/posts";
import { create } from "zustand";
interface PostsStore {
  posts: PostItemInterface[];

  setPosts: (posts: PostItemInterface[]) => void;
}

const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
}));

export default usePostsStore;
