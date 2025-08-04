import axios from 'axios';

const BACKEND = 'http://localhost:5000/api';

export const getFiles = async (owner, repo) =>
  axios.get(`${BACKEND}/github/files`, { params: { owner, repo } });

export const getFileContent = async (owner, repo, path) =>
  axios.get(`${BACKEND}/github/file`, { params: { owner, repo, path } });

export const generateTests = async (code, framework) =>
  axios.post(`${BACKEND}/ai/generate`, { code, framework });
