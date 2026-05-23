import {
  alignClockNumbers,
  setVisibilityStateObserver,
  getElements,
} from "./libs/dom.js";
import { getTimeManagerInstance } from "./libs/timeManager.js";

const main = () => {
  try {
    const elements = getElements();

    alignClockNumbers(elements.clockNumbers);

    const timeManager = getTimeManagerInstance({
      hourHand: elements.hourHand,
      minuteHand: elements.minuteHand,
      secondHand: elements.secondHand,
      clockCore: elements.clockCore,
      clockLoading: elements.clockLoading,
      clockOuter: elements.clockOuter,
    });

    setVisibilityStateObserver(timeManager);

    timeManager.start();
  } catch (e) {
    alert(`何かがおかしいようです... \n${e.message ?? "unknown error"}`);
  }
};

main();
