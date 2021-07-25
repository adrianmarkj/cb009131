const addBtn = document.getElementById("addOrder");
const selectBtn = document.querySelectorAll(".selection");
const placeBtn = document.getElementById("place");
const donateBtn = document.getElementById("donate");
const favBtn = document.getElementById("addFav");
const getFavBtn = document.getElementById("getFav");
const loyaltyBtn = document.getElementById("loyalty");
loyaltyBtn.addEventListener("click", checkLoyalty);
getFavBtn.addEventListener("click", orderFav);
favBtn.addEventListener("click", favourite)
donateBtn.addEventListener("click", donateMsg);
placeBtn.addEventListener("click", placeOrder);
addBtn.addEventListener("click", validateForm);
selectBtn.forEach(Element => {
    Element.addEventListener("click", currentOrder);
});
let totalCost = 0;
let previousCost = 0;
let loyaltyPoints = 0;
let items = 0;
let durationString = "";
let type = validateType();
let number = validateNum();
let duration = validateDuration();
let annualNo = 0;
let tokenNo = 0;
let adultNo = 0;
let childNo = 0;

function validateForm(Event){
    Event.preventDefault();
    let adultString = "";
    let childString = "";
    let passString = "";
    let durationString = "";
    let annualString = "";
    let tokenString = "";
    let type = validateType();
    let number = validateNum();
    let duration = validateDuration();
    let newCost = 0;
    if (type == false){
        alert("Pass type not selected.");
    }
    if (number == false){
        alert("Invalid number of tickets.");
    }
    if (duration == false){
        alert("Ticket duration not selected.");
    }
    if (document.getElementById("dayPass").checked){
        passString = "Day pass for";
    }
    else if (document.getElementById("studentPass").checked){
        passString = "Student pass for";
    }
    else if (document.getElementById("foreignerPass").checked){
        passString = "Foreigner pass for";
    }

    if (document.getElementById("threeHours").checked){
        durationString = "three hours.";
    }
    else if (document.getElementById("half").checked){
        durationString = "half a day.";
    }
    else if (document.getElementById("full").checked){
        durationString = "a full day.";
    }
    else if (document.getElementById("two").checked){
        durationString = "two days.";
    }

    if (document.getElementById("annualPass").value > 0){
        annualString = document.getElementById("annualPass").value + " annual pass(es)";
        annualNo = parseInt(document.getElementById("annualPass").value);
    }
    if (document.getElementById("foodToken").value > 0){
        tokenString = document.getElementById("foodToken").value + " food token(s)";
        tokenNo= parseInt(document.getElementById("foodToken").value);
    }

    if (type && number && duration){
        if (document.getElementById("adultNum").value != 0){
            adultString = " " + document.getElementById("adultNum").value + " adult(s)";
            adultNo = parseInt(document.getElementById("adultNum").value);
        }
        if (document.getElementById("childNum").value != 0){
            childString = " " + document.getElementById("childNum").value + " child(ren)";
            childNo= parseInt(document.getElementById("childNum").value);
        }
        document.getElementById("overall").innerHTML += passString + adultString + childString + " for " + durationString + "<br>" + annualString + tokenString;
        document.getElementById("overallCost").innerHTML = (previousCost = previousCost + totalCost); 

        items += annualNo + tokenNo + adultNo + childNo;

        const currentP = document.querySelectorAll(".current");
        currentP.forEach(Element => {
            Element.innerHTML = "";
        })
        document.getElementById("currentCost").innerHTML = "0";
    }
}

function validateType(){
    if (((document.getElementById("dayPass").checked) || (document.getElementById("studentPass").checked) || (document.getElementById("foreignerPass").checked)) != true){
        return false;
    }
    else {
        return true;
    }
}

function validateNum(){
    if (((document.getElementById("adultNum").value == 0) && (document.getElementById("childNum").value == 0))){
        return false;
    }
    else{
        return true;
    }
}

function validateDuration(){
    if (((document.getElementById("threeHours").checked) || (document.getElementById("half").checked) || (document.getElementById("full").checked) || (document.getElementById("two").checked)) != true){
        return false;
    }
    else {
        return true;
    }
}

