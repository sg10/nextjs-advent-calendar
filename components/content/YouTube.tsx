export default function YouTube({ url }: { url: string }) {
  const getYouTubeId = (url: string): string | null => {
    // Handle different YouTube URL patterns
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^[a-zA-Z0-9_-]{11}$/, // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const videoId = getYouTubeId(url);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";

  if (!embedUrl) {
    return <div>Invalid YouTube URL</div>;
  }

  return (
    <div>
      <iframe
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        width="100%"
        className="aspect-video"
      />
    </div>
  );
}
