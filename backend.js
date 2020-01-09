import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import http from 'http'
import socketio from 'socket.io'
import fetch from 'node-fetch'

const spotifyCredentials = Buffer.from('aa74cce4969446f58a31435f8d08a1a3:905e25a7b365447684e3402bdeba33f0').toString('base64')

let app = express()
let server = http.Server(app)
let io = socketio(server)

var clients = ["effze","jfekl"]

app.use(bodyParser.json())

app.use(function(req, res, next){
    res.io = io
    next()
})

io.on('connection', function (socket) {
    // console.log('new user:' + socket.handshake.address)
    // socket.broadcast.emit('general', {user: 'user'})
    socket.on('add user', function (data) {
        console.log("[+] " + socket.handshake.address + " - " + data.username)
        socket.username = data.username
        socket.emit('user list', {
            users: clients
        })
        socket.broadcast.emit('user join', {
            username: socket.username
        })
        clients.push(data.username)
        // console.log(socket.handshake.address+" - "+data.user)
    })
    socket.on('disconnect', function () {
        console.log("[-] " + socket.handshake.address + " - " + socket.username)
        if(socket.username == null || socket.username == "") {
            console.log("not registered")
            return
        }
        clients.splice(clients.indexOf(socket.username), 1)
        socket.broadcast.emit('user left', {
            username: socket.username
        })
    })
    
    socket.on('general', function (data) {
        console.log(socket.username)
    })
})

app.get('/', (req, res) => {
    res.send('nothing to see here')
})

app.post('/api/getSpotifyAccessToken', async (req, res) => {
    if(req.body.code == null || req.body.uri == null) {
        console.log("no code/uri supplied")
        res.send("2")
        return
    }
    const resSpotify = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
            Authorization: `Basic ${spotifyCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${req.body.code}&redirect_uri=${req.body.uri}`,
    })
    const json = await resSpotify.json()
    // console.log(json)
    const newToken = json.access_token
    if(newToken == null || newToken == "") {
        console.log("error")
        res.send("2")
        return
    }
    res.json({access_token: newToken})
})

server.listen('8888', () => {
    console.log('Listening to port 8888')
})