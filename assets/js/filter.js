var $grid = $('.grid').isotope({
    filter: ".tea"
})

$('.filter-button-group').on( 'click', 'a', function() {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ 
        filter: filterValue,
        // stagger: 60,

     });
    
    if($("#starter").hasClass("isActive")){
        $("#starter").removeClass("isActive");
    }
    if($("a").hasClass("isActive")){
        $("a").removeClass("isActive");
        $(this).addClass("isActive");
    }else{
        $(this).addClass("isActive");
    }
});
