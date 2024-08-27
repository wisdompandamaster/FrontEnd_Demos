import React, { useEffect, useState } from "react";
import "./FlipClock.css";
import redLogo from "../public/assets/logo_red.png";
import whiteLogo from "../public/assets/logo_white.png";

const Setting = (props) => {
  let img_src = props.passed ? redLogo : whiteLogo;

  const handleOnKeyDown = (e) => {
    // YYYY-MM-DD的正则表达式
    let dateRegex = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2]\d|3[0-1])$/;
    if (e.keyCode == 13) {
      console.log(e.target.value);
      let date = e.target.value;
      // 添加正则表达
      if (dateRegex.test(date)) {
        localStorage.setItem("ddl", date);
        props.setValue(date);
        e.target.value = "";
      } else {
        e.target.value = "";
        e.target.placeholder = "YYYY-MM-DD";
      }
    }
  };

  const formatDate = (date) => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + "-" + month + "-" + day;
  };

  return (
    <div className="setting">
      <img src={img_src} />
      <input
        className="ddl"
        placeholder={formatDate(new Date(props.value))}
        onKeyDown={handleOnKeyDown}
      ></input>
    </div>
  );
};

const FlipClock = () => {
  // 初始设置为后两天,如果本地没有存储的话
  const [ddl, setDdl] = useState(
    new Date(
      localStorage.getItem("ddl")
        ? localStorage.getItem("ddl")
        : new Date().setDate(new Date().getDate() + 2)
    )
  );

  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const countToDate = ddl;

    let previousTimeBetweenDates;

    // 250ms 刷新一次
    const interval = setInterval(() => {
      const currentDate = new Date();
      const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
      if (timeBetweenDates < 0) {
        setPassed(true);
      }
      flipAllCards(Math.abs(timeBetweenDates));
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

    return () => {
      clearInterval(interval);
    };
  }, [ddl]);

  const setValue = (date) => {
    setDdl(new Date(date));
    if (new Date(date) - new Date() > 0) {
      setPassed(false);
    }
  };

  return (
    <>
      <Setting setValue={setValue} value={ddl} passed={passed} />
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
      <a className="ICPinfo" href="https://beian.miit.gov.cn/" target="_blank">
        备案号：蜀ICP备2023022103号-1
      </a>
    </>
  );
};

export default FlipClock;
