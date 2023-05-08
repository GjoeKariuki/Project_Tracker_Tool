"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Project {
    constructor(id, projectname, projectdescription, assigneduser, status) {
        this.id = id;
        this.projectname = projectname;
        this.projectdescription = projectdescription;
        this.assigneduser = assigneduser;
        this.status = status;
    }
}
exports.default = Project;
