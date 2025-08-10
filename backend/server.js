const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Student = require('./models/Students');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

app.use(cors({
    origin: [
        "http://localhost:5500",
        "https://newstudentdatamanager.netlify.app/"
    ]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File uploads will be saved in /uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads')); // to access uploaded files

// MongoDB Connection
mongoose.connect(PORT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Error:", err));

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'Student Form API is running!', status: 'OK' });
});

// Form Submission Route
app.post('/submit', upload.fields([
    { name: 'grade12-certificate' },
    { name: 'grade10-certificate' },
    { name: 'internship-proof' },
    { name: 'transfer-cert' },
    { name: 'caste-cert' }
]), async (req, res) => {
    try {
        const data = new Student({
            studentName: req.body['student-name'],
            studentUID: req.body['student-uid'],
            gender: req.body.gender,
            mobileNo: req.body['student-mobile'],
            email: req.body.emailid,

            course: req.body.course,
            department: req.body.department,
            graduationYear: req.body.batch,
            section: req.body.section,

            twelfthPercentage: req.body['grade12-marks'],
            twelfthBoard: req.body['grade12-board'],
            twelfthPassingYear: req.body['grade12-year'],
            twelfthCertificate: req.files['grade12-certificate']?.[0]?.filename || '',

            tenthPercentage: req.body['grade10-marks'],
            tenthBoard: req.body['grade10-board'],
            tenthPassingYear: req.body['grade10-year'],
            tenthCertificate: req.files['grade10-certificate']?.[0]?.filename || '',

            programmingLanguages: req.body['program-lan'],
            platformsUsed: req.body['platforms-used'],
            internshipStatus: req.body['internship'],
            internshipProof: req.files['internship-proof']?.[0]?.filename || '',

            previousCollege: req.body['prev-college'],
            casteCertificate: req.files['caste-cert']?.[0]?.filename || '',
            transferCertificate: req.files['transfer-cert']?.[0]?.filename || ''
        });

        await data.save();
        res.status(200).json({ message: 'Student data saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to save data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
