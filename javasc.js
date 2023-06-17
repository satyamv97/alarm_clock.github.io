setInterval(increaseTime, 1000); //this will be called every second

//function for real time timer- which is always running on top 
function increaseTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let am_pm = 'AM';
    // console.log(hour + "" + min + "" + sec);
    if (hour > 12) {
        am_pm = 'PM';
        hour -= 12;
    }
    if (hour < 10  ) {
        hour = '0' + hour; // if it is single digit adding 0 before it
        
    }
    if (min < 10) {
        min = '0' + min; // if it is single digit adding 0 before it
    }
    if (sec < 10) {
        sec = '0' + sec; //if it is single digit adding 0 before it
    }
    // this will always update real time on top of ui
    document.getElementById('clock').innerHTML = (hour + ":" + min + ":" + sec + " " + am_pm)
    // startAlarmTimer(time)
}
// Get the input field element in_hour
const inputField = document.getElementById('in_hour');

// Add an input event listener
inputField.addEventListener('input', function() {
  // Get the current value of the input field
  const value = inputField.value;

  // Remove any non-digit characters
  const digitsOnly = value.replace(/\D/g, '');

  // Truncate the value to two digits
  const truncatedValue = digitsOnly.slice(0, 2); //it will allow only 2 digit

  // Update the input field value
  inputField.value = truncatedValue;
});

//same for min and sec
const inputField1 = document.getElementById('in_min');

// Add an input event listener
inputField1.addEventListener('input', function() {
  // Get the current value of the input field
  const value = inputField1.value;

  // Remove any non-digit characters
  const digitsOnly = value.replace(/\D/g, '');

  // Truncate the value to two digits
  const truncatedValue = digitsOnly.slice(0, 2);

  // Update the input field value
  inputField1.value = truncatedValue;
});

const inputField2 = document.getElementById('in_sec');

// Add an input event listener
inputField2.addEventListener('input', function() {
  // Get the current value of the input field
  const value = inputField2.value;

  // Remove any non-digit characters
  const digitsOnly = value.replace(/\D/g, '');

  // Truncate the value to two digits
  const truncatedValue = digitsOnly.slice(0, 2);

  // Update the input field value
  inputField2.value = truncatedValue;
});


//for creating list of alarms on selecting
let addButton = document.getElementById("setButton");
addButton.addEventListener("click", function add() {
    
    var li = document.createElement("li");
    var hour = document.getElementById("in_hour");
    var min = document.getElementById("in_min");
    var sec = document.getElementById("in_sec");
    var ampm = document.getElementById("am_pm");
    // if hour,min,sec value is less than 0 or greater than 12 then it will return
    if (hour.value == ""|hour.value >12 | min.value == ""| min.value >59 | sec.value == "" | sec.value >59 ) {
        return;
    }
    //then will check on it should be either AM/PM
    if(ampm.value != "AM") { //for checking AM/PM
        if(ampm.value != "PM"){
            return;
        }
    }
    //if hour,min,sec value that is input is less than 10 and greater than 0 then add "0" else value will be saved

    var listContent = ((hour.value < 10 && hour.value>0) ? ("0" + hour.value.replace(/\D|^0+/g, "")) : hour.value) + ":" //this logic for if input is <10 then it should give list with "0"
        + ((min.value < 10 && min.value > 0) ? ("0" + min.value.replace(/\D|^0+/g, "")) : min.value) + ":"
        + ((sec.value < 10 && sec.value > 0) ? ("0" + sec.value.replace(/\D|^0+/g, "")) : sec.value) + " " + ampm.value;
    
    //console.log(listContent);
    li.innerHTML = listContent;
    document.getElementById("mylist").appendChild(li);
    //resetting value of each field after setting alarm
    hour.value = ''; 
    min.value = '';
    sec.value = '';
    ampm.value = '';

    addDeleteButton(li); //adding 'delete' button with each list of set alarms
    
    //function to add delete button
    function addDeleteButton(li) {
        var span = document.createElement("SPAN");
        span.innerHTML = "<button>DELETE</button>";
        span.className = "delete";
        li.appendChild(span);
        span.addEventListener("click", function () {
            li.remove(); //removing resp list items on click on delete button
        })
    }

})
 // creating alert which will call every sec to compare it with setted alarm
 setInterval(alertbox, 1000);
 function alertbox(){
    
    var alarms = document.getElementById("mylist").getElementsByTagName("li");
    var currentTime = document.getElementById('clock').innerHTML;
    //console.log(currentTime);
    for (var i = 0; i < alarms.length; i++) {
        var alarmTime = alarms[i].textContent.substring(0,11);
        //console.log(alarmTime)
      if (currentTime >= alarmTime) {
        alert("YOUR ALARM IS RINGING FOR "+alarmTime );
        alarms[i].remove(); // Remove the achieved alarm from the list after alert is accepted
      }
    }
    // console.log(alarms);
 }
