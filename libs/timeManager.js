let timeManager = null;

export const getTimeManagerInstance = (elements) => {
  if (!timeManager) {
    timeManager = new TimeManager(elements);
  } else {
    //すでにインスタンス化済
  }

  return timeManager;
};

class TimeManager {
  timerId = null;
  loaded = false;

  constructor(elements) {
    this.clockOuter = elements.clockOuter;
    this.hourHand = elements.hourHand;
    this.minuteHand = elements.minuteHand;
    this.secondHand = elements.secondHand;
    this.clockCore = elements.clockCore;
    this.clockLoading = elements.clockLoading;
  }

  updateSecond(now) {
    const currentSecond = now.getSeconds();
    this.secondHand.style.transform = `translateX(-50%) rotate(${
      currentSecond * 6
    }deg)`;
    return currentSecond;
  }

  updateMinute(now) {
    const currentMinute = now.getMinutes();
    this.minuteHand.style.transform = `translateX(-50%) rotate(${
      currentMinute * 6
    }deg)`;

    return currentMinute;
  }

  updateHour(now, currentMinute) {
    const currentHour = now.getHours();
    const currentAngle = currentHour * 30;
    this.hourHand.style.transform = `translateX(-50%) rotate(${
      currentAngle + (30 * currentMinute) / 100
    }deg)`;
  }

  tick() {
    const now = new Date();

    const currentSec = this.updateSecond(now);

    if (currentSec === 0 || !this.loaded) {
      const currentMin = this.updateMinute(now);
      this.updateHour(now, currentMin);

      if (!this.loaded) {
        this.loaded = true;
      }
    }

    if (this.loaded && this.clockCore.classList.contains("hidden")) {
      this.clockCore.classList.remove("hidden");
      this.clockLoading.classList.add("none");
    }
  }

  reset() {
    this.timerId = null;
    this.loaded = false;
  }

  start() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    this.timerId = setInterval(this.tick.bind(this), 1000);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    this.reset();
  }
}
