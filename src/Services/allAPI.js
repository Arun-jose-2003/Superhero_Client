import { commonAPI } from "./commonAPI";
import {SERVER_URL} from "./server_url"

// Register API
export const registerAPI = async (user) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, user, "");
  };
  
  // Login API
  export const loginAPI = async (user) => {
    return await commonAPI("POST", `${SERVER_URL}/login`, user, "");
  };

  export const grievanceAPI = async (grievance) => {
    return await commonAPI("POST", `${SERVER_URL}/grievance`, grievance, "");
  };

  //chatAPI
  export const chatAPI = async (chat) => {
    return await commonAPI("POST", `${SERVER_URL}/chat`, chat, "");
  };


  