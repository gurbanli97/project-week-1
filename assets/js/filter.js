

var $grid;
var $content;
var firebaseConfig = {
    apiKey: "AIzaSyCGVaa529xszf5ed8Kcto9l7lZen22XiyI",
    authDomain: "project-1-b2088.firebaseapp.com",
    databaseURL: "https://project-1-b2088-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "project-1-b2088",
    storageBucket: "project-1-b2088.appspot.com",
    messagingSenderId: "239478406556",
    appId: "1:239478406556:web:c5b5dad00ee7115b535c59"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.database();

var user = localStorage.getItem("userId")

 db.ref("products/").once("value", (snapshot) => {

    snapshot.forEach(function(item) {
    item = item.val()
    $content= `
    <div data-key="${item.key}" class="col-md-4 col-sm-12 ${item.Category} product-isotope">
    <div class="product-grid">
        <div class="product-image">
            <a href="#" class="image">
                <img src="${item.ProductImage}">
            </a>
        <div class="product-content">
            <h3 class="title"><a href="#">${item.ProductName}</a></h3>
            <div class="price">$${item.ProductPrice}</div>
        </div>
            <button class="shop" data-tip="Add to Cart">Add to Cart</button>
        </div>

    </div>
    </div>
    `
    $grid = $('.grid').isotope({
    })
    
        $grid.append($content)
        $grid.isotope( 'appended', $content );
        $grid.isotope('reloadItems')
        $grid.isotope()

    })
})

$(document).on("click", ".shop", function(e){
    e.preventDefault()

    if(user == null){
        user = db.ref().push().key;
        localStorage.setItem("userId", user)
        user = localStorage.getItem("userId")
    }

    var prKey = $(this).closest('.product-isotope').attr("data-key")

    var item;

    db.ref().once("value", (snapshot) => {

        item = snapshot.child(`/products/${prKey}`).val()

        if(snapshot.child(`${user}`).child(prKey).hasChild("ProductName")){
            console.log("salam")
            return
        }else{
            console.log("sagol")
            db.ref(user + "/" + prKey ).update(
                item
        )
        }

    })

    db.ref(user + "/" + prKey).update({
        count: firebase.database.ServerValue.increment(1),
    })
    
})

var totalSum = 0.00
var totalItem = 0
var chartContent;

db.ref(user + "/").on("value", (snapshot) => {

    if($(".cart-empty").text().trim() === "No products in the cart"){
        $(".cart-empty").text("")
        $(".cart-empty").html(`
        <table>
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Count</th>
                <th>Price</th>
            </tr>
        </tbody>
        <tbody class="chartDiv">
        </tody>
        </table>`)
    }

    $(".chartDiv").html(" ")
    
    snapshot.forEach(function(snapshot){
    if(snapshot.val().count > 1){
       totalSum += parseFloat(snapshot.val().ProductPrice) * snapshot.val().count
    }else{
        totalSum += parseFloat(snapshot.val().ProductPrice)
    }
    totalItem += snapshot.val().count

    chartContent = `
    <tr>
        <td><img class="chartImg" src="${snapshot.val().ProductImage}"></td>
        <td>${snapshot.val().ProductName}</td>
        <td>${snapshot.val().count}</td>
        <td>${snapshot.val().ProductPrice}</td>
    </tr>
    `
    $(".chartDiv").append(chartContent)

    })

    $(".itemCount").text(totalItem)
    $(".priceSpan").text("$"+totalSum.toFixed(2))

    totalSum = 0.00
    totalItem = 0

    // $(".chartDiv").html("")


    // console.log(snapshot.child(prKey +"/").val())

    // productD = snapshot.val()
    // sebet.push(parseFloat(productD.ProductPrice))
    // console.log(sebet)
    // totalSum = sebet.reduce((a, b) => a + b).toFixed(2)
    // console.log(totalSum , sebet)

    // $(".itemCount").text(snapshot.numChildren())
    // $(".priceSpan").text("$"+totalSum)


})


//     var prName = $(this).closest('.product-grid').children('.product-content').find('.title').text()
//     var prPrice = $(this).closest('.product-grid').children('.product-content').find('.price').text()
//     var prImage = $(this).closest('.product-grid').children(".product-image").children(".image").find("img").attr("src")
//     console.log(prName, prPrice, prImage)

    // if(user == null){
    // user = db.ref().push().key;
    // localStorage.setItem("userId", user)
    // user = localStorage.getItem("userId")
    // }

    // db.ref("/users/" + user).push(prDetails)
// })

// var sebet = []
// var totalSum = 0.00

// db.ref("/users/" + user).on("child_added", (snapshot) => {

//     if($(".cart-empty").text().trim() === "No products in the cart"){
//         $(".cart-empty").text("")
//         $(".cart-empty").html(`
//         <table class="chartDiv">
//             <tr>
//                 <th></th>
//                 <th>Name</th>
//                 <th>Price</th>
//             </tr>
//         </table>`)
//     }
    
//     $(".chartDiv").append(`
//     <tr>
//         <td><img class="chartImg" src="${productD.ProductImage}"></td>
//         <td>${productD.ProductName}</td>
//         <td>${productD.ProductPrice}</td>
//     </tr>`)


// })


// db.ref("/users/" + user).on("child_removed", (snapshot) => {

//     totalSum = totalSum - parseFloat(snapshot.val().ProductPrice.slice(1))
//     $(".priceSpan").text("$"+totalSum)

//     if(snapshot.numChildren() == 0){
//         console.log("yes")
//         totalSum = 0.00
//         $(".priceSpan").text("$"+ totalSum + ".00")

//     }
// })

// $("#deletef").on("click", function(){
//     sebet = []
//     db.ref("/users/" + user).set(false);
//     $(".cart-empty").html("<span>No products in the cart</span>")
//     totalSum = 0.00
//     $(".priceSpan").text("$"+ totalSum + ".00")

// })

// db.ref("/users/" + user).onDisconnect().set(false);

$('.filter-button-group').on( 'click', 'a', function() {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({
        filter: filterValue,
        // stagger: 60,
    });
    
    // if($("#starter").hasClass("isActive")){
    //     $("#starter").removeClass("isActive");
    // }

    if($("a").hasClass("isActive")){
        $("a").removeClass("isActive");
        $(this).addClass("isActive");
    }else{
        $(this).addClass("isActive");
    }
});
