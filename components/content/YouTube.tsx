export default function YouTube({ url }: { url: string }) {
  return (
    <div>
      <iframe
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        width="100%"
        className="aspect-video"
      />
    </div>
  );
}
