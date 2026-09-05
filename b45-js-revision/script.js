// title.innerText = "JavaScript";
// title.textContent = "JavaScript Revision";
// console.log(title);

// function welcome(){
    //     alert("Welcome to Entri");
    // }

        const button = document.getElementById("course-btn");
        const title = document.getElementById("course");
        
        button.addEventListener("click", function(){
            title.textContent = "Ai enhanced MERN";
        })


// promise - 3 state
// pending, fulfilled, rejected
const btn = document.getElementById("loadProducts");

btn.addEventListener("click", async function(){
    const productDiv = document.getElementById("container");

    // api calls

    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    
    products.forEach(data => {
        productDiv.innerHTML += `
            <div>
                <h3>${data.title}</h3>
                <p>$${data.price}</p>
            </div>
        `
    });

});

// spread operator
let arr1 = [1, 2, 4];
let arr2 = [8, 3, 2];
let combinedArr = [...arr1, ...arr2];
console.log(combinedArr);

// rest operator
function bill(customername, ...products){
    console.log(customername, products);
};

bill("someone", "milk");
bill("narasimhan", "milk", "chocolates", "groceries");

// let authHeaders = "Bearer token";

// if(!authHeaders || !authHeaders.startsWith("Bearer ")){
//     console.log("Token not verified");
// }

var a = 10;
var a = 20;
console.log(a);

let b = 5;
b = 10;
console.log(b);

// const c = 10;
// c = 5;
// console.log(c);

// Primitive data type(string, number, boolean, undefined, null, bigint & symbol);
let username = "Narasimhan"; // string
let age = 29; // number
let isActive = true; // boolean

// Reference data type(array, object, function)
let skills = ["javascript", 3000, true];

// Form Validation
const form = document.getElementById("userForm");

form.addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("username").value;

    // regEx - Regular Experssion
    // pattern style validation
    const namePattern = /^[A-Za-z ]{3,20}$/;

    if(!namePattern.test(name)){
        alert("Invalid username");
        return;
    }
    alert("Registration successful");
});