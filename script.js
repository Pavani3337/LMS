const students = {
    CSE: [
        {
            name: "Pavani",
            roll: "22CSE001"
        },
        {
            name: "Raju",
            roll: "22CSE002"
        }
    ],

    ECE: [
        {
            name: "Sita",
            roll: "22ECE001"
        }
    ],

    EEE: [
        {
            name: "Kiran",
            roll: "22EEE001"
        }
    ]
};

let currentStudents = [];

function login(){

    let id =
        document.getElementById("adminId").value;

    let pass =
        document.getElementById("adminPass").value;

    if(id==="admin" && pass==="1234"){

        document.getElementById(
            "loginPage"
        ).classList.add("hidden");

        document.getElementById(
            "branchPage"
        ).classList.remove("hidden");

    }
    else{
        alert("Invalid Login");
    }
}

function showStudents(branch){

    currentStudents = students[branch];

    document.getElementById(
        "branchPage"
    ).classList.add("hidden");

    document.getElementById(
        "studentPage"
    ).classList.remove("hidden");

    loadStudents(currentStudents);
}

function loadStudents(data){

    let html="";

    data.forEach((s,index)=>{

        html += `
        <tr onclick="showProfile('${s.name}','${s.roll}')">
            <td>${index+1}</td>
            <td>${s.name}</td>
            <td>${s.roll}</td>
        </tr>`;
    });

    document.getElementById(
        "studentTable"
    ).innerHTML = html;
}

function searchStudent(){

    let value =
      document.getElementById(
      "searchBox"
      ).value.toLowerCase();

    let filtered =
      currentStudents.filter(
      s => s.roll.toLowerCase()
      .includes(value)
      );

    loadStudents(filtered);
}

function showProfile(name,roll){

    document.getElementById(
        "studentPage"
    ).classList.add("hidden");

    document.getElementById(
        "profilePage"
    ).classList.remove("hidden");

    document.getElementById(
        "studentName"
    ).innerText = name;

    document.getElementById(
        "studentRoll"
    ).innerText = roll;
}

function issueBook(){

    let table =
      document.getElementById(
      "bookTable"
      );

    let row =
      table.insertRow();

    row.innerHTML = `
      <td>${table.rows.length}</td>
      <td>Java</td>
      <td>Balagurusamy</td>
      <td>01-06-2026</td>
      <td>15-06-2026</td>
    `;
}