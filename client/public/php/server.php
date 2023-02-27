<?php
session_start();
$username = "";
$email = "";
$errors = array();
$_SESSION['success'] = "";

// DBMS connection code -> hostname,
// username, password, database name
$db = mysqli_connect('localhost', 'root', '', 'registration');

// Registration code
if (isset($_POST['reg_user'])) {

	$username = mysqli_real_escape_string($db, $_POST['username']);
	$email = mysqli_real_escape_string($db, $_POST['email']);
	$password_1 = mysqli_real_escape_string($db, $_POST['password_1']);
	$password_2 = mysqli_real_escape_string($db, $_POST['password_2']);

	// User cannot leave a blank field
	if (empty($username)) { array_push($errors, "Username is required"); }
	if (empty($email)) { array_push($errors, "Email is required"); }
	if (empty($password_1)) { array_push($errors, "Password is required"); }

	if ($password_1 != $password_2) {
		array_push($errors, "The two passwords do not match");
		// Passwords must match
	}

	if (count($errors) == 0) {
		
		$password = md5($password_1);
		
		// Inserting data into table
		$query = "INSERT INTO users (username, email, password)
				VALUES('$username', '$email', '$password')";
		
		mysqli_query($db, $query);

		// Storing username of the logged in user,
		// in the session variable
		$_SESSION['username'] = $username;
		
		// Welcome message
		$_SESSION['success'] = "You have logged in";
		
		// Page on which the user will be
		// redirected after logging in
		header('location: index.php');
	}
}

// User login
if (isset($_POST['login_user'])) {

	$username = mysqli_real_escape_string($db, $_POST['username']);
	$password = mysqli_real_escape_string($db, $_POST['password']);

	// Cannot leave input field blank
	if (empty($username)) {
		array_push($errors, "Username is required");
	}
	if (empty($password)) {
		array_push($errors, "Password is required");
	}

	// Checking for the errors
	if (count($errors) == 0) {
		
		// Password matching
		$password = md5($password);
		
		$query = "SELECT * FROM users WHERE username=
				'$username' AND password='$password'";
		$results = mysqli_query($db, $query);

		// $results = 1 means that one user with the
		// entered username exists
		if (mysqli_num_rows($results) == 1) {
			
			// Storing username in session variable
			$_SESSION['username'] = $username;
			
			// Welcome message
			$_SESSION['success'] = "You have logged in!";
			
			// Page on which the user is sent
			// to after logging in
			header('location: index.php');
		}
		else {
			
			// If the username and password doesn't match
			array_push($errors, "Username or password incorrect");
		}
	}
}

?>
