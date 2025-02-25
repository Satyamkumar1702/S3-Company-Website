const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// ✅ Middleware Configuration
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// ✅ Configure Multer for Career Form File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|doc|docx/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Please upload only PDF or Word documents!');
        }
    }
});

// ✅ Serve static files (if needed)
app.use(express.static('public'));

// 🔹 **Career Form Submission**
app.post('/api/career', upload.single('resume'), (req, res) => {
    try {
        console.log("Career Form Data Received:", req.body); // Debugging

        const { name, email, phone, role, message } = req.body;

        // Validate required fields
        if (!name || !email || !req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields and upload a resume.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Application submitted successfully',
            data: {
                name,
                email,
                phone,
                role,
                message,
                resumePath: req.file.path
            }
        });

    } catch (error) {
        console.error('Error processing career form:', error);
        res.status(500).json({ success: false, message: 'Server error while processing your application' });
    }
});

// 🔹 **Contact Form Submission**
app.post('/api/contact', (req, res) => {
    console.log("Received Contact Form Data:", req.body); // Debugging

    const { name, email, phone, subject, message } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !phone || !subject || !message) {
        console.log("Error: Missing fields"); // Debugging log
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    console.log("✅ Contact Form Submitted Successfully:", { name, email, phone, subject, message });

    res.status(200).json({
        success: true,
        message: "Message sent successfully",
        data: { name, email, phone, subject, message }
    });
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong on the server!'
    });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});