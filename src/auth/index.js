import { API } from "../core/config";

export const signup = (user) => {
  // user di parameter ini adalah { name, email, password }
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      // Ketika kita membuat POST request, our API will respond dengan JSON data, jadi kita buat Acceptnya
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
