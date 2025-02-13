<?php
session_start();

// Check if the admin is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: admin_login.php");
    exit();
}

$servername = "localhost";
$username = "graphodi";
$password = "YBe7e(u9@B7yH2";
$dbname = "graphodi_graphodio";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, name, email, website, message, submission_date FROM contacts";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submissions</title>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            font-family: 'Sora', sans-serif;
            background-color: rgba(0, 0, 0, 1);
            color: rgba(255, 0, 0, 1);
            padding: 20px;
            margin: 0;
        }
        h1 {
            color: rgba(255, 0, 0, 1);
            text-align: center;
            margin-bottom: 40px;
            font-size: 36px;
        }
        .table-container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: rgba(255, 255, 255, 1);
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 15px;
            text-align: left;
        }
        th {
            background-color: rgba(255, 0, 0, 1);
            color: white;
            font-weight: bold;
            font-size: 18px;
            text-transform: uppercase;
        }
        td {
            background-color: rgba(245, 245, 245, 1);
            border-bottom: 1px solid rgba(200, 200, 200, 1);
            color: #333;
            font-size: 16px;
        }
        tr:nth-child(even) td {
            background-color: rgba(230, 230, 230, 1);
        }
        tr:hover td {
            background-color: rgba(255, 0, 0, 0.1);
            transition: background-color 0.3s ease;
        }
        .logout {
            display: block;
            margin: 20px 60px;
            padding: 10px 20px;
            background-color: rgba(255, 0, 0, 1);
            color: white;
            text-align: center;
            border-radius: 5px;
            text-decoration: none;
            font-size: 18px;
            width: 200px;
            transition: background-color 0.3s ease;
        }
        .logout:hover {
            background-color: rgba(200, 0, 0, 1);
        }
    </style>
</head>
<body>

<h1>Contact Form Submissions</h1>

<div class="table-container">
    <?php
    if ($result->num_rows > 0) {
        echo "<table>";
        echo "<tr><th>ID</th><th>Name</th><th>Email</th><th>Website</th><th>Message</th><th>Date Submitted</th></tr>";
        while($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td>" . $row["id"] . "</td>
                    <td>" . $row["name"] . "</td>
                    <td>" . $row["email"] . "</td>
                    <td>" . $row["website"] . "</td>
                    <td>" . $row["message"] . "</td>
                    <td>" . $row["submission_date"] . "</td>
                  </tr>";
        }
        echo "</table>";
    } else {
        echo "<p>No submissions found.</p>";
    }

    $conn->close();
    ?>
</div>

<a href="logout.php" class="logout">Logout</a>

</body>
</html>
