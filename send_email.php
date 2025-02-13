<?php
// Database configuration
$servername = "localhost";
$username = "graphodi";
$password = "YBe7e(u9@B7yH2";
$dbname = "graphodi_graphodio";


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $company = $_POST['company'];
    $notes = $_POST['notes'];
    $preference = $_POST['preference'];
    $selectedDate = $_POST['selectedDate']; 
    $selectedTimezone = $_POST['selectedTimezone']; 


    // 1. Insert the data into the database using prepared statements
    $stmt = $conn->prepare("INSERT INTO meeting_requests (name, email, phone, company, notes, preference, selected_date, selected_timezone) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $name, $email, $phone, $company, $notes, $preference, $selectedDate, $selectedTimezone);


    if ($stmt->execute()) {
        $mail = new PHPMailer(true);
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host       = 'mail.graphodio.com'; // Outgoing server (SMTP)
            $mail->SMTPAuth   = true;
            $mail->Username   = 'info@graphodio.com'; // 
            $mail->Password   = 'Graphodio123'; 
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Use SSL
            $mail->Port       = 465; // SMTP Port for SSL
        


            // Recipients
            $mail->setFrom('info@graphodio.com', 'Graphodio'); // Your email and name
            $mail->addAddress('lamisa.diya09@gmail.com'); // Your email
            $mail->addReplyTo($email, $name);


            // Content
            $mail->isHTML(true);
            $mail->Subject = "New Meeting Request from " . $name;
            $mail->Body    = "
     <html>
                <head>
                  <title>Meeting Request Details</title>
                </head>
                <body>
                  <h2>New Meeting Request</h2>
                  <p><strong>Name:</strong> $name</p>
                  <p><strong>Email:</strong> $email</p>
                  <p><strong>Phone:</strong> $phone</p>
                  <p><strong>Company:</strong> $company</p>
                  <p><strong>Notes:</strong><br/>$notes</p>
                  <p><strong>Preference:</strong> $preference</p>
                  <p><strong>Selected Date:</strong> $selectedDate</p>
                  <p><strong>Selected Timezone:</strong> $selectedTimezone</p>
                </body>
                </html>";


                $mail->send();
                echo "Thank you! Your meeting request has been submitted.";
                header("refresh:2;url=https://graphodio.com/");
                exit();
            } catch (Exception $e) {
                error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
                echo "There was a problem submitting your request. Please try again.";
            }
        } else {
            echo "Error: " . $stmt->error;
        }
    
    
        $stmt->close();
        $conn->close();
    } else {
        echo "Invalid request.";
    }
    ?>
    
    
