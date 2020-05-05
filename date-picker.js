var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");
var monthHeader = document.getElementById("monthHeader");
var yearHeader = document.getElementById("yearHeader");
var nextBtn = document.getElementById("next");
var previousBtn = document.getElementById("previous");
let datePicked = document.getElementById("date-picked");
let datePickedType = 0; //0 = day, 1 = month, 2 = year
var months = "";
var days = "";
var monthsArr = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
var daysArr = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

months = monthsArr;
days = daysArr;

var tableHeaderMonth = document.getElementById("thead-month");
var dataHead = "<tr>";
var startDay = "";

for (dhead in days) {
  days[dhead] === "Lun" ? startDay = "red-text" : startDay = "";
  dataHead += "<th data-days='" + days[dhead] + "' class='" + startDay + "'>" + days[dhead] + "</th>";
}

dataHead += "</tr>";
tableHeaderMonth.innerHTML = dataHead;
console.log("showCalendar");
console.log(datePicked);
showCalendar(currentMonth, currentYear);
console.log(datePicked);

nextBtn.addEventListener("click", next, false);
previousBtn.addEventListener("click", previous, false);

function yearRange(start, end) {
  var years = "";

  for (var year = start; year <= end; year++) {
    years += "<option value='" + year + "'>" + year + "</option>";
  }

  return years;
}

var createYear = yearRange(1970, 2050);
selectYear.innerHTML = createYear;

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
  selectDateMonth(currentMonth, currentYear);
  datePicked.innerHTML = monthsArr[currentMonth]+" "+currentYear;
  datePickedType = 1;
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
  selectDateMonth(currentMonth, currentYear);
  datePicked.innerHTML = monthsArr[currentMonth]+" "+currentYear;
  datePickedType = 1;
}

function jump(val) {
  console.log(datePickedType+" "+val);
  switch (datePickedType) {
    case 0: //val is hour
      break;
    case 1: // val is day
      //console.log("clicked on day "+val);
      $(".date-picker[data-date ="+val+"]")[0].click();
      datePickedType--;
      break;
    case 2: // val is month
      console.log("clicked on month "+val);
      currentMonth = val;
      datePicked.innerHTML = monthsArr[currentMonth]+" "+currentYear;
      showCalendar(currentMonth, currentYear);
      selectDateMonth(currentMonth, currentYear);
      datePickedType--;
      break;
    default:
  }
}

function showCalendar(month, year) {
  var firstDay = ((new Date(year, month).getDay())+6)%7;
  var monthString = monthsArr[month];

  table = document.getElementById("calendar-body");
  table.innerHTML = ""; 
  monthHeader.innerHTML = monthString;
  monthHeader.onclick = function (e){
    selectDateMonth(currentMonth, currentYear);
    datePicked.innerHTML = monthsArr[currentMonth]+" "+currentYear;
    datePickedType = 1;
  };
  yearHeader.innerHTML = year;
  yearHeader.onclick = function (e){
    selectDateYear(currentYear);
    datePicked.innerHTML = currentYear;
    datePickedType = 2;
  };
  selectYear.value = year;
  selectMonth.value = month;

  var date = 1;

  for (var i = 0; i < 6; i++ ) {
    var row = document.createElement("tr");

    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        cell = document.createElement("td");
        cell.setAttribute("data-date", date);
        cell.setAttribute("data-month", month + 1);
        cell.setAttribute("data-year", year);
        cell.setAttribute("data-month-name", months[month]);
        cell.className = "date-picker";
        cell.innerHTML = "<span>" + date + "</span>";
        cell.onclick = function(event) {
          var dates = document.querySelectorAll(".date-picker");
          var currentTarget = event.currentTarget;
          var date = currentTarget.dataset.date;
          var month = currentTarget.dataset.month - 1;
          var year = currentTarget.dataset.year;

          for (var i = 0; i < dates.length; i++) {
            dates[i].classList.remove("selected");
          }

          currentTarget.classList.add("selected");
          datePicked.innerHTML = date + " " + monthsArr[month] + " " + year;
          datePickedType = 0;
          selectDateDay(date, month, year);
        }

        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.className = "date-picker selected";
          //cell.click();
        }

        row.appendChild(cell);
        date++;
      }
    }

    table.appendChild(row);
  }
}

function daysInMonth(month, year) {
  return 32 - new Date(year, month, 32).getDate();
}
