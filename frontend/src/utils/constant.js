let API_URL = import.meta.env.VITE_API_URL || "https://job-portal-1lbd.onrender.com/api/v1";
if (API_URL && !/^https?:\/\//i.test(API_URL)) {
    API_URL = `https://${API_URL}`;
}

export const USER_API_END_POINT = `${API_URL}/user`;
export const JOB_API_END_POINT = `${API_URL}/job`;
export const APPLICATION_API_END_POINT = `${API_URL}/application`;
export const COMPANY_API_END_POINT = `${API_URL}/company`;
