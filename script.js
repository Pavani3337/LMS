// -------------------------
// ADMIN LOGIN
// -------------------------

const ADMIN_ID = "admin";
const ADMIN_PASSWORD = "1234";

let selectedBranch = "";
let selectedStudent = null;

// -------------------------
// INITIAL LOAD
// -------------------------

window.onload = function () {

    if (!localStorage.getItem("students")) {
        localStorage.setItem("students", JSON.stringify([]));
    }

    if (!localStorage.getItem("books")) {
        localStorage.setItem("books", JSON.stringify([]));
    }

};

// -------------------------
// LOGIN
// -------------------------

function login() {

    const id =
        document.getElementById("adminId").value;

    const password =
        document.getElementById("adminPassword").value;

    if (
        id === ADMIN_ID &&
        password === ADMIN_PASSWORD
    ) {

        hideAllPages();

        document
            .getElementById("dashboardPage")
            .classList.remove("hidden");

    } else {

        alert("Invalid Login");

    }
}

// -------------------------
// LOGOUT
// -------------------------

function logout() {

    hideAllPages();

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

}

// -------------------------
// PAGE NAVIGATION
// -------------------------

function hideAllPages() {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.add("hidden");

        });

}

function goDashboard() {

    hideAllPages();

    document
        .getElementById("dashboardPage")
        .classList.remove("hidden");

}

function showBranchPage() {

    hideAllPages();

    document
        .getElementById("branchPage")
        .classList.remove("hidden");

}

function showStudentRegistration() {

    hideAllPages();

    document
        .getElementById("studentRegistrationPage")
        .classList.remove("hidden");

}

function showBooksPage() {

    hideAllPages();

    document
        .getElementById("booksPage")
        .classList.remove("hidden");

    loadBooks();

}

// -------------------------
// STUDENT REGISTRATION
// -------------------------

function registerStudent() {

    const name =
        document.getElementById("studentName").value;

    const roll =
        document.getElementById("studentRoll").value;

    const branch =
        document.getElementById("studentBranch").value;

    const photo =
        document.getElementById("studentPhotoUrl").value;

    if (
        !name ||
        !roll ||
        !branch
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

        name: name,

        roll: roll,

        branch: branch,

        photo: photo,

        issuedBooks: []

    });

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    alert("Student Registered");

    document.getElementById("studentName").value = "";
    document.getElementById("studentRoll").value = "";
    document.getElementById("studentPhotoUrl").value = "";

}

// -------------------------
// ADD BOOK
// -------------------------

function addBook() {

    const serial =
        document.getElementById("bookSerial").value;

    const bookName =
        document.getElementById("bookName").value;

    const author =
        document.getElementById("bookAuthor").value;

    if (
        !serial ||
        !bookName ||
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

        serial: serial,

        name: bookName,

        author: author

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

// -------------------------
// LOAD BOOKS TABLE
// -------------------------

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