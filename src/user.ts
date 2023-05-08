interface iProjects {
    projectname: string,
    projectdescription: string,
    assigneduser: string,
    status: string,
    id: number
}

async function getProjectDetails() 
{
    const response = await fetch("http://localhost:3000/Projects")
    const projdetails = await response.json() as iProjects[]
    const projdivcont = document.querySelector("#projdivcont") as HTMLDivElement;
    const assigndivcont = document.querySelector("#assigndivcont") as HTMLDivElement;

    let html = '';
    let assignhtml = ''
    for(let i=0;i<projdetails.length;i++){
        if(projdetails[i]){
            html += `
            <details>
                <summary>
                <p>
                    <span>Project 1</span>
                    <span>${projdetails[i].assigneduser}</span>
                    <span id="pending"> Pending 
                        <img src="./images/done.png" id="pending-img" alt="icon">
                        <img src="./images/arrow-down.png" id="pending-img" alt=""></p>
                        <!-- formatted span tag correctly -->
                    </span>
                </summary>
                ${projdetails[i].projectdescription}
            </details>  `
        }
        if(projdetails[i].status == "completed"){
            assignhtml += `
            <details>
                <summary id="projdetails">
                    <p>
                        <span>${projdetails[i].projectname}</span>
                        <span id="projdoer">${projdetails[i].assigneduser}</span>
                        <span id="projstatus">${projdetails[i].status}</span>
                    </p>
                </summary>
                ${projdetails[i].projectdescription}
            </details>
            `            
        }
    }
    assigndivcont.innerHTML = html;
    projdivcont.innerHTML = assignhtml;  

}

getProjectDetails()