function currentOrder(){
    let adultPrice = 0;
    let childPrice = 0;
    let durationPrice = 0;
    let annualPrice = 5000;
    let tokenPrice = 500;
    let annual = 0;
    let token = 0;
    let adults = 0;
    let children = 0;
    if (document.getElementById("dayPass").checked){
        document.getElementById("current1").innerHTML = "Day Pass";
        adultPrice = 1000;
        childPrice = 500;
    }
    else if (document.getElementById("studentPass").checked){
        document.getElementById("current1").innerHTML = "Student Pass";
        adultPrice = 500;
        childPrice = 250;
    }
    else if (document.getElementById("foreignerPass").checked){
        document.getElementById("current1").innerHTML = "Foreigner Pass";
        adultPrice = 5000;
        childPrice = 2500;
    }

    if ((document.getElementById("adultNum").value) != null){
        document.getElementById("current2").innerHTML = "No. of adult tickets : " + document.getElementById("adultNum").value;
        adults = document.getElementById("adultNum").value;
    }
    if ((document.getElementById("childNum").value) != null){
        document.getElementById("current3").innerHTML = "No. of child tickets : " + document.getElementById("childNum").value;
        children = document.getElementById("childNum").value
    }

    if (document.getElementById("threeHours").checked){
        document.getElementById("current4").innerHTML = "Duration : 3 Hours";
        durationPrice = 0;
    }
    else if (document.getElementById("half").checked){
        document.getElementById("current4").innerHTML = "Duration : Half Day";
        durationPrice = 250;
    }
    else if (document.getElementById("full").checked){
        document.getElementById("current4").innerHTML = "Duration : Full Day";
        durationPrice = 500;
    }
    else if (document.getElementById("two").checked){
        document.getElementById("current4").innerHTML = "Duration : Two Days";
        durationPrice = 1000;
    }

    if ((document.getElementById("annualPass").value) != null){
        annual = document.getElementById("annualPass").value;
        document.getElementById("current5").innerHTML = annual + " annual pass(es)."
    }
    if ((document.getElementById("foodToken").value) != null){
        token = document.getElementById("foodToken").value
        document.getElementById("current6").innerHTML = token + " food token(s)."
    }

    if (validateType && validateDuration && validateNum){
        totalCost = (adultPrice*adults) + (childPrice*children) + (durationPrice*(adults + children)) + (annualPrice*annual) + (tokenPrice*token);
        document.getElementById("currentCost").innerHTML = totalCost + " LKR";
    }
}

function placeOrder(Event){
    Event.preventDefault();
    let temp = 0;
    let type = validateType();
    let number = validateNum();
    let duration = validateDuration();
    if (type && number && duration){
        document.getElementById("overall").innerHTML = "";
        document.getElementById("currentCost").innerHTML = "0";
        document.getElementById("overallCost").innerHTML = "0";
        alert("Thank you for making your custom reservation. Product Manufacturer : Joel F. APIIT LK");
        if (items > 3){
            loyaltyPoints = items * 20;
            if (localStorage.getItem("loyaltyPoints") == null){
                localStorage.setItem("loyaltyPoints", loyaltyPoints);
            }
            else{
                temp = localStorage.getItem("loyaltyPoints");
                localStorage.setItem("loyaltyPoints", loyaltyPoints);
            }
        }
        const currentP = document.querySelectorAll(".current");
        currentP.forEach(Element => {
            Element.innerHTML = "";
        });
    }
}

function donateMsg(){
    alert("Your donation was successful.");
}

function favourite(Event){
    Event.preventDefault();
    let type = validateType();
    let number = validateNum();
    let duration = validateDuration();
    if (type && number && duration){
        if (document.getElementById("dayPass").checked){
            localStorage.setItem('type', "dayPass");
        }
        else if (document.getElementById("studentPass").checked){
            localStorage.setItem('type', "studentPass");
        }
        else{
            localStorage.setItem('type', "foreignerPass");
        }

        localStorage.setItem('adults', document.getElementById("adultNum").value);
        localStorage.setItem('children', document.getElementById("childNum").value);

        if (document.getElementById("threeHours").checked){
            localStorage.setItem('duration', "threeHours");
        }
        else if (document.getElementById("half").checked){
            localStorage.setItem('duration', "half");
        }
        else if (document.getElementById("full").checked){
            localStorage.setItem('duration', "full");
        }
        else{
            localStorage.setItem('duration', "two");
        }

        localStorage.setItem('annual', document.getElementById("annualPass").value);
        localStorage.setItem('food', document.getElementById("foodToken").value);
    }
}

function orderFav(Event){
    Event.preventDefault();
    const check = localStorage.getItem('type');
    if (check == null){
        alert("You don't have a favourite.");
    }
    else{
        document.getElementById(localStorage.getItem("type")).checked = true;
        document.getElementById(localStorage.getItem("duration")).checked = true;
        document.getElementById("adultNum").value = localStorage.getItem("adults");
        document.getElementById("childNum").value = localStorage.getItem("children");
        document.getElementById(localStorage.getItem("duration")).checked = true;
        document.getElementById("annualPass").value = localStorage.getItem("annual");
        document.getElementById("foodToken").value = localStorage.getItem("food");
        currentOrder();
    }
}

function checkLoyalty(Event){
    Event.preventDefault();
    if (localStorage.getItem("loyaltyPoints") == "0"){
        alert("You have no loyalty points.")
    }
    else{
        alert(localStorage.getItem("loyaltyPoints") + " is the number of loyalty points you have.");
    }
}