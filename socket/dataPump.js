module.exports = (io) => {
  console.log('We\'ve required dataFeed.js')
  // Make with the data making
  const feedSocket = io.of('/feed')
  feedSocket.on('connection', (socket) => {
    console.log(`We have a namespace connection ${socket.id}`)
    feedSocket.to(socket.id).emit('response', { id: socket.id })

    socket.on('join data feed', (d) => {
      console.log(`Joined data feed`, d)
      socket.join(d.roomId)
  
      feedSocket.to(d.roomId).emit('join success', `Successfully joined ${d.roomId}`)
    })

    socket.on('leave data feed', d => {
      console.log(`Leaving ${d.roomId}`)
      socket.leave(d.roomId)
    })
  })
}