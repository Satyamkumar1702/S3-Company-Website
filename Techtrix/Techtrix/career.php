<?php
// Step 1: Configure your email settings
$admin_email = "info@s3infotech.in"; // Change this to your HR email
$upload_dir = "uploads/"; // Directory to store resumes

// Step 2: Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Step 2.1: Sanitize and validate inputs
    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST["phone"], FILTER_SANITIZE_STRING);
    $role = filter_var($_POST["role"], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email address!'); window.location.href = 'career.html';</script>";
        exit;
    }

    // Step 3: Create uploads folder if it doesn't exist
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true); // Ensure folder is writable
    }

    // Step 4: Handle Resume Upload
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $resume_name = $_FILES['resume']['name'];
        $resume_tmp = $_FILES['resume']['tmp_name'];
        $resume_size = $_FILES['resume']['size'];
        $resume_ext = strtolower(pathinfo($resume_name, PATHINFO_EXTENSION));

        // Validate file type and size (max 5MB)
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

        // Move the uploaded file to the target folder
        $resume_dest = $upload_dir . basename($resume_name);
        if (move_uploaded_file($resume_tmp, $resume_dest)) {
            $resume_status = "Resume uploaded successfully!";
        } else {
            $resume_status = "Error uploading resume.";
        }
    } else {
        $resume_status = "No resume uploaded.";
    }

    // Step 5: Send Email Notification to HR
    $subject = "New Job Application - $role";
    $body = "
    <h3>New Job Application</h3>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Phone:</strong> $phone</p>
    <p><strong>Job Role:</strong> $role</p>
    <p><strong>Cover Letter:</strong><br> $message</p>
    <p><strong>Resume:</strong> <a href='https://yourwebsite.com/$resume_dest'>Download Resume</a></p>
    ";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";

    // Send email to HR
    if (!mail($admin_email, $subject, $body, $headers)) {
        echo "<script>alert('Failed to send email to HR!'); window.location.href = 'career.html';</script>";
        exit;
    }

    // Step 6: Send confirmation email to the applicant
    $confirm_subject = "Application Received - $role";
    $confirm_body = "
    <h3>Thank You for Applying!</h3>
    <p>Hello $name,</p>
    <p>We have received your application for the <strong>$role</strong> position. If your skills match our requirements, our HR team will contact you soon.</p>
    <p>Best Regards,</p>
    <p>Your Company Name</p>
    ";

    // Use proper headers for the applicant's email
    $applicant_headers = "MIME-Version: 1.0" . "\r\n";
    $applicant_headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $applicant_headers .= "From: $admin_email" . "\r\n";

    // Send confirmation email to the applicant
    if (!mail($email, $confirm_subject, $confirm_body, $applicant_headers)) {
        echo "<script>alert('Failed to send confirmation email!'); window.location.href = 'career.html';</script>";
        exit;
    }

    // Step 7: Show Success Message
    echo "
    <script>
        alert('Thank you for applying! Your response has been submitted successfully.');
        window.location.href = 'thankyou.html';
    </script>";
} else {
    echo "<script>alert('Invalid request!'); window.location.href = 'career.html';</script>";
}
?>
