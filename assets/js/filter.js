$(document).ready(function(){

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
    <div data-key="${item.key}" class="col-md-3 col-sm-6 ${item.Category} product-isotope">
    <div class="product-grid">
        <div class="product-image">
            <a href="#" class="image">
                <img src="${item.ProductImage}">
            </a>
            <ul class="product-links">
                <li><a class="shop" role="button" href="#" data-tip="Add to Cart"><i class="fas fa-shopping-bag"></i></a></li>
                <li><a role="button" href="#" data-tip="Quick View"><i class="fa fa-search"></i></a></li>
            </ul>
        </div>
        <div class="product-content">
            <h3 class="title"><a href="#">${item.ProductName}</a></h3>
            <div class="price">$${item.ProductPrice}</div>
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

        if(snapshot.child(`${user}`).hasChild(prKey)){
            console.log("yes")
            db.ref(user + "/" + prKey + "/count").set(
                item.count = item.count + 1
            )
        }else{
            console.log("no")
            db.ref(user + "/" + prKey ).set(
                item
        )
        }
        return
    })

    // db.ref("products/").once("value", (snapshot) => {

    //     console.log(prKey)

    //     item = snapshot.child(prKey).val()

    //     console.log(item.ProductName, item.count)

    //     if(snapshot.hasChild(prKey)){
    //         console.log("yes")
    //         db.ref(user + "/" + prKey ).set(
    //             item
    //         )
    //     }else{
    //         console.log("no")
    //         db.ref(user + "/" + prKey ).set(
    //             item
    //     )
    //     }
    // })

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
//     productD = snapshot.val()
//     d = productD.ProductPrice.slice(1)
//     sebet.push(parseFloat(d))
//     console.log(sebet)
//     totalSum = sebet.reduce((a, b) => a + b).toFixed(2)

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
    
//     $(".priceSpan").text("$"+totalSum)
//     console.log(totalSum)
//     $(".chartDiv").append(`
//     <tr>
//         <td><img class="chartImg" src="${productD.ProductImage}"></td>
//         <td>${productD.ProductName}</td>
//         <td>${productD.ProductPrice}</td>
//     </tr>`)


// })

// db.ref("/users/" + user).on("value", (snapshot) => {
//     productD = snapshot.val()
//     $(".itemCount").text(snapshot.numChildren())
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

})