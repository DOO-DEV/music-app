import {
  Box,
  Table,
  Thead,
  Th,
  Tbody,
  Td,
  Tr,
  IconButton
} from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { formatDate, formatTime } from '../lib/formaters'

const SongTable = ({ songs }) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs)
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)
  const setIsPlaying = useStoreActions((store: any) => store.setPlaying)
  const isPlaying = useStoreState((store: any) => store.isPlaying)
  const handlePlay = (activeSong?) => {
    setIsPlaying(true)
    if (!isPlaying) setActiveSong(activeSong || songs[0])
    playSongs(songs)
  }

  return (
    <Box bg="transparent" paddingX="50px" color="white">
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="30px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            size="lg"
            isRound
            aria-label="play"
            colorScheme="green"
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255, 0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                onClick={() => handlePlay(song)}
                key={song.id}
                sx={{
                  transition: 'all 0.3',
                  '&:hover': {
                    bg: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
                cursor="pointer"
              >
                <Td>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default SongTable
