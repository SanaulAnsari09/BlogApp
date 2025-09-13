import axios from "axios";

export const axiosUser = axios.create({
  baseURL: "http://localhost:8080/user",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPost = axios.create({
  baseURL: "http://localhost:8080/posts",
  headers: {
    "Content-Type": "application/json",
  },
});































export const axiosComment = axios.create({
  baseURL: "http://localhost:8080/comment",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPost.interceptors.request.use(
  (config) => {
    try {
      const user = localStorage.getItem("authToken");
      const parsedUser = JSON.parse(user);
      if (parsedUser?.Token) {
        config.headers.Authorization = parsedUser?.Token;
      }
      return config;
    } catch (error) {
      console.log("interceptors-err", error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosComment.interceptors.request.use(
  (config) => {
    try {
      const user = localStorage.getItem("authToken");
      const parsedUser = JSON.parse(user);
      if (parsedUser?.Token) {
        config.headers.Authorization = parsedUser?.Token;
      }
      return config;
    } catch (error) {
      console.log("interceptors-err", error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosComment.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized, redirecting to login...");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

axiosPost.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized, redirecting to login...");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
