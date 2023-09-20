document.getElementById("monHocForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const maMH = document.getElementById("maMH").value;
    const tenMH = document.getElementById("tenMH").value;
    const soTC = document.getElementById("soTC").value;

    // Kiểm tra tính hợp lệ của dữ liệu (đơn giản)
    saveMonHoc(maMH, tenMH, soTC);
  });

function saveMonHoc(maMH, tenMH, soTC) {
  // Check if soTC is a non-negative number
  if (isNaN(soTC) || parseInt(soTC) < 0) {
    alert("Số tín chỉ phải là số không âm.");
    return;
  }
  // Tạo XMLHttpRequest object để gửi dữ liệu lên server
  const xhr = new XMLHttpRequest();

  // Xác định phương thức và URL để gửi dữ liệu
  xhr.open("POST", "save_monhoc.php", true);

  // Xử lý khi nhận được phản hồi từ server
  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("Thông tin môn học đã được thêm.");
    } else {
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  // Đặt header cho request
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Gửi dữ liệu môn học lên server
  const data = `maMH=${maMH}&tenMH=${tenMH}&soTC=${soTC}`;
  xhr.send(data);
}

document.getElementById("lopForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const maLP = document.getElementById("maLP").value;
  const tenLP = document.getElementById("tenLP").value;
  const niemKhoa = document.getElementById("niemKhoa").value;

  // Kiểm tra tính hợp lệ của dữ liệu (đơn giản)
  saveLop(maLP, tenLP, niemKhoa);
});

function saveLop(maLP, tenLP, niemKhoa) {
  // Tạo XMLHttpRequest object để gửi dữ liệu lên server
  const xhr = new XMLHttpRequest();

  // Xác định phương thức và URL để gửi dữ liệu
  xhr.open("POST", "save_lop.php", true);

  // Xử lý khi nhận được phản hồi từ server
  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("Thông tin lớp học đã được thêm.");
    } else {
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  // Đặt header cho request
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Gửi dữ liệu môn học lên server
  const data = `maLP=${maLP}&tenLP=${tenLP}&niemKhoa=${niemKhoa}`;
  xhr.send(data);
}

document.getElementById("sinhVienForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const maSV = document.getElementById("maSV").value;
    const tenSV = document.getElementById("tenSV").value;
    const diaChi = document.getElementById("diaChi").value;
    const maLP_SV = document.getElementById("maLP_SV").value;

    // Kiểm tra tính hợp lệ của dữ liệu (đơn giản)
    saveSinhVien(maSV, tenSV, diaChi, maLP_SV);
  });

function saveSinhVien(maSV, tenSV, diaChi, maLP_SV) {
  // Check if the class ID exists in the "lop" table
  const xhrCheckClass = new XMLHttpRequest();
  xhrCheckClass.open("POST", "check_class.php", true);
  xhrCheckClass.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  xhrCheckClass.onload = function () {
    if (xhrCheckClass.status === 200) {
      const response = JSON.parse(xhrCheckClass.responseText);
      if (response.classExists) {
        // Class exists, proceed to save the student
        saveStudentToDatabase(maSV, tenSV, diaChi, maLP_SV);
      } else {
        // Class does not exist, prompt the user to enter a valid class ID
        alert("Mã lớp không tồn tại. Vui lòng nhập mã lớp khác.");
      }
    } else {
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };
  const dataCheckClass = `maLP=${maLP_SV}`;
  xhrCheckClass.send(dataCheckClass);
}

function saveStudentToDatabase(maSV, tenSV, diaChi, maLP_SV) {
  // Tạo XMLHttpRequest object để gửi dữ liệu lên server
  const xhr = new XMLHttpRequest();

  // Xác định phương thức và URL để gửi dữ liệu
  xhr.open("POST", "save_sinhvien.php", true);

  // Xử lý khi nhận được phản hồi từ server
  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("Thông tin sinh viên đã được thêm.");
    } else {
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  // Đặt header cho request
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Gửi dữ liệu môn học lên server
  const data = `maSV=${maSV}&tenSV=${tenSV}&diaChi=${diaChi}&maLP_SV=${maLP_SV}`;
  xhr.send(data);
}

document.getElementById("diemSVForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const maSV_Diem = document.getElementById("maSV_Diem").value;
    const maMH_Diem = document.getElementById("maMH_Diem").value;
    const diem = document.getElementById("diem").value;

    // Kiểm tra tính hợp lệ của dữ liệu (đơn giản)
    saveDiemSV(maSV_Diem, maMH_Diem, diem);
  });

