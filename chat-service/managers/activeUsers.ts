import * as UUID from 'uuid/v4'

interface Room {
  id: string,
  users: string[]
}

interface ActiveUser {
  name: string,
  id: number
  socket: SocketIO.Socket
  rooms: string[]
}

class ActiveUserManager {
  private rooms: {
    [key: string]: Room
  }
  private activeUsers: {
    [key: string]: ActiveUser
  }

  constructor() {
    this.activeUsers = {}
    this.rooms = {}
  }

  public addActiveUser(user: ActiveUser) {
    this.activeUsers[user.id] = user
    return this.activeUsers[user.id]
  }

  public enterRoomForTwo(userId: string, recipientId: string) {
    const activeRoom = this.activeUsers[userId].rooms.find(room => {
      const roomUsers = this.rooms[room].users || []
      return roomUsers.length === 2
        && roomUsers.includes(userId)
        && roomUsers.includes(recipientId)
    })

    return activeRoom
      ? activeRoom
      : this.createRoom([userId, recipientId]).id
  }

  // TODO: Sync created rooms with database
  private createRoom(users: string[]) {
    const roomId = UUID()
    this.rooms[roomId] = {
      id: roomId, users
    }

    users.forEach(userId => {
      const user = this.activeUsers[userId]
      user.rooms.push(roomId)
      user.socket.join(roomId)
    })

    return this.rooms[roomId]
  }
}

const ActiveUsers = new ActiveUserManager()

export { ActiveUser, ActiveUsers }