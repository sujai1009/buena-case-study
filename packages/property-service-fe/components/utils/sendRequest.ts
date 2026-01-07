import { HttpMethods } from "../types/http.methods";

export const sendRequest = async (
  url: string,
  method: HttpMethods = HttpMethods.GET,
  payload?: string,
) => {
  const options = {
    method: HttpMethods[method],
    ...(payload && { body: payload }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  //console.log("sendRequest,", url)
  return fetch(url, options).then(r => {
    //console.log("sendRequest response:", r);
    return r.json()
  });
};

// export const sendRequest = async (
//   url: string,
//   method?: HttpMethods,
//   payload?: string,
// ) => {
//   const options = {
//     method: method? HttpMethods[method] : HttpMethods.GET,
//     ...(payload && { body: payload }),
//     headers: {
//       accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   };

//   return fetch(url, options as RequestInit).then(r => r.json());
// };

export const sendFileRequest = async (
  url: string,
  payload?: any,
) => {
  const options = {
    method: "POST",
    body: payload
  };

  return await fetch(url, options).then(r => r.json());;
};

export const downloadFile = async (
  url: string
) => {
  return fetch(url).then(r => r.blob());
};