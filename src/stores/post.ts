import { defineStore } from 'pinia';
import type { IFilterPayload } from '~/src/types/common';

interface IPostBase {
  title: string;
  body: string;
  userId: number;
}

interface IPost extends IPostBase {
  id: number;
}

interface ICreatePostPayload extends IPostBase {}

interface IUpdatePostPayload extends IPost {}

interface IPatchPostPayload {
  id: number;
  title?: string;
  body?: string;
  userId?: number;
}

interface IReturnData {
  fetchPosts: () => Promise<IPost>;
  fetchPost: (id: number) => Promise<IPost>;
  createPost: (payload: ICreatePostPayload) => Promise<IPost>;
  updatePost: (payload: IUpdatePostPayload) => Promise<IPost>;
  patchPost: (payload: IPatchPostPayload) => Promise<IPost>;
  deletePost: (id: number) => Promise<void>;
  filterPosts: (payload: IFilterPayload[]) => Promise<IPost[]>;
}

export const usePostStore = defineStore('postStore', () => {
  const fetchPosts = async <T>(): Promise<T> => {
    try {
      const { json } = await fetch('https://jsonplaceholder.typicode.com/posts');
      return json as T;
    } catch (error) {
      throw error;
    }
  }

  const fetchPost = async <T>(id: number): Promise<T> => {
    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return json as T;
    } catch (error) {
      throw error;
    }
  }

  const createPost = async <T>(payload: ICreatePostPayload): Promise<T> => {
    try {
      const { json } = await fetch('https://jsonplaceholder.typicode.com/post', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return json as T;
    } catch (error) {
      throw error;
    }
  }

  const updatePost = async <T>(payload: IUpdatePostPayload): Promise<T> => {
    const { id } = payload;
    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return json as T;
    } catch (error) {
      throw error;
    }
  }

  const patchPost = async <T>(payload: IPatchPostPayload): Promise<T> => {
    const { id } = payload;
    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return json as T;
    } catch (error) {
      throw error;
    }
  }

  const deletePost = async <T>(id: number): Promise<void> => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw error;
    }
  }

  const filterPosts = async <T>(payload: IFilterPayload[]): Promise<T> => {
    let filterString: string[] = [];

    payload.forEach(({ key, value}) => {
      filterString.push(`${key}=${encodeURIComponent(value)}`);
    });

    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/posts?${filterString.join('&')}`);
      return json as T;
    } catch (error) {
      throw error;
    }
  }

  // TODO: nested content
  /**
   * fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
   *   .then((response) => response.json())
   *   .then((json) => console.log(json));
   *
   *   The available nested routes are:
   *
   * /posts/1/comments
   * /albums/1/photos
   * /users/1/albums
   * /users/1/todos
   * /users/1/posts
   */
  const fetchPostComments = async <T>(id: number): Promise<T> => {
    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      return json as T;
    } catch (error) {
      throw error;
    }
  }

  return <IReturnData>{
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    patchPost,
    deletePost,
    filterPosts,
    fetchPostComments
  }
})
