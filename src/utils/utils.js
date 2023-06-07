const hendleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Ой...: ${res.status}`);
}

export default hendleResponse
