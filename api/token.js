const endpoint = 'http://173.212.236.123:8888/api/getSpotifyAccessToken';

export default async ({code, uri}) => {
  console.log('token begin');
  var payload = {
      code: code,
      uri: uri
  }
  const res = await fetch(`${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  const newToken = json.access_token;
  console.log('token is', newToken);
  return newToken;
}