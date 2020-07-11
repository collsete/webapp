<?php

require_once 'vendor/autoload.php';

$app = new \Slim\Slim();

$db = new mysqli("localhost","root","","libreria_web",3308);


//Configuraciion de cabeceras
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

// Hasta aca funciona 

//Listar libros *Funcionando*
$app -> get('/libros', function() use($db, $app){
			$sql ='SELECT * FROM libros ORDER BY rating DESC;';
			$query = $db -> query($sql);
			$libros = array();

			while ($libro = $query->fetch_assoc()) {
					$libros[] = $libro;
			}
				$result = array(
					"status" => 'success',
					"code" => 200,
					"data" =>  $libros
				);

				echo json_encode($result);
});

//Devolver un  libro por id  *Funcionando*
$app -> get ('/libros/:id', function($id) use($db, $app){
			$sql = 'SELECT * FROM libros WHERE id = '.$id;
			$query = $db -> query($sql);
			
			$result = array(
				'status' => 'error',
				'code'	 => 404,
				'message' => 'libro no disponible'
			);

			if($query->num_rows == 1){
				$libro = $query -> fetch_assoc();

				$result = array(
					'status'  => 'success',
					'code' => 200,
					'data' => $libro
				);
			}
			echo json_encode($result);
});
//Eliminar libros *Funcionando*
$app -> get('/eliminar-libro/:id', function($id) use($db, $app){
				$sql = 'DELETE FROM libros WHERE id ='.$id;
				$query = $db -> query($sql);

				if($query){

				$result = array(
					'status'  => 'success',
					'code' => 200,
					'message' => 'Se ha eliminado el libro'
				);

				}else{

					$result = array(
					'status'  => 'error',
					'code' => 404,
					'message' => 'El libro no ha sido eliminado correctamente'
				);
			}
			echo json_encode($result);
});

/* 

EJEMPLO DE UN OBJ JSON PARA GUARDAR
 {"nombre":"yano","description":"Cambio","editorial":"santillana","categoria":"romance","stock":"10","autor":"San telmo","precio":"250","rating":"9"} */

//Actualizar libro   *Funcionando*  
$app -> post('/update-libro/:id', function($id) use($db, $app){
	$json = $app->request->post('json');
	$data = json_decode($json, true);


	$sql = "UPDATE libros SET ".
	"nombre='{$data["nombre"]}',".
	"description='{$data["description"]}',".
	"editorial='{$data["editorial"]}',".
	"categoria='{$data["categoria"]}',".
	"stock='{$data["stock"]}',".
	"rating = '{$data["rating"]}',".
	"autor = '{$data["autor"]}',";

	
	if(isset($data['imagen'])){
	$sql .=	"imagen = '{$data["imagen"]}',";
	}

	$sql .= "precio = '{$data["precio"]}' WHERE id = {$id}";

	$query = $db->query($sql);

		if($query){

				$result = array(
					'status'  => 'success',
					'code' => 200,
					'message' => 'El libro ha actualizado'
				);

				}else{

					$result = array(
					'status'  => 'error',
					'code' => 404,
					'message' => 'El libro no ha sido actualizado correctamente'
				);
			}

			echo json_encode($result);

});
//Por alguna razón no funciona
$app-> post ('/subir-imagen', function() use($db, $app){

			$result = array(
					'status'  => 'error',
					'code' => 404,
					'message' => 'La imagen no ha podido subirse'
				);

			if(isset($_FILES['uploads'])){
				$piramideUploader = new PiramideUploader();

				$upload = $piramideUploader->upload('image',"uploads","uploads", array('image/jpeg','image/png','image/gif'));
				$file = $piramideUploader->getInfoFile();
				$file_name = $file['complete_name'];

				if(isset($upload) && $upload["uploaded"] == false){

					$result = array(
					'status'  => 'error',
					'code' => 404,
					'message' => 'La imagen no ha podido subirse'
				);
				}else{

					$result = array(
					'status'  => 'success',
					'code' => 200,
					'message' => 'La imagen se subio',
					'filename'  => $file_name
				);
				}
			}
			echo json_encode($result);
});



