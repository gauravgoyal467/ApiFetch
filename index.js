/*
The goal is to make a real life website for a restaurant and you have to write the script for it.
Mainly 5 tasks are done when you go in a restaurant. You get the menu and then Someone takes your order. Then your order is given to the chef and the chef starts preparing it. Once food is cooked, the food is given to the waiter and the waiter gives the food to you. then you eat it and pay for it.
Make 5 functions
First function - getMenu() -> On the load of the screen run this function and In this function you'll make an api call using fetch to get the food items from an api and show them to a user - https://free-food-menus-api-production.up.railway.app/burgers.
TakeOrder() - Now assume that the user is ordering and make a function called TakeOrder() -This function should return a promise and should take 2500 milliseconds to resolve the order. in teh resolve choose any 3 burgers randomly and add them in the object.
orderPrep() - This function also returns a promise and takes 1500 milliseconds to resolve and the resolve should return {order_status:true; paid:false}
payOrder() - This function also returns a promise and takes 1000 milliseconds to resolve and the resolve returns the object {order_status:true; paid:true}
thankyouFnc() - Once {paid:true} is received, give an alert on the screen saying thankyou for eating with us today!
You need to handle 4 promises back to back and run the last thankyou function one after the other. Use either promise chaining or async await or promise methods to do the following.

*/

const resultContainer=document.getElementById("main-container");


onload=getMenu();

async function getMenu(){
    const url='https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json';
    const response=await fetch(url);
    const data=await response.json();
    console.log(data);
    renderMenuOnDom(data);
}
/*
 <div id="main-container" class="container">
        <div class="card">
            <div class="image">
                <img src="https://source.unsplash.com/random/1920x1080/?cheeseburger" alt="">
            </div>
            <div class="detail">
                <span>BreakFast</span>
                <span>5.56$</span>  
            </div>
        </div>
  </div>
  */

function  renderMenuOnDom(menuList){
    resultContainer.innerHTML ='';
    menuList.forEach((item) => {
      const cardDiv=document.createElement("div");
      cardDiv.className="card";

      const imgDiv=document.createElement("div");
      imgDiv.className="image";

      const img=document.createElement("img");
      img.src=item.imgSrc;
      imgDiv.appendChild(img);
      cardDiv.appendChild(imgDiv);

      const spanDiv=document.createElement("div");
      spanDiv.className="detail";

      const span1=document.createElement("span");
      span1.innerText=item.name;
      spanDiv.appendChild(span1);
      const span2=document.createElement("span");
      span2.innerText=`${item.price}$`;
      spanDiv.appendChild(span2);

      cardDiv.appendChild(spanDiv);

      resultContainer.appendChild(cardDiv);
    })
    orderProcess(menuList);
}

function TakeOrder(list) {
    const food = [];
  list.forEach((item) => {
    food.push(item.name);
  });
    const order = [];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * food.length);
          const randomFood = food[randomIndex];
          order.push(randomFood);
        }
        console.log(order);
        resolve(order);
      }, 2500);
    });
  }

  function orderPrep() {
   
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
  }

  function payOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    });
  }

  function thankyouFnc() {
      alert("Thank you for eating with us today!");
  }

  async function orderProcess(data) {
      const order = await TakeOrder(data);
      const orderStatus = await orderPrep();
      if(orderStatus.order_status){
        alert("Order registered and getting ready ");
        const paymentStatus = await payOrder();
        if (paymentStatus.paid) {
          alert("Bill Paid");
          thankyouFnc();
        }
      }else{
        alert("Something went wrong while ordering please try again")
      } 
  }
  
 

