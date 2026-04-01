import { useState } from "react";

function Sidebar() {
    const [open, setOpen] = useState(true);

    return (
        <div className={open ? "sidebar open" : "sidebar"}>
            <button onClick={() => setOpen(!open)}>☰</button>

            {open && (
                <ul>
                    <li>Dashboard</li>
                    <li>Candidates</li>
                    <li>Job Postings</li>
                    <li>Account</li>
                </ul>
            )}
        </div>
    );
}

export default Sidebar;