//Guardar productos *Funcionando*
$app -> post ('/savelibro', function() use($app, $db){
		$json = $app -> request -> post ('json');
		$data = json_decode($json, true);

if (!isset($data['nombre'])){
	$data['nombre'] = null;
}
if (!isset($data['description'])){
	$data['description'] = null;
}
if (!isset($data['precio'])){
	$data['precio'] = null;
}
if (!isset($data['imagen'])){
	$data['imagen'] = null;
}
if (!isset($data['editorial'])){
	$data['editorial'] = null;
}
if (!isset($data['categoria'])){
	$data['categoria'] = null;
}
if (!isset($data['stock'])){
	$data['stock'] = null;
}
if (!isset($data['rating'])){
	$data['rating'] = null;
}
if (!isset($data['autor'])){
	$data['autor'] = null;
}

		$query = "INSERT INTO libros VALUES(NULL,".
					"'{$data['nombre']}',".
					"'{$data['description']}',".
					"'{$data['precio']}',".
					"'{$data['imagen']}',".
					"'{$data['editorial']}',".
					"'{$data['categoria']}',".
					"'{$data['stock']}',".
					"'{$data['rating']}',".
					"'{$data['autor']}'".
					");";

			$insert = $db -> query($query);

			if ($insert){
				$result = array(
					"status" => 'success',
					"code" => 200,
					"message" =>  'producto creado correctamente'
				);
			}
				echo json_encode($result);
		
});
// Sacar los mejores 3
$app -> get('/libro-best', function() use($db, $app){
			$sql ='SELECT * FROM libros ORDER BY rating DESC LIMIT 4;';
			$query = $db -> query($sql);
			$libros = array();

			while ($libro = $query->fetch_assoc()) {
					$libros[] = $libro;
			}
				$result = array(
					"status" => 'success',
					"code" => 200,
					"data" =>  $libros
				);

				echo json_encode($result);
});

//Libros por categorias
$app -> get('/filter/:categoria', function($categoria) use($db, $app){
			$sql ="SELECT * FROM libros WHERE categoria ='$categoria'";
			$query = $db -> query($sql);
			$libros = array();

			while ($libro = $query->fetch_assoc()) {
					$libros[] = $libro;
			}
				$result = array(
					"status" => 'success',
					"code" => 200,
					"data" =>  $libros
				);

				echo json_encode($result);
});

// mostrar los libros del carrito
$app -> get('/carrito', function() use($db, $app){
		$sql ='SELECT libros.* FROM libros Inner Join carrito ON libros.id = carrito.idLibro WHERE cantidad > 0';
			$query = $db -> query($sql);
			$libros = array();

			while ($libro = $query->fetch_assoc()) {
					$libros[] = $libro;
			}
				$result = array(
					"status" => 'success',
					"code" => 200,
					"data" =>  $libros
				);
				echo json_encode($result);
});
// Ingresar el id del libro desde la tabla libros
$app -> post ('/carrito/:id', function($id) use($db, $app){
			$sql = 'INSERT INTO carrito (idLibro) SELECT id FROM libros WHERE id ='.$id;
			$query = $db -> query($sql);
});


//Eliminar libros *Funcionando*
$app -> get('/delete/:id', function($id) use($db, $app){
				$sql = 'DELETE FROM carrito WHERE idLibro ='.$id;
				$query = $db -> query($sql);

				if($query){

				$result = array(
					'status'  => 'success',
					'code' => 200,
					'message' => 'Se ha eliminado el libro'
				);

				}else{

					$result = array(
					'status'  => 'error',
					'code' => 404,
					'message' => 'El libro no ha sido eliminado correctamente'
				);
			}
			echo json_encode($result);
});


