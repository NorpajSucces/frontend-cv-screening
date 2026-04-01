import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/slices/sidebarSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.sidebar.collapsed);

  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
      <button
        onClick={() => dispatch(toggleSidebar())}
        title="Toggle sidebar"
      >
        ☰
      </button>

      <ul>
        <li>Dashboard</li>
        <li>Candidates</li>
        <li>Job Postings</li>
        <li>Account</li>
      </ul>
    </div>
  );
}