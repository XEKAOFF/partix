import socketIOClient from "socket.io-client"

const socketMiddleware = () => {
    let socket = null
    
    return store => next => action => {
        switch (action.type) {
        case 'S_CONNECT':
            if (socket !== null) {
                socket.close()
            }

            // connect to the remote host
            socket = socketIOClient("http://173.212.236.123:8888", {forceNode: true})

            // // websocket handlers
            // socket.onmessage = onMessage(store)
            // socket.onclose = onClose(store)
            // socket.onopen = onOpen(store)
            console.log('[SOCKET] (+)')
            break
        case 'S_DISCONNECT':
            if (socket !== null) {
                socket.close()
            }
            socket = null
            console.log('[SOCKET] (-)')
            break
        case 'NEW_MESSAGE':
            console.log('sending a message', action.msg)
            socket.send(JSON.stringify({ command: 'NEW_MESSAGE', message: action.msg }))
            break
        default:
            console.log('the next action:', action)
            return next(action)
        }
    }
}



export default socketMiddleware()