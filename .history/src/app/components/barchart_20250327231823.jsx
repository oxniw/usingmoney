import { useEffect, useRef } from "react";

export default function BarChart({ data, labels, cost, percent }) {
  const canvasRef = useRef(null);
  const barWidth = 40; // ✅ ความกว้างแท่งคงที่
  const barGap = 20;   // ✅ ระยะห่างระหว่างแท่ง
  const canvasHeight = 300;
  const canvasWidth = data.length * (barWidth + barGap) + 50; // ✅ คำนวณขนาด canvas

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxValue = Math.max(...data);
    data.forEach((value, index) => {
      const x = index * (barWidth + barGap) + 50;
      const barHeight = (value / maxValue) * (canvasHeight - 100);
      const y = canvasHeight - barHeight - 50;

      ctx.fillStyle = "black";
      ctx.fillRect(x, y, barWidth, barHeight);

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
