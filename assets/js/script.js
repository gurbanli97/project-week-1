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

var totalSum = 0.00
var totalItem = 0
var chartContent;
var deleteKey;

if(user != null){

db.ref(user + "/").on("value", (snapshot) => {

    if(snapshot.hasChildren()){
        $(".cart-empty").text("")
        $(".cart-empty").html(`
        <table class="chartTable">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Count</th>
                <th>Price</th>
                <th></th>
            </tr>
        </tbody>
        <tbody class="chartDiv">
        </tody>
        </table>`)
    }else{
        $(".cart-empty").text("No products in the cart")
    }

    $(".chartDiv").html(" ")

    snapshot.forEach(function(snapshot){
    if(snapshot.val().count > 1){
       totalSum += parseFloat(snapshot.val().ProductPrice) * snapshot.val().count
    }else{
        totalSum += parseFloat(snapshot.val().ProductPrice)
    }
    totalItem += snapshot.val().count

    itemSelf = snapshot.val().ProductPrice * snapshot.val().count

    chartContent = `
    <tr>
        <td><img class="chartImg" src="${snapshot.val().ProductImage}"></td>
        <td>${snapshot.val().ProductName}</td>
        <td><button data-decr="${snapshot.val().key}" class="decr"> - </button>${snapshot.val().count}<button data-incr="${snapshot.val().key}" class="incr"> + </button></td>
        <td>$${itemSelf.toFixed(2)}</td>
        <td><button class="deleteBtn" data-delete="${snapshot.val().key}"><i class="far fa-trash-alt"></i></button></td>
    </tr>
    `
    $(".chartDiv").append(chartContent)

    })

    $(".itemCount").text(totalItem)
    $(".priceSpan").text("$"+totalSum.toFixed(2))

    totalSum = 0.00
    totalItem = 0


})

}

$(document).on("click", ".deleteBtn", function() {
    deleteKey = $(this).attr("data-delete");
    db.ref().child(user).child(deleteKey).remove();
})

$(document).on("click", ".incr", function() {
    incBtn = $(this).attr("data-incr");
    db.ref(user + "/" + incBtn).update({
        count: firebase.database.ServerValue.increment(1),
    })
})

$(document).on("click", ".decr", function() {
    decBtn = $(this).attr("data-decr");
    db.ref(user + "/" + decBtn).update({
        count: firebase.database.ServerValue.increment(-1),
    })
})