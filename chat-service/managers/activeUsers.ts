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

  public getActiveRoom(userId: string) {
    const activeRoom = this.activeUsers[userId].rooms.find(room => {
      const roomUsers = this.rooms[room].users || []
      return roomUsers.includes(userId)
    })
    return activeRoom ? this.rooms[activeRoom] : undefined
  }

  public enterRoomForTwo(userId: string, recipientId: string) {
    const activeRoom = this.getActiveRoom(userId)
    if (activeRoom) {
      const activeRoomUsers = activeRoom.users || []
      if (activeRoomUsers.length === 2 && activeRoomUsers.includes(recipientId)) {
        return activeRoom
      }
    }
    
    return this.createRoom([userId, recipientId])
  }

  // TODO: Sync created rooms with database
  private createRoom(users: string[]) {
    const roomId = UUID()
    this.rooms[roomId] = {
      id: roomId, users
    }
    // TODO: handle exception when no active user
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