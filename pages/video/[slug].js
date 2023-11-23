import { gql, GraphQLClient } from "graphql-request";
import Link from "next/link";
import { useState } from "react";

export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const client = new GraphQLClient(url, {
    headers: {
      Autorization: `Bearer ${process.env.GRAPH_CMS_TOKEN}`,
    },
  });
  const pageSlug = pageContext.query.slug;

  const query = gql`
    query Video($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;
  const variables = {
    pageSlug,
  };

  const data = await client.request(query, variables);
  const video = data.video;

  return {
    props: {
      video,
    },
  };
};

const changeToSeen = async (slug) => {
  await fetch("/api/changeToSeen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  });
};

const Video = ({ video }) => {
  const [watching, setWatching] = useState(false);
  const handelOnPlay = () => () => {
    changeToSeen(video.slug);
    watching ? setWatching(false) : setWatching(true);
  };
  console.log(video);
  return (
    <>
      {!watching && (
        <div className="video">
          <div className="video-image__wrapper">
            <img
              className="video-image"
              src={video.thumbnail.url}
              alt={video.title}
            />
            <div className="video-info">
              <p>{video.tags.join(", ")}</p>
              <p>{video.description}</p>
              <div className="video-buttons">
                <Link href="/" className="video-back">
                  go back
                </Link>
                <button
                  className="video-button"
                  onClick={handelOnPlay(video.slug)}
                >
                  PLAY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {watching && (
        <video width="100%" controls>
          <source src={video.mp4.url} type="video/mp4"></source>
        </video>
      )}
      <div
        className="video-footer"
        onClick={() => (watching ? setWatching(false) : null)}
      ></div>
    </>
  );
};
export default Video;
