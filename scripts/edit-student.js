const API_BASE_URL = 'http://localhost:5290/Students';

async function loadStudentData() {
    const studentId = parseInt(localStorage.getItem('studentToEditId'));

    if (!studentId) {
        alert('No student selected for editing');
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/GetById?id=${studentId}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const student = await response.json();

        if (!student) {
            alert('Student not found');
            window.location.href = 'index.html';
            return;
        }

        $('#studentName').val(student.name);
        $('#studentId').val(student.id);
        $('#mathGrade').val(student.math ?? '');
        $('#englishGrade').val(student.english ?? '');
        $('#scienceGrade').val(student.science ?? '');
    } catch (error) {
        console.error('Failed to load student:', error);
        alert(`Failed to load student: ${error.message}`);
        window.location.href = 'index.html';
    }
}

async function updateStudent(event) {
    event.preventDefault();

    const studentId = parseInt(localStorage.getItem('studentToEditId'));

    const updatedStudent = {
        id: studentId,
        name: $('#studentName').val(),
        math: parseFloat($('#mathGrade').val()),
        english: parseFloat($('#englishGrade').val()),
        science: parseFloat($('#scienceGrade').val())
    };

    try {
        const response = await fetch(`${API_BASE_URL}/Update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedStudent)
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        localStorage.removeItem('studentToEditId');
        alert('Student updated successfully!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Failed to update student:', error);
        alert(`Failed to update student: ${error.message}`);
    }
}

$(document).on('DOMContentLoaded', function () {
    console.log('Edit Student page loaded');
    loadStudentData();

    const form = $('#editStudentForm');
    if (form) {
        form.on('submit', updateStudent);
    }
});
