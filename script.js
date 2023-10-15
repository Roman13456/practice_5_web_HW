function setCookie(name, value, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000)); // Calculate the expiration date

    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


//task 1: swap places texts in block1 and block 2
const text1 = document.querySelector(".textBlock1").innerHTML;
const text2 = document.querySelector(".textBlock2").innerHTML;
document.querySelector(".textBlock1").innerHTML = text2;
document.querySelector(".textBlock2").innerHTML = text1;

//task2:
const a = 4;
const b = 2;
const PI = Math.PI;
const res = PI * a * b;
document.querySelector(".textBlock3").innerHTML+=`Square of oval is ${res}` 


//task 3;
const  form = document.querySelector("form");
const numInput = document.querySelector("#num");
const cookieVal = getCookie("divisors");
const cookieNum = getCookie("num");
if(cookieVal!==""){
    form.setAttribute("style", "display:none");
    const deleteConfirmed = window.confirm(`divisors of ${cookieNum} are: ${cookieVal}. Delete cookies?`);
    if (deleteConfirmed) {
        deleteCookie("divisors");
        deleteCookie("num");
        form.setAttribute("style", "");
    }else{
        alert("Cookie available in the storage, to delete them reload the page")
    }
}

form.addEventListener("submit", function(e){
    e.preventDefault();
    const numInputVal = numInput.value;
    let divisors = "";
    if(numInputVal.trim()===""){
        alert("You didn't enter the number")
    }else{
        for(let i=1; i<= numInputVal; i++){
            if(numInputVal%i===0 && i!=numInputVal){
                divisors=divisors+`${i},`;
            }else if(i==numInputVal){
                divisors=divisors+`${i};`;
            }
        }
        alert(`The ${numInputVal} divisors are ${divisors}`)   
        setCookie("divisors", divisors, 1);
        setCookie("num", numInputVal, 1);
    }
})


//task 4
const block1 = document.querySelector(".leftBanner");
const block1LocalStorageData = localStorage.getItem("block1-Align");
if(block1LocalStorageData!==null){
    block1.setAttribute("style", `text-align: ${block1LocalStorageData}`)
}

const block2 = document.querySelector("header");
const block2LocalStorageData = localStorage.getItem("block2-Align");
if(block2LocalStorageData!==null){
    block2.setAttribute("style", `text-align: ${block2LocalStorageData}`)
}


//form for aligning the block 1
block1.addEventListener("mousemove", function(e){
    const nestedForm = block1.querySelector("form");
    if((e.offsetX + 100) <e.target.clientWidth && (e.offsetY + 70) <e.target.clientHeight && !nestedForm&& e.target.tagName==="DIV" && e.target.classList.contains("leftBanner")){
        const formNode = document.createElement("form");
        formNode.addEventListener("change", function(event){
            if (event.target.type === "radio") {
                // Check if the radio button is checked
                if (event.target.checked) {
                    // Get the value of the checked radio button
                    const selectedValue = event.target.value;
                    // console.log("Chosen", selectedValue)
                    block1.setAttribute("style", `text-align: ${selectedValue}`)
                    localStorage.setItem("block1-Align", selectedValue)
                }
            }
        })
        formNode.setAttribute("style", `text-align:left; border-radius:10px; width:100px; height: 70px ;background-color:grey;position: fixed; left:${e.clientX}px; top:${e.clientY}px;`)
        formNode.classList.add("alignForm");
        formNode.insertAdjacentHTML("afterbegin", `
           <div>
                <input id="right" name="align" type="radio" value="left">
                <label for="right">Left</label>
            </div>   
            <div>
                <input id="right" name="align" type="radio" value="center">
                <label for="right">Center</label>
            </div>
            <div>
                <input id="right" name="align" type="radio" value="right">
                <label for="right">Right </label>
            </div>
        `)
        block1.appendChild(formNode)
        console.log(e.clientX,e.clientY )
    }
})
block1.addEventListener("mouseleave", function(e){
    const nestedForm = block1.querySelector("form.alignForm");
        if(nestedForm){
            nestedForm.remove()
        }
})

//form for aligning the block 2
block2.addEventListener("mousemove", function(e){
    const nestedForm = block2.querySelector("form");
    if((e.offsetX + 100) <e.target.clientWidth && 
    (e.offsetY + 70) <e.target.clientHeight && !nestedForm
    && e.target.tagName==="HEADER"){
        const formNode = document.createElement("form");
        formNode.addEventListener("change", function(event){
            if (event.target.type === "radio") {
                // Check if the radio button is checked
                if (event.target.checked) {
                    // Get the value of the checked radio button
                    const selectedValue = event.target.value;
                    // console.log("Chosen", selectedValue)
                    block2.setAttribute("style", `text-align: ${selectedValue}`)
                    localStorage.setItem("block2-Align", selectedValue)
                }
            }
        })
        formNode.setAttribute("style", `text-align:left; border-radius:10px; width:100px; height: 70px ;background-color:grey;position: fixed; left:${e.clientX}px; top:${e.clientY}px;`)
        formNode.classList.add("alignForm");
        formNode.insertAdjacentHTML("afterbegin", `
           <div>
                <input id="right" name="align" type="radio" value="left">
                <label for="right">Left</label>
            </div>   
            <div>
                <input id="right" name="align" type="radio" value="center">
                <label for="right">Center</label>
            </div>
            <div>
                <input id="right" name="align" type="radio" value="right">
                <label for="right">Right </label>
            </div>
        `)
        block2.appendChild(formNode)
        console.log(e.clientX,e.clientY )
    }
})
block2.addEventListener("mouseleave", function(e){
    const nestedForm = block2.querySelector("form.alignForm");
        if(nestedForm){
            nestedForm.remove()
        }
})


//task 5

const linkLists = document.querySelectorAll("a")
linkLists.forEach(e=>{
    const ul = e.parentNode.querySelector("ul");
    const data = localStorage.getItem(`todolist${e.getAttribute("data-order")}`)
    if( data!==null){
        ul.insertAdjacentHTML("afterbegin", data)
    }
})

linkLists.forEach(e=>e.addEventListener("click", function(event){
    const isForm = event.target.parentNode.querySelector("form.todoForm")
    if(!isForm){
        const formNode = document.createElement("form");
        formNode.classList.add("todoForm")
        formNode.addEventListener("click", function(e){
            if(e.target.tagName==="INPUT" &&
             e.target.classList.contains("saveLocalBtn")){
                const ul = event.target.parentNode.querySelector("ul")
                localStorage.setItem
                (`todolist${event.target.getAttribute("data-order")}`, ul.innerHTML);
            }else if(e.target.tagName==="INPUT" && 
            e.target.classList.contains("delLocalBtn")){
                localStorage.removeItem(`todolist${event.target.getAttribute("data-order")}`);
            }
        })
        formNode.addEventListener('submit', function(e){
            const ul = event.target.parentNode.querySelector("ul")
            const input = formNode.querySelector("#litext").value;
            e.preventDefault();
            if(input.trim()!==""){
                formNode.querySelector("#litext").value = ""
                ul.insertAdjacentHTML("beforeend",`
                <li>${input.trim()}</li>
                `)
            }else{
                alert("Can't add empty item")
            }  
        })

        formNode.insertAdjacentHTML("afterbegin", `
        <label for="litext">List element text:</label>
        <input id="litext" placeholder="enter ur text">
        <input type="submit" value="create list item">
        <div>
            <input class="saveLocalBtn" type="button" value="save in localStorage">
            <input class="delLocalBtn" type="button" value="delete list from localStorage">
        </div>
        `)
        event.target.parentNode.appendChild(formNode);
        
        
    }
}))
