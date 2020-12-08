## To Start Server for Development

1.  Start Redis Server:
    > a) - From server folder `cd ../../../../Programs/redis-2.4.5-win32-win64/64bit`
    > b) - And enter `redis-server`
2.  Open new terminal window
3.  Repeat step 1a
4.  Enter `redis-cli` to open the redis CLI
    > Now you can use `get KEY` to access any redis variables you set
5.  Open new terminal window
6.  Navigate to server folder and enter `yarn run start` to start server

## Redis-CLI commands

- To empty the redis db enter `flushdb`
- To get everything in a hashmaps enter `hgetall games`
- To get the key for player 1 of game 1 enter `hmget games 1.p1`
- To stop redis server enter `sudo service redis-server stop`

### Notes:

- Currently each client instance generates an automatic socket connection
- https://redislabs.com/solutions/use-cases/caching/

Store data in redis as objects that I stringify? JSON.stringify?
