import { toRadian } from "./utils.js";

const elements = {
  clockNumbers: document.querySelectorAll(".clock-number"),
  clockOuter: document.querySelector(".clock-outer"),
  hourHand: document.querySelector(".clock-hand-hour"),
  minuteHand: document.querySelector(".clock-hand-minute"),
  secondHand: document.querySelector(".clock-hand-second"),
  clockCore: document.querySelector(".clock-core"),
  clockLoading: document.querySelector(".clock-loading"),
};

const radiusBuffer = 40;
const radius = elements ? elements.clockOuter.clientWidth / 2 : 0;
const radiusWithBuffer = radius - radiusBuffer;

export const getElements = () => {
  if (Object.values(elements).some((ele) => !ele)) {
    throw new Error("必要なDOMが不足しています。");
  }
  if (elements.clockNumbers.length !== 12) {
    throw new Error("時計の数値に誤りがあります。");
  }

  return elements;
};

export const alignClockNumbers = (clockNumbers) => {
  clockNumbers.forEach((clockNum, i) => {
    // 12時から始めたいので -90度
    const angle = (i + 1) * 30 - 90;

    const x = radiusWithBuffer * Math.cos(toRadian(angle)) + radius;
    const y = radiusWithBuffer * Math.sin(toRadian(angle)) + radius;

    clockNum.style.left = `${x}px`;
    clockNum.style.top = `${y}px`;
    clockNum.style.transform = "translate(-50%, -50%)";
    clockNum.classList.remove("hidden");
  });
};

export const setVisibilityStateObserver = (timeManager) => {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      timeManager.stop();
    } else {
      timeManager.start();
    }
  });
};
