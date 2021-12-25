import GradiantLayout from "../../components/gradiantLayout";
import SongTable from "../../components/songsTable";
import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/validateRoute";

const getBgColor = (id) => {
  const colors = [
    "red",
    "green",
    "blue",
    "gray",
    "yellow",
    "purple",
    "teal",
    "cyan",
  ];
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
  const color = getBgColor(playlist.id);
  return (
    <GradiantLayout
      color={color}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradiantLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;
  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: { playlist },
  };
};

export default Playlist;
