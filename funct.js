                                // PERSONAL MODAL
// var modal = document.getElementById("personModal");
function pBtn(){
  var modal = document.getElementById("personModal");
  modal.style.display = "block";
}

function closeBtn(){
  var modal = document.getElementById("personModal");
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "none";
}

window.onclick = function(event) {
  var modal = document.getElementById("personModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
                                // END OF PERSONAL MODAL

                                // PERSONAL MODAL MOBILE
// var modal = document.getElementById("personModal");
function pBtnMb(){
  var modal = document.getElementById("personModalMb");
  modal.style.display = "block";
}

function closeBtnMb(){
  var modal = document.getElementById("personModalMb");
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "none";
}

window.onclick = function(event) {
  var modal = document.getElementById("personModalMb");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
                                // END OF PERSONAL MODAL MOBILE



filterSelection("all") // Execute the function and show all columns
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}


                        // Skill Modal Box

// function openPush() {
//   document.getElementById("pushSkill").style.height = "250px";
//   document.getElementById("education").style.marginTop = "250px";
// }

// function closePush() {
//   document.getElementById("pushSkill").style.height = "0";
//   document.getElementById("education").style.marginTop= "0";
// }
function sBtn(){
  var modal = document.getElementById("skillModal");
  modal.style.display = "block";
}

function scloseBtn(){
  var modal = document.getElementById("skillModal");
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "none";
}

window.onclick = function(event) {
  var modal = document.getElementById("skillModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


                      // End Of Skill Modal Box

                      // Project Layout
function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
                      // End Of Project Layout