 ## To Start Server for Development
 1. Start Redis Server:
> - From server folder `../../../../Programs/redis-2.4.5-win32-win64/64bit`
> - And enter `redis-server`
 2. Navigate back to the server folder
 3. Enter `yarn run start` to start server

 ## To clear redis-server
from redis folder enter `redis-cli flushdb`.  To clear all redis databases `redis-cli flushall`

Set up Express to store game-state in redis cache via express-session


 ### Notes:
 - Currently each client instance generates an automatic socket connection
 - https://redislabs.com/solutions/use-cases/caching/