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
          <div class="activity_content">
            <p class="content_type">${type}</p>
            <p class="content_time">${time}hrs</p>
          </div>
          <div class="activity_utility">
            <img 
            src="images/icon-ellipsis.svg" 
            alt=""
            aria-hidden="true"
            class="utility_dots">
            <p class="utility_last_time">Last Week - ${lastTime}hrs</p>
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
}

getJson();