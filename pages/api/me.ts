import { validateRoute } from '../../lib/validateRoute'
import prisma from '../../lib/prisma'

export default validateRoute(async (req, res, user) => {
  const playlistCount = await prisma.playlist.count({
    where: {
      userId: user.id
    }
  })
  res.json({ ...user, playlistCount })
})
