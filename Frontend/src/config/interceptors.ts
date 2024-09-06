import axiosInstance from "./axiosInstance"; // Adjust the import path as needed

// Show loader
const showLoader = () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "block";
  }
};

// Hide loader
const hideLoader = () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "none";
  }
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    showLoader();
    return config;
  },
  (error) => {
    hideLoader();
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    hideLoader();
    return response;
  },
  (error) => {
    hideLoader();
    return Promise.reject(error);
  }
);

export default axiosInstance;
