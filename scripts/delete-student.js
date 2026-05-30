const API_BASE_URL = 'http://localhost:5290/Students';

async function loadStudentInfo() {
    const studentId = parseInt(localStorage.getItem('studentToDeleteId'));

    if (!studentId) {
        alert('No student selected for deletion');
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

        $('#infoName').text(student.name);
        $('#infoId').text(student.id);
    } catch (error) {
        console.error('Failed to load student:', error);
        alert(`Failed to load student: ${error.message}`);
        window.location.href = 'index.html';
    }
}

async function confirmDelete() {
    const studentId = parseInt(localStorage.getItem('studentToDeleteId'));

    try {
        const response = await fetch(`${API_BASE_URL}/Delete?id=${studentId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        localStorage.removeItem('studentToDeleteId');
        alert('Student deleted successfully!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Failed to delete student:', error);
        alert(`Failed to delete student: ${error.message}`);
    }
}

$(document).on('DOMContentLoaded', function () {
    loadStudentInfo();

    const deleteBtn = $('#confirmDeleteBtn');
    if (deleteBtn) {
        deleteBtn.on('click', confirmDelete);
    }
});
