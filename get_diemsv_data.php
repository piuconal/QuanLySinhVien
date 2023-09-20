<?php
$servername = "localhost";
$username = "root";
$password = "110602@Hc";
$dbname = "QLSV";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

$sql = "SELECT * FROM DIEMSV";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table><tr><th>Mã sinh viên</th><th>Mã môn học</th><th>Điểm</th><th>Sửa</th><th>Xóa</th></tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["MASV"]. "</td><td>" . $row["MAMH"]. "</td><td>" . $row["DIEM"]. "</td>";
        echo "<td><button onclick='editDiemSV(" . $row["MASV"] . ", " . $row["MAMH"] . ")'>Sửa</button></td>";
        echo "<td><button onclick='deleteDiemSV(" . $row["MASV"] . ", " . $row["MAMH"] . ")'>Xóa</button></td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

$conn->close();
?>

<script>
function editDiemSV(masv, mamh) {
    // Thực hiện chức năng sửa điểm sinh viên với mã sinh viên là masv và mã môn học là mamh
    console.log("Sửa điểm sinh viên với mã SV: " + masv + ", mã MH: " + mamh);
}

function deleteDiemSV(masv, mamh) {
    // Thực hiện chức năng xóa điểm sinh viên với mã sinh viên là masv và mã môn học là mamh
    console.log("Xóa điểm sinh viên với mã SV: " + masv + ", mã MH: " + mamh);
}
</script>
