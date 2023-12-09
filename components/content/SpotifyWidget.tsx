import { Spotify } from "react-spotify-embed";

export default function SpotifyWidget({ url }: { url: string }): JSX.Element {
  if (!url || !url.startsWith("https://open.spotify.com/")) {
    return <div>Invalid Spotify URL: {url}</div>;
  }

  return (
    <div className="w-full p-4 h-96">
      <Spotify link={url} width="100%" height="400" />
    </div>
  );
}
