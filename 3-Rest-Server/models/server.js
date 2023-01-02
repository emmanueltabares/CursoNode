const express = require('express')
const cors = require('cors')

const users = require('../routes/user')


class Server {
    constructor(){
      this.app = express();
      this.port = process.env.PORT;
      this.usersPath = '/api/users'

      this.middleware();
      this.routes();
    }

    middleware() {
      this.app.use(cors())
      this.app.use( express.json() )
      this.app.use( express.static('public') );
    }

    routes() {
      this.app.use(this.usersPath, users)
    }

    listen() {
      this.app.listen(this.port, () => {
          console.log('App listen on port', this.port);
      })
    }
}

module.exports = Server