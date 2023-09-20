<?php
$servername = "localhost";
$username = "root"; // Thay your_username bằng tên người dùng MySQL của bạn
$password = "110602@Hc"; // Thay your_password bằng mật khẩu MySQL của bạn
$dbname = "QLSV"; // Thay QLSV bằng tên cơ sở dữ liệu của bạn

// Tạo kết nối đến MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

$maSV_Diem = $_POST['maSV_Diem'];
$maMH_Diem = $_POST['maMH_Diem'];
$diem = $_POST['diem'];

// Chuẩn bị câu lệnh SQL để thêm dữ liệu vào bảng DIEMSV
$sql = "INSERT INTO DIEMSV (MASV, MAMH, DIEM) VALUES ('$maSV_Diem', '$maMH_Diem', $diem)";
if ($conn->query($sql) === TRUE) {
    echo "Dữ liệu đã được thêm thành công.";
} else {
    echo "Có lỗi xảy ra: " . $conn->error;
}

// Đóng kết nối đến MySQL
$conn->close();
?>
