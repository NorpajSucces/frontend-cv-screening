export default function ApplicantsChart() {
    const data = [5, 8, 4, 7];

    return (
        <div className="card">
            <h3>Applicants Overview</h3>

            <div className="bar-chart">
                {data.map((val, i) => (
                    <div
                        key={i}
                        className="bar"
                        style={{ height: `${val * 20}px` }}
                    />
                ))}
            </div>
        </div>
    );
}