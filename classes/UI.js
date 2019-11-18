/* global Socket */

class UI {
    
    static login() {
        var username = UI.username.value;
        Socket.init(username);
    }
    
    static setupEvents() {
        UI.username = document.getElementById("username");
        UI.username.addEventListener("keyup", (event) => {
            //Login on enter key press
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("login").click();
            }
        });        
    }
}

