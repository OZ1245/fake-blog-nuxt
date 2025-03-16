import { defineStore } from 'pinia';
import type { Email } from '~/types/common';
import type { IFilterPayload } from '~/types/common';

interface ICoordinates {
  lat: string;
  lng: string;
}

interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: ICoordinates;
}

interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface IUserBase {
  name: string;
  username: string;
  email: Email;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

interface IUser extends IUserBase {
  id: number;
}

interface ICreateUserPayload extends IUserBase {}
interface IUpdateUserPayload extends IUser {}
interface IPatchUserPayload {
  id: number;
  name?: string;
  username?: string;
  email?: Email;
  address?: IAddress;
  phone?: string;
  website?: string;
  company?: ICompany;
}

interface IReturnData {
  fetchUsers: () => Promise<IUser>;
  fetchUser: (id: number) => Promise<IUser>;
  createUser: (payload: ICreateUserPayload) => Promise<IUser>;
  updateUser: (payload: IUpdateUserPayload) => Promise<IUser>;
  patchUser: (payload: IPatchUserPayload) => Promise<IUser>;
  deleteUser: (id: number) => Promise<void>;
  filterUsers: (payload: IFilterPayload[]) => Promise<IUser[]>;
}

export const useUserStore = defineStore('userStore', () => {
  const fetchUsers = async <T>(): Promise<T> => {
    try {
      const { json } = await fetch('https://jsonplaceholder.typicode.com/users');
      return json as T;
    } catch (error) {
      throw error;
    }
  }
  const fetchUser = async <T>(id: number): Promise<T> => {
    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/user/${id}`);
      return json as T;
    } catch (error) {
      throw error;
    }
  }
  const createUser = async <T>(payload: ICreateUserPayload): Promise<T> => {
    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/user`, {
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
  const updateUser = async <T>(payload: IUpdateUserPayload): Promise<T> => {
    const { id } = payload;
    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/user/${id}`, {
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
  const patchUser = async <T>(payload: IPatchUserPayload): Promise<T> => {
    const { id } = payload;
    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/user/${id}`, {
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
  const deleteUser = async <T>(id: number): Promise<void> => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/user/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw error;
    }
  }
  const filterUsers = async <T>(payload: IFilterPayload[]): Promise<T> => {
    let filterString: string[] = [];

    payload.forEach(({ key, value }) => {
      filterString.push(`${key}=${encodeURIComponent(value)}`);
    });

    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/users?${filterString.join('&')}`);
      return json as T;
    } catch (error) {
      throw error;
    }
  }

  const fetchUserPosts = async <T>(id: number): Promise<T> => {
    try {
      const { json } = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      return json as T;
    } catch (error) {
      throw error;
    }
  }

  return <IReturnData>{
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
    filterUsers,
    fetchUserPosts
  }
});