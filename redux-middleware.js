import socketIOClient from "socket.io-client"

const initSocketHandlers = (store, socket) => {
    socket.on('user list', data => {
        if (!Array.isArray(data.users) || data.users === undefined || data.users.length == 0) {    
            console.log("no users")
            return;
        }
        console.log('user list: ')
        data.users.forEach(e => {
            let user = e
            store.dispatch({ type: 'SOCKET_USER_JOIN', user })
        });
    })

    socket.on('user left', data => {
        let user = data.username
        console.log("LEFT " + user)
        store.dispatch({ type: 'SOCKET_USER_LEFT', user })
    })

    socket.on('user join', data => {
        let user = data.username
        console.log("JOIN " + user)
        store.dispatch({ type: 'SOCKET_USER_JOIN', user })
    })
}

const socketMiddleware = () => {
    let socket = null
    
    return store => next => action => {
        switch (action.type) {
        case 'S_CONNECT':
            if(action.user == undefined) {
                console.error('Socket Error: no username provided')
                break
            }
            if (socket !== null) {
                socket.close()
            }

            // connect to the remote host
            socket = socketIOClient("http://173.212.236.123:8888", {forceNode: true})
            
            initSocketHandlers(store, socket)

            socket.emit('add user', {
                username: action.user
            })
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
        default:
            console.log('the next action:', action)
            return next(action)
        }
    }
}



export default socketMiddleware()