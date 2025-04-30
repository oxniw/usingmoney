import { useEffect, useRef } from "react";

export default function PieChartCanvas({
  data = [40, 30, 20, 10], // Default values
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"], // Default colors
  width = 200,
  height = 200,
  animationSpeed = 0.05, // Control speed
  ...props
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const total = data.reduce((sum, value) => sum + value, 0);
    let startAngles = Array(data.length).fill(0);
    let startTime;

    function drawChart(timestamp) {
      if (!startTime) startTime = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let startAngle = 0;

      data.forEach((value, i) => {
        const targetAngle = (value / total) * (Math.PI * 2);
        startAngles[i] = Math.min(startAngles[i] + animationSpeed, targetAngle);

        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, startAngle, startAngle + startAngles[i]);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length]; // Ensure colors wrap around
        ctx.fill();
        startAngle += startAngles[i];
      });

      if (startAngles.some((angle, i) => angle < (data[i] / total) * (Math.PI * 2))) {
        requestAnimationFrame(drawChart);
      }
    }

    requestAnimationFrame(drawChart);
  }, [data, colors, width, height, animationSpeed]);

  return <canvas ref={canvasRef} width={width} height={height} {...props} className="flex"></canvas>;
}
