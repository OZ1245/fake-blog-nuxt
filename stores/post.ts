import { defineStore } from 'pinia';
import type { IFilterPayload } from '~/types/common';

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
  fetchPosts: () => Promise<IPost[]>;
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
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      console.log(response);
      return await response.json() as T;
    } catch (error) {
      throw error;
    }
  }

  const fetchPost = async <T>(id: number): Promise<T> => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return await response.json() as T
    } catch (error) {
      throw error;
    }
  }

  const createPost = async <T>(payload: ICreatePostPayload): Promise<T> => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/post', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return await response.json() as T
    } catch (error) {
      throw error;
    }
  }

  const updatePost = async <T>(payload: IUpdatePostPayload): Promise<T> => {
    const { id } = payload;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return await response.json() as T
    } catch (error) {
      throw error;
    }
  }

  const patchPost = async <T>(payload: IPatchPostPayload): Promise<T> => {
    const { id } = payload;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return await response.json() as T
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
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?${filterString.join('&')}`);
      return await response.json() as T
    } catch (error) {
      throw error;
    }
  }

  const fetchPostComments = async <T>(id: number): Promise<T> => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      return await response.json() as T
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
