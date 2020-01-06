const endpoint = 'https://api.spotify.com/v1/me/player/play';

export default async ({token, trackid}) => {
  const data = {
    uris: [
      trackid
    ]
  };
  
  const res = await fetch(`${endpoint}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json;
}