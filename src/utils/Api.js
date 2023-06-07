import hendleResponse from './utils'

class Api {
  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _fetch(path, method, data) {
    let body = data;
    if((method === 'PATCH' || method === 'POST') && data) {
      body = JSON.stringify(data);
    }
    return fetch(this._baseUrl + path, {
      method,
      headers: this._headers,
      body,
    }).then((res) => hendleResponse(res))
  };

  getUserInfo() {
    return this._fetch('/users/me', 'GET');
  }

  setUserInfo(data) {
    return this._fetch('/users/me', 'PATCH', data);
  }


  getInitialCards() {
    return this._fetch('/cards', 'GET')
  }

  setUserAvatar(data) {
    return this._fetch('/users/me/avatar', 'PATCH', data )
  }

  addCard(data) {
    return this._fetch('/cards', 'POST', data)
  }

  deleteCard(id) {
    return this._fetch(`/cards/${id}`, 'DELETE')
  }

  like(id) {
    return this._fetch(`/cards/${id}/likes`, 'PUT')
  }

  dislike(id) {
    return this._fetch(`/cards/${id}/likes`, 'DELETE')
  }

  changeLikeStatus(id, hasLike) {
    if(!hasLike) {
      return api.like(id);
    }
    return api.dislike(id);
  }

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '87a6d699-c32c-4dde-9ddf-4290549fb435',
    'Content-Type': 'application/json'
  }
});
