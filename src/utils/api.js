import { config } from "./config";

const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ url, token }) {
    this._url = url;
    this._token = token;
  }

  getPosts() {
    return fetch(`${this._url}/posts`, {
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponce);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponce);
  }

  addLike(itemID) {
    return fetch(`${this._url}/posts/likes/${itemID}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponce);
  }

  deleteLike(itemID) {
    return fetch(`${this._url}/posts/likes/${itemID}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponce);
  }

    deletePosts(itemID) {
      return fetch(`${this._url}/posts/${itemID}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${this._token}`,
        },
      }).then(onResponce);
    }
}

export default new Api(config);
