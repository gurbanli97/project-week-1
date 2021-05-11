var $grid = $('.grid').isotope({
    // filter: ".tea" 
})

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

var prDetails = {}

var user = localStorage.getItem("userId")

// db.ref("/users/").once('value', (snapshot) => {
//     data = snapshot.val();
// });

$(".shop").on("click", function(e){
    e.preventDefault()
    var prName = $(this).closest('.product-grid').children('.product-content').find('.title').text()
    var prPrice = $(this).closest('.product-grid').children('.product-content').find('.price').text()

    console.log(prName, prPrice)

    prDetails = {
        ProductName: prName,
        ProductPrice: prPrice
    }

    if(user == null){
    user = db.ref().push().key;
    localStorage.setItem("userId", user)
    user = localStorage.getItem("userId")
    }


    db.ref("/users/" + user).push(prDetails)
})

var sebet = []

// db.ref("/users/" + user).on("value", (snapshot) => {
//     productD = snapshot.val()

//     for(let prd of Object.values(productD)){
//         var d = prd.ProductPrice.slice(1)
//         sebet.push(parseFloat(d))    
//     }

//     console.log(sebet)

//     var totalSum = sebet.reduce((a, b) => a + b).toFixed(2)

//     console.log(totalSum)
// })

db.ref("/users/" + user).on("child_added", (snapshot) => {
    productD = snapshot.val()
    d = productD.ProductPrice.slice(1)
    sebet.push(parseFloat(d))
    console.log(sebet)
    var totalSum = sebet.reduce((a, b) => a + b).toFixed(2)
    console.log(totalSum)
})
$("#deletef").on("click", function(){
    db.ref().delete()
})
// db.ref("/users/" + user).onDisconnect().set(false);
