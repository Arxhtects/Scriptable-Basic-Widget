async function createWidget() {
    let listwidget = new ListWidget();
   
    let weatherData;
    const apiKey = "Your API KEY";
    var cityID = "Your City ID";
    
    let fileManager = FileManager.iCloud();
    let bgPath = fileManager.documentsDirectory() + "/Widgetbg.PNG";
    const months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const d = new Date();
    
    let month = months[d.getMonth()];
    let day = days[d.getDay()];
    let numDay = d.getDate();
    let hour = d.getHours();
   
  try {
  weatherData = await new Request("https://api.openweathermap.org/data/2.5/weather?id="+ cityID +"&appid=" + apiKey).loadJSON();
console.log(weatherData);
}catch(e){
  console.log("nothing");
}

var celcius = Math.round(parseFloat(weatherData.main.temp)-273.15);
    
    function dateOrdinal(int) {
    if (int == 31 || int == 21 || int == 1) return int + "st";
    else if (int == 22 || int == 2) return int + "nd";
    else if (int == 23 || int == 3) return int + "rd";
    else return int + "th";
};

    function getTime() {
    if (hour < 12) return "Morning";
    else if (hour < 18) return "Afternoon";
    else return "Evening";
  };
// 
// console.log(getTime());

function weatherMessage() {
  if (celcius <= 4) return "Grab a scarf, Its freezing";
  else if (celcius <= 10) return "Might want a coat";
  else if (celcius <= 15) return "Not to bad outside";
  else if (celcius <= 20) return "Getting a bit warm outside";
  else if (celcius <= 25) return "British summers suck, drink water";
  else return "Nope too hot";
}


await fileManager.downloadFileFromiCloud(bgPath);
  
listwidget.backgroundImage = Image.fromFile(bgPath);

let heading = listwidget.addText("Good " + getTime());
  heading.leftAlignText();
  heading.font = Font.lightSystemFont(18);
  heading.textColor = new Color("#000");
  
  listwidget.addSpacer(5);
  
  let dateText = listwidget.addText("It's " + day);
  dateText.leftAlignText();
  dateText.font = Font.regularRoundedSystemFont(30);
  dateText.textColor = new Color("#000");
  
    let dateMonth = listwidget.addText(month + " the " + dateOrdinal(numDay));
  dateMonth.leftAlignText();
  dateMonth.font = Font.regularRoundedSystemFont(30);
  dateMonth.textColor = new Color("#000");
  listwidget.addSpacer(5);
  
  let weatherText = listwidget.addText("It's " + celcius + "°C with "+ weatherData.weather[0].description + ".");
  weatherText.leftAlignText();
  weatherText.font = Font.lightSystemFont(12)
  weatherText.textColor = new Color("#000");
  
  let weatherTexttwo = listwidget.addText(weatherMessage());
  weatherTexttwo.leftAlignText();
  weatherTexttwo.font = Font.lightSystemFont(12)
  weatherTexttwo.textColor = new Color("#000");
  
  listwidget.addSpacer(80);
  
  return listwidget;
}

let widget = await createWidget();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentLarge();
}
Script.complete();
