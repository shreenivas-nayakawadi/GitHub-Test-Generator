const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Get file tree for a repo
router.get('/files', async (req, res) => {
  const { owner, repo } = req.query;
  try {
    const api = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
    const resp = await axios.get(api, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    const files = resp.data.tree.filter(item =>
      item.type === 'blob' &&
      (item.path.endsWith('.js')|| item.path.endsWith('.ts')|| item.path.endsWith('.java')|| item.path.endsWith('.c')|| item.path.endsWith('.cpp')|| item.path.endsWith('.cs')|| item.path.endsWith('.php')|| item.path.endsWith('.rb')|| item.path.endsWith('.go')|| item.path.endsWith('.swift')|| item.path.endsWith('.kt')|| item.path.endsWith('.rs') || item.path.endsWith('.py') )) 
      .map(f => f.path);
    res.json({ files });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Fetch raw file contents
router.get('/file', async (req, res) => {
  const { owner, repo, path } = req.query;
  try {
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const { data } = await axios.get(api, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    const buff = Buffer.from(data.content, 'base64').toString('utf-8');
    res.json({ content: buff });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
