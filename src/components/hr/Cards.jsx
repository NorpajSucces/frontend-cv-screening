import { useDispatch, useSelector } from "react-redux";
import { updateStats } from "../../store/index";

function Cards() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.dashboard);

    const handleChange = (key, value) => {
        dispatch(updateStats({ [key]: Number(value) }));
    };

    return (
        <div className="cards">
            {["totalVacancies", "totalApplicants", "accepted", "pending"].map(
                (key) => (
                    <input
                        key={key}
                        value={data[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                    />
                )
            )}
        </div>
    );
}

export default Cards;