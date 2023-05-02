<!DOCTYPE html>
<html>
  <style>
    body {
	font-family: Arial, sans-serif;
	background-color: #f2f2f2;
}

header {
	background-color: #333;
	color: #fff;
	padding: 20px;
	text-align: center;
}

form {
	background-color: #fff;
	padding: 20px;
	margin: 20px;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

label {
	display: block;
	margin-bottom: 10px;
}

input[type=text],
input[type=email],
input[type=number] {
	width: 100%;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
}

input[type=submit] {
	background-color: #4CAF50;
	color: #fff;
	padding: 10px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

input[type=submit]:hover {
	background-color: #45a049;
}

  </style>
<head>
	<title>Shop Website</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="script.js"></script>
</head>
<body>
	<header>
		<h1>Shop Website</h1>
	</header>

	<form action="submit.php" method="post" onsubmit="return validateForm()">
		<label for="name">Name:</label>
		<input type="text" name="name" id="name" required>

		<label for="email">Email:</label>
		<input type="email" name="email" id="email" required>

		<label for="product">Product:</label>
		<input type="text" name="product" id="product" required>

		<label for="quantity">Quantity:</label>
		<input type="number" name="quantity" id="quantity" required>

		<input type="submit" value="Submit">
	</form>

	<footer>
		<p>&copy; 2023 Shop Website</p>
	</footer>
	
	<?php
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$name = $_POST["name"];
		$email = $_POST["email"];
		$product = $_POST["product"];
		$quantity = $_POST["quantity"];

		$to = "daniel.10262011416@gmail.com"; // replace with your email address
		$subject = "New order from Shop Website";
		$message = "Name: $name\nEmail: $email\nProduct: $product\nQuantity: $quantity";
		$headers = "From: Shop Website <noreply@shopwebsite.com>\r\n";
		$headers .= "Reply-To: $name <$email>\r\n";

		mail($to, $subject, $message, $headers);

		// redirect to thank you page
		header("Location: thank-you.html");
		exit;
	}
	?>
</body>
  <script>
    function validateForm() {
  var name = document.forms["myForm"]["name"].value;
  var email = document.forms["myForm"]["email"].value;
  var product = document.forms["myForm"]["product"].value;
  var quantity = document.forms["myForm"]["quantity"].value;
  if (name == "" || email == "" || product == "" || quantity == "") {
    alert("All fields must be filled out");
    return false;
  }
}

  </script>
    
</html>
