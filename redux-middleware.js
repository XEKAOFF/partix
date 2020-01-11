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

    socket.on('already exist', () => {
        store.dispatch({ type: 'S_DISCONNECT' })
        store.dispatch({ type: 'ERROR_PARTYNAME' })
    })
}

const socketMiddleware = () => {
    let socket = null
    
    return store => next => action => {
        switch (action.type) {
        case 'S_CONNECT':
            if(action.data.user == undefined) {
                console.error('Socket Error: no username provided')
                break
            }
            let user = action.data.user
            if (socket !== null) {
                socket.close()
            }

            // connect to the remote host
            socket = socketIOClient("http://173.212.236.123:8888", {forceNode: true})
            
            initSocketHandlers(store, socket)

            socket.emit('add user', {
                username: user
            })

            console.log(action.data.type)
            if(action.data.type == 'create') {
                socket.emit('create', action.data.room)
            } else if (action.data.type == 'join') {
                socket.emit('join', action.data.room)
            }

            store.dispatch({ type: 'SOCKET_USER_JOIN', user })
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
            return next(action)
        default:
            console.log('the next action:', action.type)
            return next(action)
        }
    }
}



export default socketMiddleware()