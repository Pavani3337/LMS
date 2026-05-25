// ================= LOGIN =================
function login() {
  const id = adminId.value;
  const pass = adminPass.value;

  if (id === "admin" && pass === "1234") {
    localStorage.setItem("login", "true");
    loginSuccess();
  } else {
    alert("Invalid Login");
  }
}

function logout() {
  localStorage.removeItem("login");
  location.reload();
}

function loginSuccess() {
  loginPage.style.display = "none";
  app.classList.remove("hidden");
  loadAll();
}

if (localStorage.getItem("login") === "true") {
  loginSuccess();
}

// ================= DATA =================
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

function deleteStudent(i) {
  students.splice(i, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
  loadDropdowns();
}

function renderStudents() {
  let search = searchStudent.value.toLowerCase();
  let html = "";

  students
    .filter(s => s.roll.toLowerCase().includes(search))
    .forEach((s, i) => {
      html += `
      <div class="card">
        ${s.name} - ${s.roll}
        <button onclick="deleteStudent(${i})">Delete</button>
      </div>`;
    });

  studentList.innerHTML = html;
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

function deleteBook(i) {
  books.splice(i, 1);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
  loadDropdowns();
}

function renderBooks() {
  let html = "";

  books.forEach((b, i) => {
    html += `
    <div class="card">
      ${b.name} - ${b.author}
      <button onclick="deleteBook(${i})">Delete</button>
    </div>`;
  });

  bookList.innerHTML = html;
}

// ================= ISSUE =================
function issueBook() {
  issued.push({
    student: selectStudent.value,
    book: selectBook.value,
    date: issueDate.value,
    returned: false
  });

  localStorage.setItem("issued", JSON.stringify(issued));
  renderIssued();
}

function returnBook(i) {
  issued[i].returned = true;
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
    </div>`;
  });

  issueList.innerHTML = html;
}

// ================= DROPDOWNS =================
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

// ================= LOAD ALL =================
function loadAll() {
  renderStudents();
  renderBooks();
  renderIssued();
  loadDropdowns();
}