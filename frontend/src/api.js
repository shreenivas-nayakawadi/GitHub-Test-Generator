import axios from 'axios';


const BACKEND = import.meta.env.VITE_BACKEND_URL

export const getFiles = async (owner, repo) =>
  axios.get(`${BACKEND}/api/github/files`, { params: { owner, repo } });

export const getFileContent = async (owner, repo, path) =>
  axios.get(`${BACKEND}/api/github/file`, { params: { owner, repo, path } });

export const generateTests = async (code, framework) =>
  axios.post(`${BACKEND}/api/ai/generate`, { code, framework });
