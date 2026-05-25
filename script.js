// ================= LOGIN =================
function login() {
  const id = document.getElementById("adminId").value;
  const pass = document.getElementById("adminPass").value;

  if (id === "admin" && pass === "1234") {
    localStorage.setItem("login", "true");
    showApp();
  } else {
    alert("Invalid Login");
  }
}

function logout() {
  localStorage.removeItem("login");
  location.reload();
}

function showApp() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("app").classList.remove("hidden");
  loadAll();
}

// auto login
if (localStorage.getItem("login") === "true") {
  showApp();
}

// ================= DATA =================
let students = JSON.parse(localStorage.getItem("students")) || [];
let books = JSON.parse(localStorage.getItem("books")) || [];
let issued = JSON.parse(localStorage.getItem("issued")) || [];

// ================= TAB =================
function showTab(tab) {
  let sections = document.querySelectorAll(".tab");
  sections.forEach(s => s.classList.add("hidden"));
  document.getElementById(tab).classList.remove("hidden");
}

// ================= STUDENTS =================
function addStudent() {
  let name = document.getElementById("sName").value;
  let roll = document.getElementById("sRoll").value;

  if (!name || !roll) {
    alert("Enter student details");
    return;
  }

  students.push({ name, roll });
  localStorage.setItem("students", JSON.stringify(students));

  document.getElementById("sName").value = "";
  document.getElementById("sRoll").value = "";

  renderStudents();
  loadDropdowns();
}

function renderStudents() {
  let search = document.getElementById("searchStudent").value.toLowerCase();
  let html = "";

  students
    .filter(s => s.roll.toLowerCase().includes(search))
    .forEach((s, i) => {
      html += `
        <div class="card">
          ${s.name} - ${s.roll}
        </div>
      `;
    });

  document.getElementById("studentList").innerHTML = html;
}

// ================= BOOKS =================
function addBook() {
  let name = document.getElementById("bName").value;
  let author = document.getElementById("bAuthor").value;

  if (!name || !author) {
    alert("Enter book details");
    return;
  }

  books.push({ name, author });
  localStorage.setItem("books", JSON.stringify(books));

  document.getElementById("bName").value = "";
  document.getElementById("bAuthor").value = "";

  renderBooks();
  loadDropdowns();
}

function renderBooks() {
  let html = "";

  books.forEach(b => {
    html += `
      <div class="card">
        ${b.name} - ${b.author}
      </div>
    `;
  });

  document.getElementById("bookList").innerHTML = html;
}

// ================= ISSUE BOOK =================
function issueBook() {
  let student = document.getElementById("selectStudent").value;
  let book = document.getElementById("selectBook").value;
  let date = document.getElementById("issueDate").value;

  if (!student || !book || !date) {
    alert("Fill all fields");
    return;
  }

  issued.push({ student, book, date, returned: false });
  localStorage.setItem("issued", JSON.stringify(issued));

  renderIssued();
}

// return book
function returnBook(index) {
  issued[index].returned = true;
  localStorage.setItem("issued", JSON.stringify(issued));
  renderIssued();
}

function renderIssued() {
  let html = "";

  issued.forEach((i, index) => {
    html += `
      <div class="card">
        ${i.student} → ${i.book} (${i.date})
        <b>${i.returned ? "Returned" : "Not Returned"}</b>

        ${!i.returned ? `<button onclick="returnBook(${index})">Return</button>` : ""}
      </div>
    `;
  });

  document.getElementById("issueList").innerHTML = html;
}

// ================= DROPDOWN =================
function loadDropdowns() {
  let s = "";
  students.forEach(st => {
    s += `<option value="${st.name}">${st.name}</option>`;
  });
  document.getElementById("selectStudent").innerHTML = s;

  let b = "";
  books.forEach(bk => {
    b += `<option value="${bk.name}">${bk.name}</option>`;
  });
  document.getElementById("selectBook").innerHTML = b;
}

// ================= LOAD ALL =================
function loadAll() {
  renderStudents();
  renderBooks();
  renderIssued();
  loadDropdowns();
}