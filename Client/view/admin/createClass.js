document.addEventListener("DOMContentLoaded", function() {
    const classForm = document.getElementById("classForm");
    const classList = document.getElementById("classes");

    classForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const className = document.getElementById("className").value;
        const teacherName = document.getElementById("teacherName").value;
        const studentList = document.getElementById("studentList").value.split("\n");

        const classData = {
            className: className,
            teacherName: teacherName,
            studentList: studentList
        };

        fetch('backend.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(classData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const classItem = document.createElement("li");
                classItem.innerHTML = `
                    <h3>${className}</h3>
                    <p>Giáo viên: ${teacherName}</p>
                    <p>Danh sách học sinh:</p>
                    <ul>
                        ${studentList.map(student => `<li>${student}</li>`).join("")}
                    </ul>
                `;

                classList.appendChild(classItem);
                classForm.reset();
            }
        });
    });

    // Fetch existing classes from backend
    fetch('classes.json')
        .then(response => response.json())
        .then(classes => {
            classes.forEach(classData => {
                const classItem = document.createElement("li");
                classItem.innerHTML = `
                    <h3>${classData.className}</h3>
                    <p>Giáo viên: ${classData.teacherName}</p>
                    <p>Danh sách học sinh:</p>
                    <ul>
                        ${classData.studentList.map(student => `<li>${student}</li>`).join("")}
                    </ul>
                `;
                classList.appendChild(classItem);
            });
        });
});
