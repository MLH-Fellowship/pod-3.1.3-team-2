<?php
	$servername = "free-tier.gcp-us-central1.cockroachlabs.cloud";
	$username = "lucas";
	$password = "rKA9opQmWRbA9RPa";
	$dbname = "valid-monkey-2858.defaultdb";
    $port = "26257";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

    $user = $_POST['user'];
	$list = $_POST['list'];
	
    $insertStatement = "UPDATE sketch (user, list) VALUES ('{$user}','{$list}')";
    $retrieveStatement = "SELECT list FROM sketch WHERE user == '{$user}'";

	if ($conn->query($insertStatement) === TRUE) {
		echo "list saved";
	} else {
		echo "list unable to be saved";
	}
	$conn -> close();
?>