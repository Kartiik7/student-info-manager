const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    studentUID: { type: String, required: true },
    gender: { type: String, required: true },
    mobileNo: { type: String, required: true },
    email: { type: String, required: true },

    // Academic Details
    course: { type: String, required: true },
    department: { type: String, required: true },
    graduationYear: { type: String, required: false },
    section: { type: String, required: false },

    // 12th Grade
    twelfthPercentage: String,
    twelfthBoard: String,
    twelfthPassingYear: String,
    twelfthCertificate: String,

    // 10th Grade
    tenthPercentage: String,
    tenthBoard: String,
    tenthPassingYear: String,
    tenthCertificate: String, // store file name or file path

    // Skills
    programmingLanguages: String,
    platformsUsed: String,
    internshipStatus: String,
    internshipProof: String, // store file name or file path

    // Additional Info
    previousCollege: String,
    casteCertificate: String,     // file name/path
    transferCertificate: String,  // file name/path

    // add timestamps for tracking
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);