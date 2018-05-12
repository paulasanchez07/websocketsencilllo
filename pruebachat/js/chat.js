var contador = 0;
$(document).ready(function(){
	//crea un nuevo objeto WebSocket.
	var wsUri = "ws://10.78.148.60:9000/pruebachat/php/server.php"; //direccion del servidor 
	websocket = new WebSocket(wsUri); 	
	
	websocket.onopen = function(ev) { // Conexion Abierta 
		$('#contenedor_chat').append("<div class=\"mensaje_sistema\">Conectado!</div>"); //Notificacion al usuario
	}

	$('#btnEnviar').click(function(){ //use clicks message send button
		contador +=1;	
		var miMensaje = "Mensaje " + contador +" enviado..." ; //get message text
		
		//prepare json data
		var msg = {
		message: miMensaje
		};
		//convert and send data to server
		websocket.send(JSON.stringify(msg));
	});
	
	//#### Message received from server?
	websocket.onmessage = function(ev) {
		var msg = JSON.parse(ev.data); //PHP sends Json data
		var umsg = msg.message; //message text

		$('.contenedor_chat').append("<div><span>mensaje_usuario>"+umsg+"</span></div>");
		
		/*var objDiv = document.getElementById("contenedor_chat");
		objDiv.scrollTop = objDiv.scrollHeight;*/
	};
	
	websocket.onerror	= function(ev){$('#contenedor_chat').append("<div class=\"system_error\">Ocurrio un error - "+ev.data+"</div>");}; 
	websocket.onclose 	= function(ev){$('#contenedor_chat').append("<div class=\"mensaje_sistema\">Conexion cerrada</div>");}; 
});

