const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course',
    },
    progress: {
        type: Number,
        required: true,
        default: 0, // Defines the percentage of completion from 0 to 100
        min: 0,
        max: 100,
    }
}, {
    timestamps: true,
});

// A user can enroll in a course only once
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollment;
