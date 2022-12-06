import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie"
const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    withCredentials: true,
});

export const getRooms = () =>
    instance.get("rooms/").then((
        response) => response.data);

export const getRoom = ({queryKey}: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}`).then((response) => response.data);
}

export const getRoomReviews = ({queryKey}: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}/reviews`).then((response) => response.data);
}

export const getMe = () =>
    instance.get(`users/me`).then(
        (response) => response.data)


export const logOut = () =>
    instance.post(`users/log-out`, null, {
        headers : {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }).then(
        (response) => response.data)

export const githubLogIn = (code: string) =>
  instance
    .post(
      `users/github`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogIn = (code : string) =>
    instance.post(
        `users/kakao`,
        {code},
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    ).then((response) => response.status);
export interface ISignUPForm {
    name: string,
    username:string,
    email:string,
    password1:string,
    password2:string,
}

export interface IUsernameLoginVariables {
    username: string,
    password: string,
}
export interface IUsernameLoginSuccess {
    ok:string,
}
export interface IUsernameLoginError {
    error:string,
}

export const usernameLogin = ({username, password} : IUsernameLoginVariables) =>
    instance.post(
        `users/log-in`,
        {username, password},
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    ).then((response) => response.data);

export const userSignUp = ({name, username, email, password1, password2 } : ISignUPForm) =>
    instance.post(
        `users/sign-up`,
        {name, username, email, password1, password2},
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    ).then((response) => response.data);

export const getAmenities = () =>
  instance.get(`rooms/amenities`).then((response) => response.data);

export const getCategories = () =>
  instance.get(`categories`).then((response) => response.data);

// export async function getAmenities() {
//     const response = await fetch(`http://127.0.0.1:8000/api/v1/rooms/amenities`);
//     const json = await response.json();
//     return json;
//     const response = await axios.get(`/rooms/`);
//     return response.data;
// }