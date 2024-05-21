document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const sortByNameAZBtn = document.getElementById("sortByNameAZBtn");
  const sortByNameZABtn = document.getElementById("sortByNameZABtn");
  const sortByMarksBtn = document.getElementById("sortByMarksBtn");
  const sortByPassingBtn = document.getElementById("sortByPassingBtn");
  const sortByClassBtn = document.getElementById("sortByClassBtn");
  const sortByGenderBtn = document.getElementById("sortByGenderBtn");
  const studentsTable = document.getElementById("studentsTable");

  let studentsData = [];
  // Fetch the data from the provided URL
  fetch(
    "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
  )
    .then((response) => response.json())
    .then((data) => {
      studentsData = data;
      populateTable(studentsData);
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Populate the table with student data
  function populateTable(data) {
    let tableHTML = "<table  class='student-table'>";
    tableHTML +=
      "<thead><tr><th>Id</th><th>Name</th><th>Email</th><th>Marks</th><th>Passing</th><th>Class</th><th>Gender</th></tr></thead>";
    data.forEach((student) => {
      const fullName = `${student.first_name} ${student.last_name}`;
      const passingStatus = student.passing ? "Passing" : "Failed";
      tableHTML += `<tr><td>${student.id}</td><td><img src="${student.img_src}" alt="${fullName}" width="50">${fullName}</td><td>${student.email}</td><td>${student.marks}</td><td>${passingStatus}</td><td>${student.class}</td><td>${student.gender}</td></tr>`;
    });
    tableHTML += "</table>";
    mainTable.innerHTML = tableHTML;
  }

  // Search functionality
  searchBtn.addEventListener("click", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = studentsData.filter(
      (student) =>
        student.first_name.toLowerCase().includes(searchTerm) ||
        student.last_name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );
    populateTable(filteredData);
  });

  // Sorting functionality
  sortByNameAZBtn.addEventListener("click", function () {
    studentsData.sort((a, b) =>
      (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name)
    );
    populateTable(studentsData);
  });

  sortByNameZABtn.addEventListener("click", function () {
    studentsData.sort((a, b) =>
      (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name)
    );
    populateTable(studentsData);
  });

  sortByMarksBtn.addEventListener("click", function () {
    studentsData.sort((a, b) => a.marks - b.marks);
    populateTable(studentsData);
  });

  sortByPassingBtn.addEventListener("click", function () {
    const passingStudents = studentsData.filter((student) => student.passing);
    populateTable(passingStudents);
  });

  sortByClassBtn.addEventListener("click", function () {
    studentsData.sort((a, b) => {
      // Ensure class values are strings
      const classA = String(a["class"]);
      const classB = String(b["class"]);
      // Extract numerical part of class
      const classANumber = Number(classA.replace(/[^0-9]/g, ""));
      const classBNumber = Number(classB.replace(/[^0-9]/g, ""));
      // Compare class values for ascending order
      return classANumber - classBNumber;
    });

    populateTable(studentsData);
  });

  sortByGenderBtn.addEventListener("click", function () {
    const femaleStudents = studentsData.filter(
      (student) => student.gender === "Female"
    );
    const maleStudents = studentsData.filter(
      (student) => student.gender === "Male"
    );
    console.log(femaleStudents);
    const sortedStudents = [...femaleStudents, ...maleStudents];
    // Populate the table with the sorted data
    populateTable(sortedStudents);
  });

  // Function to create and populate tables
  function createTable(title, data) {
    const table = document.createElement("table");
    table.classList.add("styled-table", "gender-table");

    let tableHTML = `<caption>${title}</caption>`;
    tableHTML +=
      "<thead><tr><th>Name</th><th>Email</th><th>Marks</th><th>Passing</th><th>Class</th><th>Gender</th></tr></thead><tbody>";

    data.forEach((student) => {
      const fullName = `${student.first_name} ${student.last_name}`;
      const passingStatus = student.passing ? "Passing" : "Failed";
      tableHTML += `<tr><td><img src="${student.img_src}" alt="${fullName}" width="50">${fullName}</td><td>${student.email}</td><td>${student.marks}</td><td>${passingStatus}</td><td>${student.class}</td><td>${student.gender}</td></tr>`;
    });

    tableHTML += "</tbody></table>";
    table.innerHTML = tableHTML;
    genderTables.appendChild(table);
  }
});
