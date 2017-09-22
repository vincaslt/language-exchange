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

  public getActiveRoomById(userId: string, roomId: string) {
    const activeRooms = this.getActiveRooms(userId)
    return Object.values(activeRooms).find(room => room.id === roomId)
  }

  public getActiveRooms(userId: string) {
    const activeUser = this.activeUsers[userId]

    if (activeUser) {
      return activeUser.rooms.map(roomId => {
        const room = this.rooms[roomId]
        const roomUsers = room.users || []
        if (roomUsers.includes(userId)) {
          return room
        }
        return null
      }).filter(room => !!room)
    }
    return []
  }

  public enterRoomForTwo(userId: string, recipientId: string) {
    const activeRooms = this.getActiveRooms(userId)
    const activeRoom = activeRooms.find(room => {
      const roomUsers = room.users || []
      return roomUsers.length === 2 && roomUsers.includes(recipientId)
    })
    
    return activeRoom
      ? activeRoom
      : this.createRoom([userId, recipientId])
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