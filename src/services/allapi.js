import { BASE_URL } from "./baseurl";
import { commonRequest } from "./commonrequest";

// Add video 

export const addVideo = async (body) => {
  return await commonRequest("POST", `${BASE_URL}/videos`, body)
}

// Get video

export const getVideo = async () => {
  return await commonRequest("GET", `${BASE_URL}/videos`, "")
}

// Delete

export const deleteVideo = async (id) => {
  return await commonRequest("DELETE", `${BASE_URL}/videos/${id}`, {})
}

//Add categories

export const addCategories = async (body) => {
  return await commonRequest("POST", `${BASE_URL}/categories`, body)
}

//Get all category

export const getallCategories = async () => {
  return await commonRequest("GET", `${BASE_URL}/categories`, "");
}

//Detele category 

export const deleteCategory = async (id) => {
  return await commonRequest("DELETE", `${BASE_URL}/categories/${id}`, {});
}


// Get History

export const getHistory = async () => {
  return await commonRequest("GET", `${BASE_URL}/watch-history`, "");
}

// Add History

export const addHistory = async (body) => {
  return await commonRequest("POST", `${BASE_URL}/watch-history`, body);
}

// get single card details 

export const getVideos = async (id) => {
  return await commonRequest("GET", `${BASE_URL}/videos/${id}`, "");
}

//To update card details in category section

export const updateCategory = async (id, body) => {
  return await commonRequest("PUT", `${BASE_URL}/categories/${id} `, body);
}