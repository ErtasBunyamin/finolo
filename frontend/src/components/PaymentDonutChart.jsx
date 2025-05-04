import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

const COLORS = ["#34D399", "#F87171"]; // yeşil & kırmızı

function PaymentDonutChart({ data }) {
    const chartData = Object.entries(data).map(([label, value]) => ({
        name: label,
        value,
    }));

    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                    label
                >
                    {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default PaymentDonutChart;
