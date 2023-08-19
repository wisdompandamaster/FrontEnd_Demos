import React, { useEffect } from "react";
import "./FlipClock.css";

const FlipClock = () => {
  useEffect(() => {
    const countToDate = new Date("2023-12-24");
    let previousTimeBetweenDates;

    // 250ms 刷新一次
    setInterval(() => {
      const currentDate = new Date();
      const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
      flipAllCards(timeBetweenDates);
      previousTimeBetweenDates = timeBetweenDates;
    }, 250);

    // 设置要更新的数字
    function flipAllCards(time) {
      const seconds = time % 60;
      const minutes = Math.floor((time / 60) % 60);
      const hours = Math.floor(time / 3600) % 24;
      const days = Math.floor(time / (3600 * 24));

      flip(document.querySelector("[data-days-huns]"), Math.floor(days / 100));
      flip(
        document.querySelector("[data-days-tens]"),
        Math.floor(((days % 100) - (days % 10)) / 10)
      );
      flip(document.querySelector("[data-days-ones]"), Math.floor(days % 10));
      flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
      flip(document.querySelector("[data-hours-ones]"), hours % 10);
      flip(
        document.querySelector("[data-minutes-tens]"),
        Math.floor(minutes / 10)
      );
      flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
      flip(
        document.querySelector("[data-seconds-tens]"),
        Math.floor(seconds / 10)
      );
      flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
    }

    // 翻动动画
    function flip(flipCard, newNumber) {
      const top = flipCard.querySelector(".top");
      const startNumber = parseInt(top.textContent);
      if (newNumber === startNumber) return;

      const bottom = flipCard.querySelector(".bottom");
      // 创造翻盖元素
      const topFlip = document.createElement("div");
      const bottomFlip = document.createElement("div");
      topFlip.classList.add("top-flip");
      bottomFlip.classList.add("bottom-flip");

      // 设置初始数字
      top.textContent = startNumber;
      bottom.textContent = startNumber;
      topFlip.textContent = startNumber;
      bottomFlip.textContent = newNumber;

      topFlip.addEventListener("animationstart", (e) => {
        top.textContent = newNumber;
      });
      topFlip.addEventListener("animationend", (e) => {
        topFlip.remove();
      });
      bottomFlip.addEventListener("animationend", (e) => {
        bottom.textContent = newNumber;
        bottomFlip.remove();
      });
      // 添加翻盖元素
      flipCard.append(topFlip, bottomFlip);
    }
  }, []);

  return (
    <div className="container">
      <div className="container-segment">
        <div className="label">Days</div>
        <div className="flip-card" data-days-huns>
          <div className="top">0</div>
          <div className="bottom">0</div>
        </div>
        <div className="flip-card" data-days-tens>
          <div className="top">0</div>
          <div className="bottom">0</div>
        </div>
        <div className="flip-card" data-days-ones>
          <div className="top">0</div>
          <div className="bottom">0</div>
        </div>
      </div>
      <div className="container-segment">
        <div className="label">Hours</div>
        <div className="flip-card" data-hours-tens>
          <div className="top">0</div>
          <div className="bottom">0</div>
        </div>
        <div className="flip-card" data-hours-ones>
          <div className="top">0</div>
          <div className="bottom">0</div>
        </div>
      </div>
      <div className="container-segment">
        <div className="label">Minutes</div>
        <div className="flip-card" data-minutes-tens>
          <div className="top">0</div>
          <div className="bottom">0</div>
        </div>
        <div className="flip-card" data-minutes-ones>
          <div className="top">0</div>
          <div className="bottom">0</div>
        </div>
      </div>
      <div className="container-segment">
        <div className="label">Seconds</div>
        <div className="flip-card" data-seconds-tens>
          <div className="top">0</div>
          <div className="bottom">0</div>
        </div>
        <div className="flip-card" data-seconds-ones>
          <div className="top">0</div>
          <div className="bottom">0</div>
        </div>
      </div>
    </div>
  );
};

export default FlipClock;
