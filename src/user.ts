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
    let html = '';
    for(let i=0;i<projdetails.length;i++){
        if(projdetails[i]){
            html += `
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

}