import { useDispatch, useSelector } from "react-redux";
import {
    toggleSidebar,
} from "../../store/slices/sidebarSlice";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
    const dispatch = useDispatch();
    const { collapsed } = useSelector(
        (state) => state.sidebar
    );

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0" />
            <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                <header className="sidebar-header">
                    <button onClick={() => dispatch(toggleSidebar())} className="toggler">
                        <span className="material-symbols-rounded">dock_to_right</span>
                    </button>
                </header>

                <nav className="sidebar-nav">
                    <ul className="nav-list top-nav">
                        <li className="nav-item">
                            <NavLink to="/hr/dashboard" className="nav-link" data-title="Dashboard">
                                <span className="material-symbols-rounded">content_paste</span>
                                <span className="text">Dashboard</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/hr/candidates" className="nav-link" data-title="Candidates">
                                <span className="material-symbols-rounded">assignment</span>
                                <span className="text">Candidates</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/hr/job-postings" className="nav-link" data-title="Job Posting">
                                <span className="material-symbols-rounded">work_update</span>
                                <span className="text">Job Posting</span>
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="nav-list bottom-nav">
                        <li className="nav-item">
                            <NavLink to="/hr/account" className="nav-link" data-title="Account">
                                <span className="material-symbols-rounded">account_circle</span>
                                <span className="text">Account</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/hr/logout" className="nav-link" data-title="Log out">
                                <span className="material-symbols-rounded">logout</span>
                                <span className="text">Log out</span>
                            </NavLink>
                        </li>

                    </ul>
                </nav>

            </aside>
        </>
    );
}