<?php
	$servername = "free-tier.gcp-us-central1.cockroachlabs.cloud";
	$username = "lucas";
	$password = "lucasvinzon1";
	$dbname = "valid-monkey-2858.defaultdb";
    $port = "26257";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

    $post_user = $_POST['user'];
	$post_list = $_POST['list'];

	$get_user = $_GET['user'];
	
    $insertStatement = "UPSERT sketch (user, list) VALUES ('{$user}','{$list}')";
    $retrieveStatement = "SELECT list FROM sketch WHERE user == '{$user}'";
	if ($conn->query(retrieveStatement) === TRUE) {
		echo "list retrieved";
	} else {
		echo "list unable to be retrieved";
	}

	if ($conn->query($insertStatement) === TRUE) {
		echo "list saved";
	} else {
		echo "list unable to be saved";
	}
	$conn -> close();
?>