import { PieChart, Pie, Cell } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/index";

function PieChartBox() {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.dashboard);

    return (
        <PieChart width={300} height={300}>
            <Pie
                data={categories}
                dataKey="value"
                nameKey="name"
                onClick={(data, index) =>
                    dispatch(setCategory(categories[index].name))
                }
            >
                {categories.map((entry, index) => (
                    <Cell key={index} />
                ))}
            </Pie>
        </PieChart>
    );
}

export default PieChartBox;