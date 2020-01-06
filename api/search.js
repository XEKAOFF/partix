const apiPrefix = 'https://api.spotify.com/v1';

export default async ({
  offset,
  limit,
  q,
  token,
}) => {
  const uri = `${apiPrefix}/search?type=track&limit=${limit}&offset=${offset}&q=${encodeURIComponent(q)}`;
  // console.log('search begin, uri =', uri, 'token =', token);
  const res = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  const json = await res.json();
//   console.log('search got json', json);

  // console.log(res);
  if (!res.ok) {
    return [];
  }

  const {
    tracks: {
      items,
    }
  } = json;
  // const items = json.tracks.items;
  return items.map(item => ({
    uri: item.uri,
    title: item.name,
    artist: item.artists[0].name,
    imageUri: item.album.images
      ? item.album.images[0].url
      : undefined
  }));
};