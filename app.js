const currentTime = document.querySelector("h1"),
  content = document.querySelector(".content"),
  selectMenu = document.querySelectorAll("select"),
  setAlarmBtn = document.querySelector(".btn-1"),
  snoozeAlarmBtn = document.querySelector(".btn-2"),
  deleteAlarmBtn = document.querySelector(".btn-3"),
  displayAlarmTime = document.querySelector(".display-alarm"),
  displayAlarCard = document.querySelector(".main-content");

snoozeAlarmBtn.disabled = false;

let alarmTime,
  isAlarmSet,
  ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

let count = 0;

class Alarm {
  constructor() {
    this.alarmTime;
    this.isAlarmSet;
    this.ringtone = new Audio("./files/ringtone.mp3");
  }
  setTimeOut() {
    setInterval(() => {
      let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";
      if (h >= 12) {
        h = h - 12;
        ampm = "PM";
      }
      h = h == 0 ? (h = 12) : h;
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

      if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
      }
      //   displayAlarmTime.innerText = alarmTime;
    });
  } //   end of setTimeOut()

  setAlarm() {
    if (isAlarmSet) {
      alarmTime = "";
      ringtone.pause();
      content.classList.remove("disable");
      setAlarmBtn.innerText = "Set Alarm";
      return (isAlarmSet = false);
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (
      time.includes("Hour") ||
      time.includes("Minute") ||
      time.includes("AM/PM")
    ) {
      return alert("Please, select a valid time to set Alarm!");
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Pause Alarm";
    displayAlarCard.innerHTML = `
    <div class="setAlarm">
    <div class="alarm-card">
      <div class="alarm-time">
        <h2 class="display-alarm">${alarmTime}</h2>
      </div>
      <div class="alarm-buttons">
        <button class="btn-2">Snooze</button>
        <button class="btn-3">Delete</button>
      </div>
    </div>
  </div>
    `;
  }

  snoozeAlarm(count) {
    count += 1;
    if (count > 3) {
      snoozeAlarmBtn.disabled = true;
      return alert("You can only snooze the alarm for 3 times!");
    }
    //snooze set alarm for 5 minutes
    let date = new Date(),
      h = date.getHours(),
      m = date.getMinutes(),
      ampm = "AM";
    if (h >= 12) {
      h = h - 12;
      ampm = "PM";
    }
    h = h == 0 ? (h = 12) : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    m = parseInt(m) + 5;
    m = m < 10 ? "0" + m : m;
    alarmTime = `${h}:${m} ${ampm}`;
    console.log(alarmTime);
    ringtone.pause();
  }

  deleteAlarm() {
    setAlarmBtn.innerText = "Set Alarm";
    content.classList.remove("disable");
    displayAlarCard.innerHTML = "";
    ringtone.pause();
  }
}

const alarm = new Alarm();
alarm.setTimeOut();
setAlarmBtn.addEventListener("click", alarm.setAlarm);
snoozeAlarmBtn.addEventListener("click", alarm.snoozeAlarm(count));
deleteAlarmBtn.addEventListener("click", alarm.deleteAlarm);
