const ADMIN_ID = "admin";
const ADMIN_PASSWORD = "1234";

let currentBranch = "";
let currentStudent = null;

function initStorage() {
    if (!localStorage.getItem("students")) {
        localStorage.setItem("students", JSON.stringify([]));
    }

    if (!localStorage.getItem("books")) {
        localStorage.setItem("books", JSON.stringify([]));
    }
}

window.onload = function () {
    initStorage();
};

function login() {

    const id =
        document.getElementById("adminId").value;

    const password =
        document.getElementById("adminPassword").value;

    if (
        id === ADMIN_ID &&
        password === ADMIN_PASSWORD
    ) {

        document
            .getElementById("loginPage")
            .classList.add("hidden");

        document
            .getElementById("dashboardPage")
            .classList.remove("hidden");

    }
    else {

        alert("Invalid Login");

    }
}

function logout() {

    location.reload();

}

function hideSections() {

    document
        .querySelectorAll(".section")
        .forEach(section => {

            section.classList.add("hidden");

        });

}

function showSection(id) {

    hideSections();

    document
        .getElementById(id)
        .classList.remove("hidden");

    if (id === "booksSection") {
        loadBooks();
    }

}

function registerStudent() {

    const name =
        document.getElementById("studentName").value;

    const roll =
        document.getElementById("studentRoll").value;

    const branch =
        document.getElementById("studentBranch").value;

    const photo =
        document.getElementById("studentPhoto").value;

    if (
        !name ||
        !roll
    ) {

        alert("Fill all fields");
        return;

    }

    const students =
        JSON.parse(
            localStorage.getItem("students")
        );

    students.push({

        id: Date.now(),

        name,

        roll,

        branch,

        photo,

        issuedBooks: []

    });

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    alert("Student Registered");

    document.getElementById("studentName").value = "";
    document.getElementById("studentRoll").value = "";
    document.getElementById("studentPhoto").value = "";

}

function addBook() {

    const serial =
        document.getElementById("bookSerial").value;

    const name =
        document.getElementById("bookName").value;

    const author =
        document.getElementById("bookAuthor").value;

    if (
        !serial ||
        !name ||
        !author
    ) {

        alert("Fill all fields");
        return;

    }

    const books =
        JSON.parse(
            localStorage.getItem("books")
        );

    books.push({
        serial,
        name,
        author
    });

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );

    loadBooks();

    document.getElementById("bookSerial").value = "";
    document.getElementById("bookName").value = "";
    document.getElementById("bookAuthor").value = "";

}

function loadBooks() {

    const books =
        JSON.parse(
            localStorage.getItem("books")
        );

    let html = "";

    books.forEach(book => {

        html += `
        <tr>
            <td>${book.serial}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
        </tr>
        `;

    });

    document.getElementById(
        "booksTable"
    ).innerHTML = html;

}

// =========================
// PART 2
// STUDENTS + BRANCHES
// =========================

function loadStudents(branch) {

    currentBranch = branch;

    hideSections();

    document
        .getElementById("studentsSection")
        .classList.remove("hidden");

    const students =
        JSON.parse(
            localStorage.getItem("students")
        );

    const filteredStudents =
        students.filter(
            student =>
                student.branch === branch
        );

    renderStudents(filteredStudents);

}

function renderStudents(students) {

    let html = "";

    students.forEach((student, index) => {

        html += `
        <tr onclick="showProfile(${student.id})">
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.roll}</td>
        </tr>
        `;

    });

    document
        .getElementById("studentsTable")
        .innerHTML = html;

}

function searchStudent() {

    const value =
        document
        .getElementById("searchBox")
        .value
        .toLowerCase();

    const students =
        JSON.parse(
            localStorage.getItem("students")
        );

    const filtered =
        students.filter(student => {

            return (
                student.branch === currentBranch &&
                student.roll
                    .toLowerCase()
                    .includes(value)
            );

        });

    renderStudents(filtered);

}

function showProfile(studentId) {

    hideSections();

    document
        .getElementById("profileSection")
        .classList.remove("hidden");

    const students =
        JSON.parse(
            localStorage.getItem("students")
        );

    currentStudent =
        students.find(
            student =>
                student.id == studentId
        );

    document
        .getElementById("profileName")
        .innerText =
        currentStudent.name;

    document
        .getElementById("profileRoll")
        .innerText =
        "Roll Number : " +
        currentStudent.roll;

    document
        .getElementById("profileBranch")
        .innerText =
        "Branch : " +
        currentStudent.branch;

    document
        .getElementById("profilePhoto")
        .src =
        currentStudent.photo ||
        "https://via.placeholder.com/120";

    loadIssuedBooks();

}

// =========================
// PART 3
// ISSUE BOOKS
// =========================

function loadIssuedBooks() {

    let html = "";

    if (!currentStudent.issuedBooks) {
        currentStudent.issuedBooks = [];
    }

    currentStudent.issuedBooks.forEach((book, index) => {

        html += `
        <tr>
            <td>${index + 1}</td>
            <td>${book.bookName}</td>
            <td>${book.author}</td>
            <td>${book.issueDate}</td>
            <td>${book.dueDate}</td>
        </tr>
        `;

    });

    document
        .getElementById("issuedTable")
        .innerHTML = html;

}

function showIssueBook() {

    document
        .getElementById("issueArea")
        .classList.remove("hidden");

    const books =
        JSON.parse(
            localStorage.getItem("books")
        );

    let options =
        `<option value="">Select Book</option>`;

    books.forEach(book => {

        options += `
        <option value="${book.serial}">
            ${book.name} - ${book.author}
        </option>
        `;

    });

    document
        .getElementById("bookSelect")
        .innerHTML = options;

}

function issueBook() {

    const selectedSerial =
        document
        .getElementById("bookSelect")
        .value;

    const issueDate =
        document
        .getElementById("issueDate")
        .value;

    const dueDate =
        document
        .getElementById("dueDate")
        .value;

    if (
        !selectedSerial ||
        !issueDate ||
        !dueDate
    ) {

        alert(
            "Please fill all fields"
        );

        return;

    }

    const books =
        JSON.parse(
            localStorage.getItem("books")
        );

    const selectedBook =
        books.find(
            book =>
                book.serial === selectedSerial
        );

    if (!selectedBook) {

        alert("Book not found");

        return;

    }

    const students =
        JSON.parse(
            localStorage.getItem("students")
        );

    const studentIndex =
        students.findIndex(
            student =>
                student.id === currentStudent.id
        );

    if (studentIndex === -1) {

        alert("Student not found");

        return;

    }

    students[
        studentIndex
    ].issuedBooks.push({

        bookName:
            selectedBook.name,

        author:
            selectedBook.author,

        issueDate:
            issueDate,

        dueDate:
            dueDate

    });

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    currentStudent =
        students[studentIndex];

    loadIssuedBooks();

    document
        .getElementById("issueArea")
        .classList.add("hidden");

    document
        .getElementById("issueDate")
        .value = "";

    document
        .getElementById("dueDate")
        .value = "";

    alert("Book Issued Successfully");

}