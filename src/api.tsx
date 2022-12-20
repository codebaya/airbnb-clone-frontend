import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie"
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import exp from "constants";
import {queryKey} from "@tanstack/react-query/build/lib/__tests__/utils";
const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    withCredentials: true,
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //
    // }
    // method:'get',
});

export const getRooms = () =>
    instance.get("rooms/").then((
        response) => response.data);

export const getRoom = ({queryKey}: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}`).then((response) => response.data);
}

export const getBookings = ({queryKey}: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}/bookings`,).then((response) => response.data)
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
  // instance.get(`rooms/amenities`).then((response) => response.data);
  instance.get(`rooms/amenities/`).then((response) =>
          response.data);

export const getRoomAmenities = ({queryKey}: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}/amenities`).then((response) => response.data);
}


export const getCategories = () =>
  instance.get(`categories/`).then((response) =>
      response.data).catch(function (error) {

  });

// export const getRoomReviews = ({queryKey}: QueryFunctionContext) => {
//     const [_, roomPk] = queryKey;
//     return instance.get(`rooms/${roomPk}/reviews`).then((response) => response.data);
// }

export interface IUploadRoomVarious {
        id:number,
        name:string,
        country:string,
        city:string,
        price:number,
        rooms:number,
        toilets:number,
        description:string,
        address:string,
        pet_friendly:boolean,
        kind:string,
        amenities:number[],
        category:number,
    };

export interface IEditRoomVariables extends IUploadRoomVarious {
    roomPk: string
}
export const uploadRoom = (variables : IUploadRoomVarious) =>
    // console.log(variables);
    instance.post(
        `rooms/`,
        variables,
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    ).then((response) => response.data);

// {id, name, country, city, price,
//                              rooms, toilets, description,
//                          address, pet_friendly, kind, amenities, category
//                          } : IUploadRoomVarious,
export const editRoom = ( variables : IEditRoomVariables)  =>
    // const [_, roomPk] = queryKey();
    instance.put(
        `rooms/${variables.roomPk}/edit`,
        variables,
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    ).then((response) => response.data);




export const getUploadURL = () =>
    instance.post(
        `medias/photos/get-url`, null,
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }
    ).then((response) => response.data);

export interface IUploadImageVariables {
    file:FileList,
    uploadURL:string;
}

export const uploadImage = ({file, uploadURL}: IUploadImageVariables) => {
    const form = new FormData();
    form.append('file', file[0]);
    return axios.post(uploadURL, form, {
        headers: {
            "Content-Type": "multipart/form-data"
            }
        }).then((response) => response.data);
}

export interface ICreatePhotoVariables {
    description:string,
    file:string,
    roomPk:string,
}

export const createPhoto =
    ({description, file, roomPk}:ICreatePhotoVariables) =>
        instance.post(`rooms/${roomPk}/photos`,
            {description, file},
            {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }).then((response) => response.data)

type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkBooking = ({ queryKey }: QueryFunctionContext<CheckBookingQueryKey>) => {
    const [_, roomPk, dates] = queryKey;
    if (dates) {
        const [firstDate, secondDate] = dates;
        const [checkIn] = firstDate.toJSON().split('T')
        const checkOut = secondDate.toJSON().split('T')[0]
        return instance.get(
            `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
        ).then((response) => response.data)
    }

}

export const roomBooking = ({check_in, check_out, roomPk, guests, name}: IRoomBookingVariables) => {
    // const [_, roomPk, dates] = queryKey;

    return instance.post(
        `rooms/${roomPk}/bookings`,
        {check_in, check_out, guests, name},
        {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },

    }).then((response) => response.data)


}

export interface IRoomBookingVariables {
    check_in: string,
    check_out: string,
    guests:number,
    name: string,
    roomPk: string,
}