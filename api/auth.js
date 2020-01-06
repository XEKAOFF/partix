const apiPrefix = 'https://accounts.spotify.com/authorize';

export default async () => {
  const uri = `${apiPrefix}?client_id=aa74cce4969446f58a31435f8d08a1a3&response_type=code&redirect_uri=${encodeURIComponent("PartixPrototype://home")}&scope=user-modify-playback-state%20user-read-currently-playing`;
  // console.log('search begin, uri =', uri, 'token =', token);
  const res = await fetch(uri, {
    method: 'GET',
  });
  const json = await res.json();
//   console.log('search got json', json);

  // console.log(res);
  if (!res.ok) {
    return [];
  }

  return json
  
};