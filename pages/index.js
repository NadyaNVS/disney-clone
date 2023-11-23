import Feed from "@/components/Feed";
import NavBar from "@/components/NavBar";
import { gql, GraphQLClient } from "graphql-request";
import Image from "next/image";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const client = new GraphQLClient(url, {
    headers: {
      Autorization: `Bearer ${process.env.GRAPH_CMS_TOKEN}`,
    },
  });

  const videosQuery = gql`
    query Videos {
      videos {
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

  const accountQuery = gql`
    query {
      account(where: { id: "clnluqc7g2i230aw5k60vr6dg" }) {
        username
        avatar {
          url
        }
      }
    }
  `;
  const data = await client.request(videosQuery);
  const videos = data.videos;
  const accountData = await client.request(accountQuery);
  const account = accountData.account;
  return {
    props: {
      videos,
      account,
    },
  };
};

const Home = ({ videos, account }) => {
  const randomVideo = (videos) => {
    const randomIndex = videos[Math.floor(Math.random() * videos.length)];
    return randomIndex;
  };

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const unSeenVideos = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen == null);
  };

  return (
    <>
      <NavBar account={account} />
      <div className="app">
        <div className="main-video">
          <Image
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
            className="main-img"
            fill
          />
        </div>
        <div className="video-feed">
          <Feed genre={"Recommended for you"} videos={unSeenVideos(videos)} />
          <Feed genre={"Classic"} videos={filterVideos(videos, "classic")} />
          <Feed genre={"Family"} videos={filterVideos(videos, "family")} />
          <Feed genre={"Action"} videos={filterVideos(videos, "action")} />
          <Feed genre={"Thriller"} videos={filterVideos(videos, "thriller")} />
          <Feed genre={"Drama"} videos={filterVideos(videos, "drama")} />
          <Feed genre={"Animals"} videos={filterVideos(videos, "animals")} />
          <Feed genre={"Marvel"} videos={filterVideos(videos, "marvel")} />
        </div>
      </div>
    </>
  );
};

export default Home;
