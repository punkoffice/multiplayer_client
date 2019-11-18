/* global Avatar */
/* global Input */
/* global Player */

class Socket {
    
    static init(username) {
        Socket.ws = new WebSocket(Socket.host);

        Socket.ws.onopen = () => {
            console.log("Connected");
            Avatar.username = username;
            
            //Authenticate with server by sending username
            Socket.ws.send(`{"command":"username","data":"${username}"}`);
        };

        Socket.ws.onmessage = (msg) => {
            var json = JSON.parse(msg.data);
            switch(json.command) {
                case "auth":
                    if (json.data === "true") {
                        console.log("Authenticated by server");
                        Avatar.init();
                        Input.init();     
                        Avatar.send();
                    }
                    break;
                case "playerGone":
                    Player.remove(json.data);
                    break;
                case "playerMoved":
                    Player.move(json.data);
                    break;
            }
        };
        Socket.ws.onclose = () => {
            alert("Connection closed");
        };
        Socket.ws.onerror = (e) => {
            console.log("Error");
        };
    }
};

Socket.host = "ws://localhost:5000"; //Use "wss" if connecting to secure server