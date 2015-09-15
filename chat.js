net = require('net');

var sockets = []; 

var s = net.Server(function(socket){
  sockets.push(socket);
  socket.on('data', function(d){
    //iterate over sockets and broadcast
    for(var i = 0; i < sockets.length; i++){
      if (sockets[i] == socket) continue; //skip over itself
      sockets[i].write(d);
    }
  });
  //when people disconnect, remove dead sockets. cannot write to dead sockets
  socket.on('end', function(){
    //remove itself
    var i = sockets.indexOf(socket);
    sockets.splice(i, 1);
  }); 
});

s.listen(8000);

//when data arrives, broadcast the data to our pool of sockets
