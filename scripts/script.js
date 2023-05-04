const dashboard = document.querySelector(".dashboard");

async function getJson() {
    const url = "scripts/data.json";
    const request = new Request(url);
    const response = await fetch(request);
    if(response.ok) {
        console.log("link responded correctly");
    } else {
        console.log("link error" + response.status);
    }
    const data = await response.json();

    createActivities(data);
}

function createActivities(data) {
    for(let i = 0; i < data.length; i++) {
        let icon = ("icon-" + data[i].title.toLowerCase() + ".svg").replace(" ", "-");
        const type = data[i].title.replace(" ", "-");
        const time = data[i].timeframes.weekly.current;
        const lastTime = data[i].timeframes.weekly.previous;

        const block = 
        `
        <img 
        src="images/${icon}" 
        alt=""
        aria-hidden="true"
        class="block_img">
        <div class="dashboard_activity">
          <div class="activity_header">
            <p class="header_type">${type}</p>
            <img 
            src="images/icon-ellipsis.svg" 
            alt=""
            aria-hidden="true"
            class="header_dots">
          </div>
          <div class="activity_time">
            <p class="time_current">${time}hrs</p>
            <p class="time_last">Last Week - ${lastTime}hrs</p>
          </div>
        </div>
        `;

        //create the element that will contain the component
        const div = document.createElement("div");
        div.setAttribute("class", "dashboard_block");
        div.setAttribute("id", type.toLowerCase());
        //insert the content using innerhtml
        div.innerHTML = block;
        //append content into dashboard
        dashboard.appendChild(div);
    }

    createEvents(data);
}

function createEvents(data) {
  const activities = document.querySelectorAll(".dashboard_activity");
  for(const activity of activities) {
    //hover and unhover for activity
    activity.addEventListener("mouseover", () => {
      activity.setAttribute("id", "mouseOver");
      activity.parentNode.style.transform = "translateY(-.5rem)";
    });
    activity.addEventListener("mouseout", () => {
      activity.setAttribute("id", "");
      activity.parentNode.style.transform = "translateY(0)";
    });
  }
  //hover and unhover for dots
  const dots = document.querySelectorAll(".header_dots");
  for(const dot of dots) {
    dot.addEventListener("mouseover", () => {
      dot.style.filter = "brightness(1.5)";
    });
    dot.addEventListener("mouseout", () => {
      dot.style.filter = "brightness(1)";
    });
  }
  //hover and unhover for time
  const times = document.querySelectorAll(".header_report_time button");
  let clicked = 1;
  for(let i = 0; i < times.length; i++) {
    times[i].addEventListener("mouseover", () => {
      if(i !== clicked) {
        times[i].style.color = "white";
      }
    });
    times[i].addEventListener("mouseout", () => {
      if(i !== clicked) {
        times[i].style.color = "inherit";
      }
    });
    //click for time
    const timeClicked = times[i];
    times[i].addEventListener("click", () => {
      if(i !== clicked) {
        times[i].style.color = "white";
        times[clicked].style.color = "inherit";
        clicked = i;
      }
      //function to change numbers based on data
      changeNumbers(data, timeClicked);
    });
  }
}

function changeNumbers(data, timeClicked) {
  const currentTimes = document.querySelectorAll(".time_current");
  const lastTimes = document.querySelectorAll(".time_last");

  const range = timeClicked.textContent.toLowerCase();
  if(range === "daily") {
    for(let i = 0; i < data.length; i++) {
      currentTimes[i].textContent = data[i].timeframes.daily.current + "hrs";
      lastTimes[i].textContent = "Last Day - " + data[i].timeframes.daily.previous + "hrs";
    }
  } else if (range === "weekly") {
    for(let i = 0; i < data.length; i++) {
      currentTimes[i].textContent = data[i].timeframes.weekly.current + "hrs";
      lastTimes[i].textContent = "Last Week - " + data[i].timeframes.weekly.previous + "hrs";
    }
  } else if (range === "monthly") {
    for(let i = 0; i < data.length; i++) {
      currentTimes[i].textContent = data[i].timeframes.monthly.current + "hrs";
      lastTimes[i].textContent = "Last Month - " + data[i].timeframes.monthly.previous + "hrs";
    }
  }
}

getJson();
