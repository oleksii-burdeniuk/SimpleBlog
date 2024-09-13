export interface createPostInterface {
  title: string;
  body: string;
  userId: string | number;
}
export interface updatePostInterface {
  title?: string;
  body?: string;
  userId?: string | number;
  id: string | number;
}
export interface PostItemInterface {
  id: string | number;
  title: string;
  body: string;
  userId: string | number;
}
