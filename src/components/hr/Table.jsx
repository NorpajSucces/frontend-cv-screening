import { useDispatch, useSelector } from "react-redux";
import { sortByName, sortByScore } from "../../store/index";

function Table() {
    const dispatch = useDispatch();
    const { tableData, selectedCategory } = useSelector(
        (state) => state.dashboard
    );

    // 🔥 FILTER BERDASARKAN PIE CHART
    const filteredData =
        selectedCategory === "All"
            ? tableData
            : tableData.filter((item) => item.category === selectedCategory);

    return (
        <div>
            <h3>Recent CV Screening ({selectedCategory})</h3>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => dispatch(sortByName("asc"))}>
                            Candidate Name
                        </th>
                        <th onClick={() => dispatch(sortByScore("desc"))}>
                            CV Score
                        </th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredData.map((item, i) => (
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.score}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;