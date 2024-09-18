// use document to fetch any element of the html for the jaascript
const inputSlider=document.querySelector("[data-lengthSlider]");
// syntax of using custom attribute u can also use the class or id but here we ill use the custom attribute her
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyMsg=document.querySelector("[data-copyMsg]");
const copyBtn=document.querySelector("[data-copy]");
const upperCheck=document.querySelector("#uppercase");
const lowerCheck=document.querySelector("#lowercase");
const symbolCheck=document.querySelector("#symbols");
const numbersCheck=document.querySelector("#numbers");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]")  
// jin jin input ka type checkbox hoga vo sabhi yha par ye fetch kar lega 
// hum fetch isliye kar rahe hai taki hum inpar operations laga sake and we can make our website working

let password="";
let passwordLength=10;
let checkCount=0;
//set the strength circle color to grey


// let's discuss about the functions that are generally used in this projects
// 1. copycontent()  means we have to copy the password here
// 2. handleslider()  we have to also handle the slider here
// 3. generatepassword()  this is used to generate the password here
// 4. setindicator() this will change the color of the circle and the shadows
// 5. getrandomInteger(min,max)  here we will pass the argument as min and max and we see here how many letters we get for the password here
// 6. getrandomLowercase()  getrandomUppercase()  getrandomSymbol()  getrandomnumber()  this willmake the letters according to the checkpoints here

// flow of the project is here is firstly we will make the password length and we will change it then after this we will do the check box here which 
// check box is to be selected here and then we will then generate password and then password is shown on the input box and then indicator will show whether the password is weak or strong
// then we ahve to make the option for the whether to copy the password or not

// significance of the slider is it will change the length of the slider 

// we make the firstly one function for the slider which will handle the slider 
handleSlider();
setindicator("#ccc");
function handleSlider(){
    // what it will do it will set the length of the password and show on the 
    inputSlider.value=passwordLength;
    // now this value of the slider is set to the default value of password length
    // now we will also consider this length display is also equal to the input slider now
    lengthDisplay.innerText=passwordLength;  // just change the value above it will show automatically
    // function bana toh diya but usse casll bhi karna hai upar jakr
    //  we have to add somehting for th css file here
    const min=inputSlider.min;
    const max=inputSlider.max; 
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%"
}

// now we will set the indicator here default value is white
function setindicator(color){   // we have to pass the color into this
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`; 
}
function getrandomInteger(min,max){
    // ye functioin generate karega ki hume kitna length ka password chaiye
    // Math.random karne se 0 or 1 ke beech mein number aa jaega  and this may be the float number so we will round off this
    return Math.floor(Math.random()*(max-min))+min;  // Math.floor[Math.random*(max-min) ki range hai 0 se max takk but muje min se max takk ki range chaiye]
}
// this above function is written for the below written 4 functions
function generateRandomNumber(){
    // abb ek number generate karna hai password wale box mein kaise hoga 0 se 9 takk ki range ka hoga
    return getrandomInteger(0,9);  // toh yha se humne 0 se 9 takk ki range ka number bta dia 
}
function generateLowerCase(){
    // ismein hume range kha se kha takk ki deni hogi use ascii value
    return String.fromCharCode(getrandomInteger(97,123));  // getrandom wala function toh ineteger value ddega but muje toh char chaiye na use String.fromCharCode
}
function generateUpperCase(){
    return String.fromCharCode(getrandomInteger(65,91));
}
// symbol wala part reh gya vo bhi include kar elete hai
// symbol ke liye ek string banate hai and we will put all the strings into it baad mein randomly le lenge string ko
const symbols='~`!@#$%^&*()_-+={}[]|\:;"<,>.?/';
// now we move to the generate symbol functions here
function generateSymbol(){
    const random=getrandomInteger(0,symbols.length);
    return symbols.charAt(random);
}
// now we want to calculate the strength of the password
function calcStrength(){
    // let we take the all checkbox value as false
    let hasupper=false;
    let haslower=false;
    let hasnum=false;
    let hasSym=false;
    // then make the true for the required data as checked
    if(upperCheck.checked) hasupper=true;
    if(lowerCheck.checked) haslower=true;
    if(numbersCheck.checked) hasnum=true;
    if(symbolCheck.checked) hasSym=true;
    if(hasupper && haslower && (hasnum || hasSym) && passwordLength>=8){
        setindicator("#0f0");
    }
    else if((haslower || hasupper)&&(hasnum || hasSym)&&(passwordLength>=6)){
        setindicator("#ff0");
    }
    else {
        setindicator("#f00");
    }

}
// now we want to copy the text here
async function copycontent(){  // we have to make a async function because it gives the promises
    
    // Copy the text inside the text field
      // this is the method used to copy the text 
    // above operation is async operation we have to wait for it and we will not proceed forward till the operation comppletes so use the await keyword
    // there is alos the chances of the error handling here so we ahve to wait for the same
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";  // it will show copied for the innertext here
    }
    catch(e){
        // if copy not done then innertext mein likh do failed
        copyMsg.innerText="failed";
    }
    // there is also a timer on the copy text message copied and failed will disapperar after sometime
    copyMsg.classList.add("active");   // active likhne se css wali file agar likhi hogi active ho jaegi
    // set time out function se invisible ho jaega
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}

