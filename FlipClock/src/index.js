//创建根实例
import React from "react";
import { createRoot } from "react-dom/client";
import FlipClock from "./FlipClock";
// 挂载app组件
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<FlipClock />);
