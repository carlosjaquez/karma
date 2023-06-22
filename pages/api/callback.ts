import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import querystring from 'querystring';

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI;

const callbackHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
    }, {
      headers: {
        Accept: 'application/json',
      },
    });

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const user = userResponse.data;

    console.log('Github User: ', user);

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).end();
  }
};

export default callbackHandler;
