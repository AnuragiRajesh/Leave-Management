import axios from 'axios';

const API_BASE_URL = 'https://zsrzpuksbzimwhxqlddb.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzcnpwdWtzYnppbXdoeHFsZGRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIzMzExNTUsImV4cCI6MTk5NzkwNzE1NX0._rMLleWycKDfDSj0P633reCR2j-_nlN-uTgLcO5MTsM';
const ACCESS_TOKEN=localStorage.getItem("Access_Token");
export const loginApi =  (data) => {

    return axios.post(`${API_BASE_URL}/auth/v1/token?grant_type=password`, data, {
        headers: {
          'Content-Type': 'application/json',
          'apikey': API_KEY,
        },
      });
  
};
export const registerApi = async (data) => {
    return axios.post(`${API_BASE_URL}/auth/v1/signup`, data, {
        headers: {
          'Content-Type': 'application/json',
          'apikey': API_KEY,
        },
      });
  };

  // https://zsrzpuksbzimwhxqlddb.supabase.co/rest/v1/leaves

  export const getLeaveApi = async (data) => {
    console.log(ACCESS_TOKEN,"while calliing the getLeaves Api")
    return axios.get(`${API_BASE_URL}/rest/v1/leaves?select=*`, {
        headers: {
          'Content-Type': 'application/json',
        'apikey': API_KEY,
          'Authorization': `Bearer ${ACCESS_TOKEN}`,

        },
      });
  };
  export const requestLeaveApi = async (data) => {
    return axios.post(`https://zsrzpuksbzimwhxqlddb.supabase.co/rest/v1/leaves`,data, {
        headers: {
          'Content-Type': 'application/json',
        'apikey': API_KEY,
          'Authorization': `Bearer ${ACCESS_TOKEN}`,

        },
      });
  };

  export const deleteLeaveApi = async (id) => {
    console.log(id,"here we go")
    return axios.delete(`https://zsrzpuksbzimwhxqlddb.supabase.co/rest/v1/leaves?id=eq.${id}`,{
        headers: {
          'Content-Type': 'application/json',
        'apikey': API_KEY,
          'Authorization': `Bearer ${ACCESS_TOKEN}`,

        },
      });
  }
  export const logoutApi = async (id) => {
    return axios.post(`https://zsrzpuksbzimwhxqlddb.supabase.co/auth/v1/logout`,{
        headers: {
        'apikey': API_KEY,
          'Authorization': `Bearer ${ACCESS_TOKEN}`,

        },
      });
  };
  export const updateLeaveApi = async (data,id) => {
    return axios.patch(`https://zsrzpuksbzimwhxqlddb.supabase.co/rest/v1/leaves?id=eq.${id}`,data,{
        headers: {
        'apikey': API_KEY,
          'Authorization': `Bearer ${ACCESS_TOKEN}`,

        },
      });
  };