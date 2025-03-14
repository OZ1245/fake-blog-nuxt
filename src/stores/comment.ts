import { defineStore } from 'pinia';
import type { Email } from '@/src/types/common';
import type { IFilterPayload } from '~/src/types/common';

interface ICommentBase {
  postId: number;
  name: string;
  email: Email,
  body: string;
}

interface IComment extends ICommentBase {
  id: number;
}

interface ICreateCommentPayload extends ICommentBase {}
interface IUpdateCommentPayload extends IComment {}
interface IPatchCommentPayload {
  id: number;
  postId?: number;
  name?: string;
  email?: Email,
  body?: string;
}

interface IReturnData {
  fetchComments: () => Promise<IComment>;
  fetchComment: (id: number) => Promise<IComment>;
  createComment: (payload: ICreateCommentPayload) => Promise<IComment>;
  updateComment: (payload: IUpdateCommentPayload) => Promise<IComment>;
  patchComment: (payload: IPatchCommentPayload) => Promise<IComment>;
  deleteComment: (id: number) => Promise<void>;
  filterComments: (payload: IFilterPayload[]) => Promise<IComment[]>;
}

export const useCommentStore = defineStore('commentStore', () => {
  const fetchComments = async <T>(): Promise<T> => {
    try {
      const { json } = await fetch('https://jsonplaceholder.typicode.com/comments');
      return json as T;
    } catch (error) {
      throw error;
    }
  }
  const fetchComment = async <T>(id: number): Promise<T> => {
    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/comment/${id}`);
      return json as T;
    } catch (error) {
      throw error;
    }
  }
  const createComment = async <T>(payload: ICreateCommentPayload): Promise<T> => {
    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/comment`, {
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
  const updateComment = async <T>(payload: IUpdateCommentPayload): Promise<T> => {
    const { id } = payload;
    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/comment/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        }
      });
      return json as T;
    } catch (error) {
      throw error;
    }
  }
  const patchComment = async <T>(payload: IPatchCommentPayload): Promise<T> => {
    const { id } = payload;
    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/comment/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        }
      });
      return json as T;
    } catch (error) {
      throw error;
    }
  }
  const deleteComment = async <T>(id: number): Promise<void> => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/comment/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw error;
    }
  }
  const filterComments = async <T>(payload: IFilterPayload[]): Promise<T> => {
    let filterString: string[] = [];

    payload.forEach(({ key, value }) => {
      filterString.push(`${key}=${encodeURIComponent(value)}`);
    });

    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/comments?${filterString.join('&')}`);
      return json as T;
    } catch (error) {
      throw error;
    }
  }

  return <IReturnData>{
    fetchComments,
    fetchComment,
    createComment,
    updateComment,
    patchComment,
    deleteComment,
    filterComments
  }
});