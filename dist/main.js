"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let projectcards = document.querySelector(".projectcards");
let btn = document.querySelector(".btn");
let assigneduser = document.querySelector("#assigneduser");
let overviewcards = document.querySelector(".cards");
function renderoverview() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch("http://localhost:3000/Users");
        let userslist = yield res.json();
        let userscount = userslist.length - 1;
        let response = yield fetch("http://localhost:3000/Projects");
        let projects = yield response.json();
        let projectscount = projects.length;
        let completedProjects = projects.filter((project) => project.status === "completed");
        let pendingProjects = projects.filter((project) => project.status === "pending");
        let html = `
  <div class="card">
  <div class="logo" style="display: grid;">
      <ion-icon name="person-circle-outline"></ion-icon>
  </div>
  <h4>Total users</h4>
  <h5>${userscount}</h5>
</div>
<div class="card">
  <div class="logo" style="display: grid;">
      <img src="./images/dashborad1.jpg"/>
      <img src="./images/dashborad1.jpg" style="margin-top: 2px; margin-bottom: 8px;"/>
  </div>
  <h4>Total Projects</h4>
  <h5>${projectscount}</h5>
</div>
<div class="card">
  <div class="logo">
      <img src="/images/completed.jpg"/>
  </div>
  <h4 style="color: green;">Completed Projects</h4>
  <h5 style="color:green":>${completedProjects.length}</h5>
</div>
<div class="card">
  <div class="logo">
      <img src="./images/not_completed.jpg"/>
  </div>
  <h4 style="color: red;">Incomplete Projects</h4>
  <h5 style="color: red;">${pendingProjects.length}</h5>
</div> 
  `;
        overviewcards.innerHTML = html;
    });
}
renderoverview();
function renderprojects() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch("http://localhost:3000/Projects");
        let projects = yield response.json();
        projects.forEach((project) => {
            let html = `
        <div class="projectcard">
                   <h5>${project.projectname}</h5>
                   <h5>${project.assigneduser}</h5>
                   ${project.status == "completed"
                ? '<h5 style="color: green;">completed</h5>'
                : '<h5 style="color: red;">pending</h5>'}
                   
                   <div class="icons">
                       <ion-icon name="chevron-down-outline"></ion-icon>
                       <div class="dropdown">
                           <ion-icon name="ellipsis-vertical-circle-outline"></ion-icon>
                           <div class="dropdown-options">
                             <a style="cursor:pointer" onClick="updateProject(${project.id})">Update</a>
                             <a style="cursor:pointer" onClick="deleteProject(${project.id})">Delete</a>
                           </div>
                         </div>
                        
                   </div>
                </div>
        
        `;
            projectcards.innerHTML += html;
        });
    });
}
btn.addEventListener("click", () => {
    if ((btn === null || btn === void 0 ? void 0 : btn.innerHTML) === "Add Project") {
        addproject();
    }
});
function readvalues() {
    let projectname = document.querySelector("#projectname")
        .value;
    let projectdescription = document.querySelector("#projectdescription").value;
    let assigneduser = document.querySelector("#assigneduser").value;
    let formdata = {
        projectname,
        projectdescription,
        assigneduser,
        status: "pending",
    };
    return formdata;
}
function addproject() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch("http://localhost:3000/Projects", {
            method: "POST",
            body: JSON.stringify(readvalues()),
            headers: {
                "Content-Type": "application/json",
            },
        });
    });
}
function prePopulate(project) {
    document.querySelector("#projectname").value =
        project.projectname;
    document.querySelector("#projectdescription").value =
        project.projectdescription;
    document.querySelector("#assigneduser").value =
        project.assigneduser;
    document.querySelector(".btn").textContent = `Update Project`;
}
function updateProject(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:3000/Projects/${id}`);
        const project = yield response.json();
        console.log(id);
        prePopulate(project);
        const btn = document.querySelector(".btn");
        btn.addEventListener("click", () => {
            const updatedProject = readvalues();
            if (btn.innerHTML === "Update Project") {
                sendUpdate(Object.assign(Object.assign({}, updatedProject), { id }));
                console.log("Updating");
            }
        });
    });
}
function sendUpdate(project) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`http://localhost:3000/Projects/${project.id}`, {
            method: "PUT",
            body: JSON.stringify(project),
            headers: {
                "Content-Type": "application/json",
            },
        });
    });
}
function deleteProject(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`http://localhost:3000/Projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    });
}
function fetchusers() {
    return __awaiter(this, void 0, void 0, function* () {
        const projects = yield fetch(" http://localhost:3000/Projects");
        const rprojects = yield projects.json();
        const response = yield fetch("http://localhost:3000/Users");
        const users = yield response.json();
        const unassignedUsers = users.filter((user) => {
            // Check if the user's username is not present in the assigneduser property of any project
            return (!rprojects.some((project) => {
                return project.assigneduser === user.username;
            }) && user.username !== "admin");
        });
        console.log(unassignedUsers); // This will log an array of users that are not assigned to any project
        unassignedUsers.forEach((user) => {
            let html = `<option>${user.username}</option>`;
            assigneduser.innerHTML += html;
        });
    });
}
renderprojects();
fetchusers();
