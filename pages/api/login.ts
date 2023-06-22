import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import querystring from 'querystring';

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI;

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'user',
  });

  const loginUrl = `https://github.com/login/oauth/authorize?${params}`;

  res.status(200).json({ loginUrl });
};

export default loginHandler;
