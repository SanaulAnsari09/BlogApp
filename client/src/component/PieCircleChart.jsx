import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

function PieCircleChart({ data, color }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const label = data.length === 1 ? data[0].name : "Total";

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          position: "relative",
          width: 150,
          height: 150,
          margin: "0 auto",
        }}
      >
        <PieChart width={150} height={150}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={color || COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            lineHeight: "1.2",
          }}
        >
          <div>{total}</div>
          <div style={{ fontSize: "16px", fontWeight: "normal", color: color }}>
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PieCircleChart;
