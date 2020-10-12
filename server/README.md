 ## To Start Server for Development
 1. Start Redis Server:
> - From server folder `../../../../Programs/redis-2.4.5-win32-win64/64bit`
> - And enter `redis-server`
 2. Navigate back to the server folder
 3. Open Ubuntu (WSL2)
 4. Enter `sudo service redis-server restart` to ensure redis-server is running
  - Now enter `redis-cli` to open the redis CLI
 5. Navigate to server folder and enter `yarn run start` to start server

 ## Redis-CLI commands
 - To empty the redis db enter `flushdb`
 - To get everything in a hashmaps enter `hgetall games`
 - To get the key for player 1 of game 1 enter `hmget games 1.p1`
 - To stop redis server enter `sudo service redis-server stop`


 ### Notes:
 - Currently each client instance generates an automatic socket connection
 - https://redislabs.com/solutions/use-cases/caching/