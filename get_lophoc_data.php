<?php
$servername = "localhost";
$username = "root";
$password = "110602@Hc";
$dbname = "QLSV";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

$sql = "SELECT * FROM LOP";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table><tr><th>Mã lớp học</th><th>Tên lớp học</th><th>Niên khóa</th><th>Sửa</th><th>Xóa</th></tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["MALP"]. "</td><td>" . $row["TENLP"]. "</td><td>" . $row["NK"]. "</td>";
        echo "<td><button onclick='editLopHoc(" . $row["MALP"] . ")'>Sửa</button></td>";
        echo "<td><button onclick='deleteLopHoc(" . $row["MALP"] . ")'>Xóa</button></td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

$conn->close();
?>

<script>
function editLopHoc(malp) {
    // Thực hiện chức năng sửa lớp học với mã lớp học là malp
    console.log("Sửa lớp học với mã: " + malp);
}

function deleteLopHoc(malp) {
    // Thực hiện chức năng xóa lớp học với mã lớp học là malp
    console.log("Xóa lớp học với mã: " + malp);
}
</script>