// now we come to the main function generate password here 
// now password is genrated with the help of the button named generate password
// this password genrally named as the click on the event listner don't make the function instead call the event listner
// we see there are so many event listner are in need in this project slider par
// generate password wale button par click karne se


// to shuffel the password let's call the function shuffle passsword here we will discuss about this wonderful length
function shufflePassword(array){
    // there exists a wonderful algorithm to shuffle the password here
    //fisher eats methos is that algorithm
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount; 
        handleSlider();
    }
}
allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
})
inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider(); 
})
// now comes to the copy button here
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copycontent();
    
})

// now comes to generate password so what to do here
generateBtn.addEventListener('click',()=>{
    // jab mai yha aaya i see ki agar sabhi checkbox par tick nahi hai toh password generate nahi ho paya 
    // so what can i do here ek condition orr bhi fulfill hogi so that i can check that box
    if(checkCount==0){
        return;
    }
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    // now we will generate the password
    //before making the new password we have to remove the older one
    // humara code chal nahi rha tha toh humne console .log kiya 
    console.log("start the journey");
    password="";
    //let's put the items which are mentiioned in the box
    // if(upperCheck.checked){
    //     password+=generateUpperCase();
    // }
    // if(lowerCheck.checked){
    //     password+=generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password+=generateRandomNumber();
    // }
    // if(symbolCheck.checked){
    //     password+=generateSymbol();
    // }
    // no need of above code because we do it by some smartest method
    let funarr=[];
    console.log("compuslsary addition");
    if(upperCheck.checked){
        funarr.push(generateUpperCase);
        
    }
    if(lowerCheck.checked){
        funarr.push(generateLowerCase);
        
    }
    if(numbersCheck.checked){
        funarr.push(generateRandomNumber);
        
    }
    console.log("step2");
    if(symbolCheck.checked){
        funarr.push(generateSymbol);
        
    }
    for(let i=0;i<funarr.length;i++){
        password+=funarr[i]();
    }
    
    // also use the for loop instead of calling all the time function here
    // for(let i=0;i<arr.length;i++){
    //     password+=arr[i]();
    // }
    for(let i=0;i<passwordLength-funarr.length;i++){
        let randoindx=getrandomInteger(0,funarr.length);
        
        password+=funarr[randoindx]();
    }
    console.log("remaining addition start");
    // there is also a problem here we have to shuffle this password here
    password=shufflePassword(Array.from(password));
    console.log("remaining addition done");
    passwordDisplay.value=password;
    // after this we have to call the password strength function here
    calcStrength();
})