## To Start Server for Development

### Start Redis Server and Redis CLI on Windows

1.  If not installed, install Redis from [https://redislabs.com/ebook/appendix-a/a-3-installing-on-windows/a-3-2-installing-redis-on-window/](https://redislabs.com/ebook/appendix-a/a-3-installing-on-windows/a-3-2-installing-redis-on-window/)
2.  Start Redis Server:
    > a) - navigate to the server folder with `cd server`
    > b) - Navigate to the folder where you installed redis. Ex: `cd ../../../../Programs/redis-2.4.5-win32-win64/64bit`
    > c) - And enter `redis-server` to start the server
    > d) - Leave this terminal open until you wish to shut down the server with CTRL + C and enter `y`
3.  Open new terminal window
4.  Repeat steps 2a and 2b
5.  Enter `redis-cli` to open the redis CLI
    > Now you can use `get [key-name]` to access any redis variables you set

### Start the Server

1.  Create a .env file in the root server directory and add `PORT=5005`
2.  In a new terminal window navigate to server folder with `cd server`
3.  Install node modules with `yarn`
4.  Enter `yarn run start` to start server

---

## Redis-CLI commands

- To empty the redis db enter `flushdb`
- To see a value enter `get [key-name]`
  > - A string with all the current games is stored under `games`
  > - Games are represented by a comma separated string of incrementing integers starting at 1
  > - To see all games enter `get games` (When in doubt, for testing purposes, the latest/highest game will be the current game)
  > - Game specific values are named using the structure `game#.value-name`
  > - To retrieve the list of player x's moves for game 1 enter `get 1.xMoves`
- To stop redis server press CTRL + C and enter Y
