import { useEffect, useRef } from "react";

export default function BarChart({ data, labels, cost, percent }) {
  const canvasRef = useRef(null);
  const barWidth = 40;
  const barGap = 20;
  const canvasHeight = 300;
  const canvasWidth = data.length * (barWidth + barGap) + 50;
  const radius = 10; // 🎯 radius for rounded corners

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxValue = Math.max(...data);

    const drawRoundedRect = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    };

    data.forEach((value, index) => {
      const x = index * (barWidth + barGap) + 50;
      const barHeight = (value / maxValue) * (canvasHeight - 100);
      const y = canvasHeight - barHeight - 50;

      ctx.fillStyle = "black";
      drawRoundedRect(x, y, barWidth, barHeight, radius);

      ctx.fillStyle = "black";
      ctx.font = "14px Arial";
      ctx.fillText(`฿${cost[index]}`, x + 5, y - 5);

      ctx.fillStyle = "red";
      ctx.fillText(`${percent[index]}%`, x + 5, canvasHeight - 30);

      ctx.fillStyle = "black";
      ctx.fillText(labels[index], x + 5, canvasHeight - 10);
    });
  }, [data, labels, cost, percent]);

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>;
}
