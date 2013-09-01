# Makefile notes: - means ignore stop-on-error
ExternalDirectory=external
LocalDataDirectory=userData

install: 
	npm install

clean:
#Clean up bin and obj
	-rm -r bin obj
	-rm -r client/bin client/obj

	-rm *.js *.js.map
	-rm models/*.js models/*.js.map
	-rm routes/*.js routes/*.js.map
#Clean up solution files
	-rm *.v11.suo *.sln *.csproj.user
	-rm client/*.v11.suo client/*.sln client/*.csproj.user

reallyclean: clean
	-rm -r node_modules
	-rm -r $(ExternalDirectory)
	-rm -r $(LocalDataDirectory)


# Note: Redis is not currently used. 

#       Socket.io rooms rooms does the push notifications
#       to the web client. 
redis:
# This is necessary for cygwin
# http://derkan.blogspot.com/2013/04/redis-on-windows-cygwin-build.html
ifeq ($(shell uname),CYGWIN_NT-6.2-WOW64)
	export CC=i686-pc-cygwin-gcc-3.4.4  
endif		
	mkdir -p $(ExternalDirectory)
	cd $(ExternalDirectory);\
	wget http://download.redis.io/releases/redis-2.6.16.tar.gz;\
	tar xzf redis-2.6.16.tar.gz;\
# ifeq ($(shell uname),CYGWIN_NT-6.2-WOW64)
# Prepend a few files with headers to unbreak stuff
#   ... on second thought, f*ck it, i'll do my own pubsub

	make -C redis-2.6.16

mongodb:
# TODO: make sure mongodb is installed, somehow.

startLocalDatabase:
# Create data directory, then start database
	mkdir -p $(LocalDataDirectory)
	mongod --dbpath $(LocalDataDirectory)

startApp:
# Start app without debug
	node app.js

startAppDebug:
# Start app and debug server
	node --debug app.js &
	node-inspector 
