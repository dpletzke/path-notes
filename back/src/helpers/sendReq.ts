export default async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  { url = "", payload, accessToken = "", params = {} }: any
) => {
  const urlInst = new URL(url);

  const config: RequestInit = {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };

  if (method !== "GET" && payload) {
    config.body = JSON.stringify(payload); // body data type must match "Content-Type" header
  }

  if (params) {
    Object.keys(params).forEach((key) => {
      const value = params[key];
      urlInst.searchParams.append(key, JSON.stringify(value));
    });
  }

  if (accessToken.length > 0) {
    config.headers.Authorization = "Bearer " + accessToken; // body data type must match "Content-Type" header
  }
  const response = await fetch(urlInst.toString(), config);
  return response
    .json()
    .then((data) => ({ code: response.status, body: data }));
};
