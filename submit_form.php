<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "graphodi";
$password = "YBe7e(u9@B7yH2";
$dbname = "graphodi_graphodio";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$toastMessage = ""; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $website = trim($_POST['website']);
    $message = trim($_POST['message']);

    if (empty($name) || empty($email) || empty($message)) {
        $toastMessage = "All required fields must be filled out.";

    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $toastMessage = "Invalid email format.";
    }

    $stmt = $conn->prepare("INSERT INTO contacts (name, email, website, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $website, $message);

    if ($stmt->execute()) {
        $toastMessage = "Your message has been sent successfully!";
    } else {
        $toastMessage = "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
echo $toastMessage;

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
        }

        body {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f4f7ff;
            overflow: hidden;
        }

        .toast {
            position: absolute;
            top: 25px;
            right: 30px;
            border-radius: 12px;
            background: #fff;
            padding: 20px 35px 20px 25px;
            box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transform: translateX(calc(100% + 30px));
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
        }

        .toast.active {
            transform: translateX(0%);
        }

        .toast .toast-content {
            display: flex;
            align-items: center;
        }

        .toast-content .check {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 35px;
            min-width: 35px;
            background-color:#ff0000;
            color: #fff;
            font-size: 20px;
            border-radius: 50%;
        }

        .toast-content .message {
            display: flex;
            flex-direction: column;
            margin: 0 20px;
        }

        .message .text {
            font-size: 16px;
            font-weight: 400;
            color: #666666;
        }

        .message .text.text-1 {
            font-weight: 600;
            color: #333;
        }

        .toast .close {
            position: absolute;
            top: 10px;
            right: 15px;
            padding: 5px;
            cursor: pointer;
            opacity: 0.7;
        }

        .toast .close:hover {
            opacity: 1;
        }

        .toast .progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            width: 100%;
        }

        .toast .progress:before {
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            height: 100%;
            width: 100%;
            background-color: #ff0000;
        }

        .progress.active:before {
            animation: progress 5s linear forwards;
        }

        @keyframes progress {
            100% {
                right: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="toast" id="toast">
        <div class="toast-content">
            <i class="fas fa-check check"></i>
            <div class="message">
                <span class="text text-1">Success</span>
                <span class="text text-2" id="toast-message"></span>
            </div>
        </div>
        <i class="fa-solid fa-xmark close" id="close-toast"></i>
        <div class="progress" id="toast-progress"></div>
    </div>

    <script>
    const toast = document.getElementById("toast");
    const closeToast = document.getElementById("close-toast");
    const toastProgress = document.getElementById("toast-progress");
    const toastMessage = document.getElementById("toast-message");
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); 

        const formData = new FormData(form);

        fetch("submit_form.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.text()) 
            .then((message) => {
                // Show the toast notification
                toastMessage.innerText = message;
                toast.classList.add("active");
                toastProgress.classList.add("active");

                // Hide the toast automatically after 5 seconds
                setTimeout(() => {
                    toast.classList.remove("active");
                    toastProgress.classList.remove("active");
                }, 5000);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });

    // Close the toast manually
    closeToast.addEventListener("click", () => {
        toast.classList.remove("active");
        toastProgress.classList.remove("active");
    });
</script>

</body>
</html>

