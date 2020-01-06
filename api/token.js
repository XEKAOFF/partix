  
const apiPrefix = 'https://accounts.spotify.com/api';
const base64credentials = 'YWE3NGNjZTQ5Njk0NDZmNThhMzE0MzVmOGQwOGExYTM6YzEyNGY2MjIyZWNkNGY4MmI0ZDZmMjQxNDA5MzdkZjk=';

export default async ({code, uri}) => {
  console.log('token begin');
  const res = await fetch(`${apiPrefix}/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${uri}`,
  });
  const json = await res.json();
  const newToken = json.access_token;
  console.log('token is', newToken);
  return newToken;
}