<!DOCTYPE html>
<html>
<head>
    <title>Contact Us</title>
</head>
<body>
    <?php
    require 'path_to_phpmailer/PHPMailerAutoload.php';

    // Check if the form is submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form data
        $name = $_POST["name"];
        $email = $_POST["email"];
        $message = $_POST["message"];

        // Validate the form data (you can add more validation if needed)
        if (!empty($name) && !empty($email) && !empty($message)) {
            // Create a new PHPMailer instance
            $mail = new PHPMailer;

            // Configure SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.example.com'; // Replace with your SMTP server address
            $mail->Port = 587; // Replace with the appropriate port number
            $mail->SMTPAuth = true;
            $mail->Username = 'your_username'; // Replace with your SMTP username
            $mail->Password = 'your_password'; // Replace with your SMTP password

            // Set the sender and recipient
            $mail->setFrom($email, $name);
            $mail->addAddress('daniel.10262011416@gmail.com'); // Replace with your recipient email

            // Set email subject and body
            $mail->Subject = 'New Contact Us Submission';
            $mail->Body = "Name: $name\nEmail: $email\nMessage: $message";

            // Send the email
            if ($mail->send()) {
                echo "<p>Thank you for contacting us! We will get back to you shortly.</p>";
            } else {
                echo "<p>Sorry, an error occurred while sending your message. Please try again later.</p>";
            }
        } else {
            echo "<p>Please fill out all the fields.</p>";
        }
    }
    ?>
    <h1>Contact Us</h1>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br>

        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea><br>

        <input type="submit" value="Submit">
    </form>
</body>
</html>
