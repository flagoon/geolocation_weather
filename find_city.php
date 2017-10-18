<?php
@require 'passwords.php';

//echo $_POST['city'];

// Create connection
$conn = new mysqli($servername, $username, $password, "flagoon");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//set correct coding
$conn->set_charset('utf8');
$sql = "SELECT city, coord_lat, coord_lng FROM data WHERE city LIKE '%" . $_GET['city'] . "%'";
$result = $conn->query($sql);

if ($result->num_rows > 0 && $result->num_rows < 11) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<div onClick='alertMe(this)'><div class='city-result mb-1 p-2 rounded'>$row[city]</div><div class='coord_lat hidden-xs-up'>$row[coord_lat]</div><div class='coord_lng hidden-xs-up'>$row[coord_lng]</div></div>";
    }
} else {
    echo "<div class='text-warning'>Nie ma takiego miasta, lub zbyt dużo wyników. Popraw się!</div>";
}

$conn->close();
?> 