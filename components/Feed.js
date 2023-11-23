import Card from "./Card";

const Feed = ({ genre, videos }) => {
  console.log(videos);
  return (
    <div className="feed">
      <h3>{genre}</h3>
      <div className="feed-wrapper">
        {videos.map((video) => (
          <div key={video.id} className="feed-card__wrapper">
            <a href={`/video/${video.slug}`} className="video-link">
              <Card thumbnail={video.thumbnail} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
