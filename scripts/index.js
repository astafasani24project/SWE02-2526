const API_BASE_URL = 'http://localhost:5290/Students';

async function fetchStudents() {
    const tableBody = $('#tableBody');
    tableBody.html('<tr><td colspan="7" class="text-center text-muted py-4">Loading...</td></tr>');

    try {
        const response = await fetch(`${API_BASE_URL}/GetAll`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const students = await response.json();

        tableBody.html('');

        if (!students || students.length === 0) {
            tableBody.html(`
                <tr>
                    <td colspan="7" class="text-center text-muted py-4">
                        No students added yet. Click "Add Student" to get started.
                    </td>
                </tr>
            `);
            return;
        }

        students.forEach((student) => {
            const math = parseFloat(student?.math ?? 0);
            const english = parseFloat(student?.english ?? 0);
            const science = parseFloat(student?.science ?? 0);
            const average = ((math + english + science) / 3).toFixed(2);
            const status = average >= 60 ? 'Passing' : 'Failing';
            const statusClass = average >= 60 ? 'text-success' : 'text-danger';

            const row = `
                <tr>
                    <td>${student.name} (${student.id})</td>
                    <td>${math}</td>
                    <td>${english}</td>
                    <td>${science}</td>
                    <td><strong>${average}</strong></td>
                    <td class="${statusClass}"><strong>${status}</strong></td>
                    <td>
                        <button class="btn btn-sm btn-warning me-1" onclick="editStudent(${student.id})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });
    } catch (error) {
        console.error('Failed to fetch students:', error);
        tableBody.html(`
            <tr>
                <td colspan="7" class="text-center text-danger py-4">
                    Failed to load students: ${error.message}
                </td>
            </tr>
        `);
    }
}

function editStudent(studentId) {
    localStorage.setItem('studentToEditId', studentId);
    window.location.href = 'edit-student.html';
}

function deleteStudent(studentId) {
    localStorage.setItem('studentToDeleteId', studentId);
    window.location.href = 'delete-student.html';
}

$(document).on('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    fetchStudents();
});
