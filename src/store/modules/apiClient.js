const client = new ActionheroClient({url: '//' + window.location.hostname + ':' + 8081});

client.on('connected', function() {
  console.log('connected!');
});
client.on('disconnected', function() {
  console.log('disconnected :(');
});

client.on('error', function(error) {
  console.log('error', error.stack);
});
client.on('reconnect', function() {
  console.log('reconnect');
});
client.on('reconnecting', function() {
  console.log('reconnecting');
});

// client.on('message',      function(message){ console.log(message) })

client.on('alert', function(message) {
  alert(JSON.stringify(message));
});
client.on('api', function(message) {
  alert(JSON.stringify(message));
});

client.on('welcome', function(message) {
  console.log('welcome appendMessage?');
});

client.connect(function(error, details) {
  if (error != null) {
    console.log(error);
  } else {
    client.action('createChatRoom', {name: 'tick'}, function(data) {
      console.log(data);
      client.roomAdd('tick', function(error) {
        if (error) {
          console.log(error);
        }
      });
    });
    client.roomAdd('tick', function(error) {
      if (error) {
        console.log(error);
      }
    });
  }
});

export default function getClient() {
  return client;
}
