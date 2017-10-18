<?php
@require 'passwords.php';

echo $_POST['city'];
// Create connection
$conn = new mysqli($servername, $username, $password, "flagoon");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//set correct coding
$conn->set_charset('utf8');
$sql = "SELECT city FROM data WHERE city LIKE '%" . $_POST['city'] . "%'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "city: " . $row["city"] . "<br>";
    }
} else {
    echo "0 results";
}

$conn->close();
?> 