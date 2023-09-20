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

// Lấy dữ liệu từ form
$maMH = $_POST['maMH'];
$tenMH = $_POST['tenMH'];
$soTC = $_POST['soTC'];

// Chuẩn bị câu lệnh SQL để thêm dữ liệu vào bảng MONHOC
$sql = "INSERT INTO MONHOC (MAMH, TENMH, SOTC) VALUES ('$maMH', '$tenMH', '$soTC')";

if ($conn->query($sql) === TRUE) {
    echo "Dữ liệu đã được thêm thành công.";
} else {
    echo "Có lỗi xảy ra: " . $conn->error;
}

// Đóng kết nối đến MySQL
$conn->close();
?>
