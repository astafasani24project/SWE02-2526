const API_BASE_URL = 'http://localhost:5290/Students';

function generateStudentId() {
    return Math.floor(Math.random() * 15000) + 1;
}

async function saveStudentInfo(event) {
    event.preventDefault();

    const newStudent = {
        id: generateStudentId(),
        name: $('#studentName').val(),
        math: parseFloat($('#mathGrade').val()),
        english: parseFloat($('#englishGrade').val()),
        science: parseFloat($('#scienceGrade').val())
    };

    try {
        const response = await fetch(`${API_BASE_URL}/AddNew`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent)
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        console.log('New Student saved:', newStudent);
        alert('Student information saved successfully!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Failed to save student:', error);
        alert(`Failed to save student: ${error.message}`);
    }
}
