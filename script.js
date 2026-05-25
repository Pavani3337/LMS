// ================= LOGIN =================
function login() {
  const id = document.getElementById("adminId").value;
  const pass = document.getElementById("adminPass").value;

  if (id === "admin" && pass === "1234") {
    localStorage.setItem("loggedIn", "true");
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
    loadAll();
  } else {
    alert("Invalid Login");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  location.reload();
}

// Auto login check
if (localStorage.getItem("loggedIn") === "true") {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("app").classList.remove("hidden");
  loadAll();
}

// ================= STORAGE =================
let students = JSON.parse(localStorage.getItem("students")) || [];
let books = JSON.parse(localStorage.getItem("books")) || [];
let issued = JSON.parse(localStorage.getItem("issued")) || [];

// ================= TABS =================
function showTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(tab).classList.remove("hidden");
}

// ================= STUDENTS =================
function addStudent() {
  students.push({
    name: sName.value,
    roll: sRoll.value
  });

  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
  loadDropdowns();
}

function renderStudents() {
  let search = document.getElementById("searchStudent").value.toLowerCase();

  let html = "";
  students
    .filter(s => s.roll.toLowerCase().includes(search))
    .forEach((s, i) => {
      html += `<div class="card">${s.name} - ${s.roll}</div>`;
    });

  document.getElementById("studentList").innerHTML = html;
}

// ================= BOOKS =================
function addBook() {
  books.push({
    name: bName.value,
    author: bAuthor.value
  });

  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
  loadDropdowns();
}

function renderBooks() {
  let html = "";

  books.forEach(b => {
    html += `<div class="card">${b.name} - ${b.author}</div>`;
  });

  document.getElementById("bookList").innerHTML = html;
}

// ================= ISSUE BOOK =================
function loadDropdowns() {
  let s = "";
  students.forEach(st => {
    s += `<option value="${st.roll}">${st.name}</option>`;
  });
  selectStudent.innerHTML = s;

  let b = "";
  books.forEach(bk => {
    b += `<option value="${bk.name}">${bk.name}</option>`;
  });
  selectBook.innerHTML = b;
}

function issueBook() {
  issued.push({
    student: selectStudent.value,
    book: selectBook.value,
    date: issueDate.value
  });

  localStorage.setItem("issued", JSON.stringify(issued));
  renderIssued();
}

function renderIssued() {
  let html = "";

  issued.forEach(i => {
    html += `<div class="card">
      ${i.student} → ${i.book} (${i.date})
    </div>`;
  });

  document.getElementById("issueList").innerHTML = html;
}

// ================= LOAD ALL =================
function loadAll() {
  renderStudents();
  renderBooks();
  renderIssued();
  loadDropdowns();
}