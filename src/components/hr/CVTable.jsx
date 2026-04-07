import { useDispatch, useSelector } from "react-redux";
import { sortByName, sortByScore } from "../../store/slices/dashboardSlice";
import { useState } from "react";
import "./CVTable.css"

export default function CVTable() {
    const { applicantsData } = useSelector((state) => state.dashboard);
    const dispatch = useDispatch();

    const [nameOrder, setNameOrder] = useState("asc");
    const [scoreOrder, setScoreOrder] = useState("asc");

    return (
        <div className="table-container">
            <table className="cv-table">
                <thead>
                    <tr>
                        <th onClick={() => {
                            const newOrder = nameOrder === "asc" ? "desc" : "asc";
                            setNameOrder(newOrder);
                            dispatch(sortByName(newOrder));
                        }}>
                            Candidate Name
                        </th>

                        <th onClick={() => {
                            const newOrder = scoreOrder === "asc" ? "desc" : "asc";
                            setScoreOrder(newOrder);
                            dispatch(sortByScore(newOrder));
                        }}>
                            CV Score
                        </th>

                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {applicantsData.map((c, i) => (
                        <tr key={i}>
                            <td>{c.name}</td>
                            <td>{c.score}%</td>
                            <td>  <span className={`status-${c.status}`}>
                                {c.status}
                            </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}