function saveDiemSV(maSV_Diem, maMH_Diem, diem) {
  // Check if the student ID and subject ID exist
  const xhrCheckStudentAndSubject = new XMLHttpRequest();
  xhrCheckStudentAndSubject.open("POST", "check_student_subject.php", true);
  xhrCheckStudentAndSubject.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  xhrCheckStudentAndSubject.onload = function () {
    if (xhrCheckStudentAndSubject.status === 200) {
      const response = JSON.parse(xhrCheckStudentAndSubject.responseText);
      if (response.studentExists && response.subjectExists) {
        // Student and subject exist, proceed to save the grade
        saveGradeToDatabase(maSV_Diem, maMH_Diem, diem);
      } else {
        let errorMessage = "Có lỗi xảy ra:";
        if (!response.studentExists) {
          errorMessage += " Mã sinh viên không tồn tại.";
        }
        if (!response.subjectExists) {
          errorMessage += " Mã môn học không tồn tại.";
        }
        alert(errorMessage);
      }
    } else {
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };
  const dataCheckStudentAndSubject = `maSV_Diem=${maSV_Diem}&maMH_Diem=${maMH_Diem}`;
  xhrCheckStudentAndSubject.send(dataCheckStudentAndSubject);
}

function saveGradeToDatabase(maSV_Diem, maMH_Diem, diem) {
  // Create an XMLHttpRequest object to send data to the server
  const xhr = new XMLHttpRequest();

  // Define the method and URL to send the data
  xhr.open("POST", "save_diemsv.php", true);

  // Handle the response from the server
  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("Đã cập nhật điểm sinh viên.");
    } else {
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  // Set the request header
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Send the grade data to the server
  const data = `maSV_Diem=${maSV_Diem}&maMH_Diem=${maMH_Diem}&diem=${diem}`;
  xhr.send(data);
}


function displaySelectedOption() {
  var selectedOption = document.getElementById("select1").value;

  if (selectedOption === "option1") {
    // Send an AJAX request to fetch monhoc data
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Display the data in the monhocTable div
        document.getElementById("monhocTable").innerHTML = xhr.responseText;
        document.getElementById("view-port").style.display = "block";
        document.getElementById("monhocTable").style.display = "block";
        document.getElementById("lophocTable").style.display = "none";
        document.getElementById("diemsvTable").style.display = "none";
      }
    };
    xhr.open("GET", "get_monhoc_data.php", true);
    xhr.send();
  }

  if (selectedOption === "option2") {
    // Send an AJAX request to fetch monhoc data
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Display the data in the monhocTable div
        document.getElementById("lophocTable").innerHTML = xhr.responseText;
        document.getElementById("view-port").style.display = "block";
        document.getElementById("lophocTable").style.display = "block";
        document.getElementById("monhocTable").style.display = "none";
        document.getElementById("diemsvTable").style.display = "none";
      }
    };
    xhr.open("GET", "get_lophoc_data.php", true);
    xhr.send();
  }

  if (selectedOption === "option3") {
    // Send an AJAX request to fetch monhoc data
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Display the data in the monhocTable div
        document.getElementById("diemsvTable").innerHTML = xhr.responseText;
        document.getElementById("view-port").style.display = "block";
        document.getElementById("diemsvTable").style.display = "block";
        document.getElementById("lophocTable").style.display = "none";
        document.getElementById("monhocTable").style.display = "none";
      }
    };
    xhr.open("GET", "get_diemsv_data.php", true);
    xhr.send();
  }

  if (selectedOption === "option4") {
    // Send an AJAX request to fetch monhoc data
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Display the data in the monhocTable div
        document.getElementById("monhocTable").innerHTML = xhr.responseText;
        document.getElementById("view-port").style.display = "block";
        document.getElementById("monhocTable").style.display = "block";
      }
    };
    xhr.open("GET", "get_monhoc_data.php", true);
    xhr.send();
  }
}

function toggleViewPort() {
  var viewPort = document.getElementById('view-port');
  var monhoctable = document.getElementById('monhocTable');
  var lophoctable = document.getElementById('lophocTable');
  var diemsvtable = document.getElementById('diemsvTable');

  viewPort.style.display = "none";
  monhoctable.style.display = "none";
  diemsvtable.style.display = "none";
  lophoctable.style.display = "none";
}