//consultar cantidad libro
$app -> get ('/cantidad/:id', function($id) use($db, $app){
			$sql = 'SELECT * FROM carrito WHERE idLibro = '.$id;
			$query = $db -> query($sql);
			
			$result = array(
				'status' => 'error',
				'code'	 => 404,
				'message' => 'libro no disponible'
			);

			if($query->num_rows == 1){
				$libro = $query -> fetch_assoc();

				$result = array(
					'status'  => 'success',
					'code' => 200,
					'data' => $libro
				);
			}
			echo json_encode($result);
});

//Sumar a la cantidad 
$app -> post('/aumentar/:id', function($id) use($db, $app){
		$sql = 'UPDATE carrito SET cantidad  = (cantidad + 1) WHERE idLibro= '.$id;
		$query = $db -> query($sql);


		if($query){

				$result = array(
					'status'  => 'success',
					'code' => 200,
					'message' => 'El libro ha actualizado'
				);

				}else{

					$result = array(
					'status'  => 'error',
					'code' => 404,
					'message' => 'El libro no ha sido actualizado correctamente'
				);
			}

			echo json_encode($result);

});

//restar a la cantidad 
$app -> post('/reducir/:id', function($id) use($db, $app){
		$sql = 'UPDATE carrito SET cantidad = cantidad -1 WHERE idLibro='.$id;
		$query = $db -> query($sql);


		if($query){

				$result = array(
					'status'  => 'success',
					'code' => 200,
					'message' => 'El libro ha actualizado'
				);

				}else{

					$result = array(
					'status'  => 'error',
					'code' => 404,
					'message' => 'El libro no ha sido actualizado correctamente'
				);
			}

			echo json_encode($result);

});
// actualizar todos los datos a 0
$app -> post('/borrar', function() use($db, $app){
		$sql = 'UPDATE carrito SET cantidad = 0 WHERE cantidad > 0';
		$query = $db -> query($sql);


		if($query){

				$result = array(
					'status'  => 'success',
					'code' => 200,
					'message' => 'El libro ha actualizado'
				);
				}else{

					$result = array(
					'status'  => 'error',
					'code' => 404,
					'message' => 'El libro no ha sido actualizado correctamente'
				);
			}

			echo json_encode($result);

});
// Cargar comentarios
$app -> get('/load-comentario/:nombre', function($nombre) use($db, $app){
			$sql ="SELECT * FROM comentarios WHERE nombreLibro ='$nombre'";
			$query = $db -> query($sql);
			$comentarios = array();

			while ($comentario = $query->fetch_assoc()) {
					$comentarios[] = $comentario;
			}
				$result = array(
					"status" => 'success',
					"code" => 200,
					"data" =>  $comentarios
				);

				echo json_encode($result);
});

// Añadir comentarios
$app -> post ('/subir-comentario', function() use($app, $db){
		$json = $app -> request -> post ('json');
		$data = json_decode($json, true);

		$query = "INSERT INTO comentarios VALUES(NULL,".
					"'{$data['texto']}',".
					"'{$data['nombreUs']}',".
					"'{$data['nombreLibro']}',".
					"'{$data['fecha']}',".
					"'{$data['calificacion']}'".
					");";

			$insert = $db -> query($query);

			if ($insert){
				$result = array(
					"status" => 'success',
					"code" => 200,
					"message" =>  'producto creado correctamente'
				);
			}
				echo json_encode($result);
});

//Conseguir recomendados
$app -> get('/recomendados/:categoria/:id', function($categoria,$id) use($db, $app){
			$sql ="SELECT * FROM libros WHERE categoria ='$categoria' AND id <> $id ORDER BY rating";
			$query = $db -> query($sql);
			$libros = array();

			while ($libro = $query->fetch_assoc()) {
					$libros[] = $libro;
			}
				$result = array(
					"status" => 'success',
					"code" => 200,
					"data" =>  $libros
				);

				echo json_encode($result);
});

$app -> run();