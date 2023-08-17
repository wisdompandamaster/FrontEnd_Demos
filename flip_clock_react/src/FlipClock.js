import React, { useEffect } from "react";
import "./FlipClock.css";

const FlipClock = () => {
  useEffect(() => {
    const startNumber = 9;
    const flipCard = document.querySelector(".flip-card");
    const top = document.querySelector(".top");
    const bottom = document.querySelector(".bottom");

    // 创造翻盖元素
    const topFlip = document.createElement("div");
    const bottomFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    bottomFlip.classList.add("bottom-flip");

    // 设置初始数字
    top.textContent = startNumber;
    bottom.textContent = startNumber;
    topFlip.textContent = startNumber;
    bottomFlip.textContent = startNumber - 1;

    topFlip.addEventListener("animationstart", (e) => {
      top.textContent = startNumber - 1;
    });
    topFlip.addEventListener("animationend", (e) => {
      topFlip.remove();
    });
    bottomFlip.addEventListener("animationend", (e) => {
      bottom.textContent = startNumber - 1;
      bottomFlip.remove();
    });

    // 添加翻盖元素
    flipCard.append(topFlip, bottomFlip);
  }, []);

  return (
    <div className="flip-card">
      <div className="top">5</div>
      <div className="bottom">5</div>
    </div>
  );
};

export default FlipClock;
