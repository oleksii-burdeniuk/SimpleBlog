import {
  createPostInterface,
  PostItemInterface,
  updatePostInterface,
} from "@/types/posts";
import axios from "axios";
const BackendUrl = "https://jsonplaceholder.typicode.com/";

// USERS
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${BackendUrl}users`);
    return { data: res.data };
  } catch (error) {
    return { error };
  }
};

// POSTS
export const getAllPosts = async () => {
  try {
    const res = await axios.get(`${BackendUrl}posts`);
    const data: PostItemInterface[] = res.data;
    return { data };
  } catch (error) {
    return { error: axios.AxiosError };
  }
};
export const getPostsById = async (id: string | number) => {
  try {
    const res = await axios.get(`${BackendUrl}posts/${id}`);
    return { data: res.data };
  } catch (error) {
    return { error };
  }
};
// POSTS CREATE
export const createPosts = async ({
  title,
  body,
  userId,
}: createPostInterface) => {
  const bodyData = JSON.stringify({
    title,
    body,
    userId,
  });
  try {
    const res = await axios.post(`${BackendUrl}posts`, bodyData, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return { data: res.data };
  } catch (error) {
    return { error };
  }
};
// POSTS UPDATE
export const updatePosts = async ({
  title,
  body,
  userId,
  id,
}: createPostInterface & { id: string | number }) => {
  const bodyData = JSON.stringify({
    id,
    title,
    body,
    userId,
  });
  try {
    const res = await axios.put(`${BackendUrl}posts/${id}`, bodyData, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return { data: res.data };
  } catch (error) {
    return { error };
  }
};

export const updatePostsField = async ({
  ...args
}: updatePostInterface & { id: string | number }) => {
  const bodyData = JSON.stringify({
    ...args,
  });
  try {
    const res = await axios.patch(`${BackendUrl}posts/${args.id}`, bodyData, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return { data: res.data };
  } catch (error) {
    return { error };
  }
};
// POSTS DELETE
export const deletePost = async (id: string | number) => {
  try {
    const res = await axios.delete(`${BackendUrl}posts/${id}`);
    return { data: res.data };
  } catch (error) {
    return { error };
  }
};
// POSTS COMMENTS GET
export const getPostsComments = async (id: string | number) => {
  try {
    const res = await axios.get(`${BackendUrl}posts/${id}/comments`);
    return { data: res.data };
  } catch (error) {
    return { error };
  }
};
export const getAllComments = async () => {
  try {
    const res = await axios.get(`${BackendUrl}/comments`);
    return { data: res.data };
  } catch (error) {
    return { error };
  }
};

// const res = await getAllUsers();
// const res = await getAllPosts();
// const res2 = await getPostsById(1);
// const res = await getPostsComments(2);
// const res = await createPosts({
//   title: 'Hello worldddd',
//   body: 'Hello hello hello',
//   userId: 2,
// });
// const res = await updatePosts({
//   title: 'Hello worldddd',
//   body: 'Hello hello hello',
//   userId: 2,
//   id: 1,
// });

// const res = await updatePostsField({
//   title: 'Hello worldddd',
//   id: 1,
// });

// const res = await deletePost(1);
