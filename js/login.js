var loginForm = document.getElementById("formLogin")

loginForm.onsubmit = function ( ){

	var xhttp = new XMLHttpRequest();
	var url = "http://127.0.0.1:8000/tecnicos/?format=json";


	xhttp.onreadystatechange = function() {
			if( this.readyState == 4 && this.status == 200 ){
					console.log( this.responseText );
					var data = JSON.parse( this.responseText );
					login( data.results );
					console.log(data)
			}
	}
	xhttp.open( 'GET', url, true );
	xhttp.send();

	var login = function ( tecnicos ){

		var usuario = document.getElementById("user");
		var password = document.getElementById("contraseña")

		for ( let tecnico of tecnicos ){

			if( usuario.value === tecnico.correo && password.value === tecnico.contraseña ){
				alert("Credenciales correctas, iniciando sesión...");
				window.location.assign("listado.html");
				localStorage.setItem( 'usuarioLogueado', JSON.stringify( tecnico.correo ) );
				localStorage.setItem( 'estadoUsuario', JSON.stringify( "logueado" ) );
			}
			else{
				// alert("Usuario o contraseña incorrectos...");
				window.location.assign("index.html");

			}

		}

	}

}