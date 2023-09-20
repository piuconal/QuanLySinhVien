<?php
$servername = "localhost";
$username = "root";
$password = "110602@Hc";
$dbname = "QLSV";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

$sql = "SELECT * FROM MONHOC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table><tr><th>Mã môn học</th><th>Tên môn học</th><th>Số tín chỉ</th><th>Sửa</th><th>Xóa</th></tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["MAMH"]. "</td><td>" . $row["TENMH"]. "</td><td>" . $row["SOTC"]. "</td>";
        echo "<td><button onclick='editMonHoc(" . $row["MAMH"] . ")'>Sửa</button></td>";
        echo "<td><button onclick='deleteMonHoc(" . $row["MAMH"] . ")'>Xóa</button></td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

$conn->close();
?>

<script>
function editMonHoc(mamh) {
    // Thực hiện chức năng sửa môn học với mã môn học là mamh
    console.log("Sửa môn học với mã: " + mamh);
}

function deleteMonHoc(mamh) {
    // Thực hiện chức năng xóa môn học với mã môn học là mamh
    console.log("Xóa môn học với mã: " + mamh);
}
</script>
