import { ReactNode } from 'react'
import { Box } from '@chakra-ui/layout'
import Sidbar from './sidebar'
import PlayerBar from './playerBar'

type Props = {
  children: ReactNode
}

const PlayerLayout = ({ children }: Props) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" left="0" width="250px">
        <Sidbar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        <Box height="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box position="absolute" bottom="0" left="0">
        <PlayerBar />
      </Box>
    </Box>
  )
}

export default PlayerLayout
