<?php
session_start();

// Define admin credentials
$admin_username = "admin";
$admin_password = "password"; // Change this to a secure password

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($username === $admin_username && $password === $admin_password) {
        $_SESSION['admin_logged_in'] = true;
        header("Location: view_contacts.php");
        exit();
    } else {
        $error = "Invalid credetials. Please try again.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <style>
        body {
            font-family: 'Sora', sans-serif;
            background-color: rgba(0, 0, 0, 1);
            color: rgba(255, 0, 0, 1);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .login-container {
            text-align: center;
            background-color: white;
            padding: 50px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            width: 100%;
        }
        .login-container h2 {
            font-family: 'Sora', sans-serif;
            color: rgba(0, 0, 0, 1);
        }
        .login-container img {
           
        }
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 15px;
            margin: 10px 0;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }
        button {
            background-color: rgba(255, 0, 0, 1);
            color: white;
            border: none;
            padding: 15px;
            width: 100%;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            margin-top: 10px;
        }
        button:hover {
            background-color: rgba(200, 0, 0, 1);
        }
        .error {
            color: red;
        }
    </style>
</head>
<body>

<div class="login-container">
    <img src="images/logo.png" alt="Logo">
    <h2>Admin Login</h2>

    <?php if (isset($error)) { echo "<p class='error'>$error</p>"; } ?>

    <form method="POST" action="admin_login.php">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>
</div>

</body>
</html>
