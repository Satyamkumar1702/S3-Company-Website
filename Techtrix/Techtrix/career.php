<?php
// Step 1: Configure Database & Email Settings
$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password (empty)
$dbname = "career_db";
$admin_email = "info@s3infotech.in"; // HR Email
$upload_dir = "uploads/"; // Resume Upload Directory

// Create Database Connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check Connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// Step 2: Handle Form Submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize Inputs
    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST["phone"], FILTER_SANITIZE_STRING);
    $role = filter_var($_POST["role"], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);

    // Validate Email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email address!'); window.location.href = 'career.html';</script>";
        exit;
    }

    // Step 3: Handle Resume Upload
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true); // Ensure folder is writable
    }

    $resume_dest = ""; // Default Empty
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $resume_name = basename($_FILES['resume']['name']);
        $resume_tmp = $_FILES['resume']['tmp_name'];
        $resume_size = $_FILES['resume']['size'];
        $resume_ext = strtolower(pathinfo($resume_name, PATHINFO_EXTENSION));

        // Validate File Type & Size
        $allowed_ext = ['pdf', 'doc', 'docx', 'txt'];
        $max_size = 5 * 1024 * 1024; // 5MB

        if (!in_array($resume_ext, $allowed_ext)) {
            echo "<script>alert('Invalid file type! Only PDF, DOC, DOCX, and TXT are allowed.'); window.location.href = 'career.html';</script>";
            exit;
        }

        if ($resume_size > $max_size) {
            echo "<script>alert('File size exceeds 5MB.'); window.location.href = 'career.html';</script>";
            exit;
        }

        // Move Resume to Uploads Folder
        $resume_dest = $upload_dir . time() . "_" . $resume_name;
        if (!move_uploaded_file($resume_tmp, $resume_dest)) {
            echo "<script>alert('Error uploading resume.'); window.location.href = 'career.html';</script>";
            exit;
        }
    }

    // Step 4: Insert Data into Database
    $stmt = $conn->prepare("INSERT INTO applications (name, email, phone, role, resume, message) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $email, $phone, $role, $resume_dest, $message);

    if ($stmt->execute()) {
        // Step 5: Send Email Notification to HR
        $subject = "New Job Application - $role";
        $body = "
        <h3>New Job Application</h3>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Job Role:</strong> $role</p>
        <p><strong>Cover Letter:</strong><br> $message</p>
        <p><strong>Resume:</strong> <a href='http://localhost/your_project_folder/$resume_dest'>Download Resume</a></p>
        ";

        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
        $headers .= "From: $email" . "\r\n";

        // Send Email to HR
        mail($admin_email, $subject, $body, $headers);

        // Step 6: Send Confirmation Email to Applicant
        $confirm_subject = "Application Received - $role";
        $confirm_body = "
        <h3>Thank You for Applying!</h3>
        <p>Hello $name,</p>
        <p>We have received your application for the <strong>$role</strong> position. If your skills match our requirements, our HR team will contact you soon.</p>
        <p>Best Regards,</p>
        <p>Your Company Name</p>
        ";

        $applicant_headers = "MIME-Version: 1.0" . "\r\n";
        $applicant_headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
        $applicant_headers .= "From: $admin_email" . "\r\n";

        mail($email, $confirm_subject, $confirm_body, $applicant_headers);

        // Step 7: Redirect to Thank You Page
        echo "<script>
                alert('Thank you for applying! Your response has been submitted successfully.');
                window.location.href = 'thankyou.html';
              </script>";
    } else {
        echo "<script>alert('Database Error!'); window.location.href = 'career.html';</script>";
    }

    // Close Connection
    $stmt->close();
    $conn->close();
} else {
    echo "<script>alert('Invalid request!'); window.location.href = 'career.html';</script>";
}
?>
