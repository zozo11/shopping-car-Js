var sizeInfo;
var titleInfo;
var imgInfo;
var priceInfo;
var idInfo;
var qty = 0;
var productToCart = [];

//get size of product 
function selectSize (obj,size, id){
    $('.productSize').attr("class", "productSize");
    obj.classList.add("productSizeActive"); 

    //save in object
    sizeInfo = size;
    idInfo = id;  
    productToCart[idInfo] = {idInfo:idInfo, sizeInfo: sizeInfo};   
    
    //add size notice 
    $('.productContentSize').empty('.productContentSelectSize');
    $('.productContentSize').append(" <span>SIZE</span><span class='sizeRequire'>*</span><spann class='productContentSelectSize sizeUpper' value=''>&nbsp;&nbsp;" + sizeInfo  + "</span>");
} 

//submit product information
function submitProduct (title, img, price){
    if(sizeInfo == undefined){
        //Faile alert
        $('.datalert').append('<span class="faile">Please add size</span>');
        setTimeout(()=>{
            $('.datalert').empty();
        }, 1000)
        
    }else if(productToCart.hasOwnProperty(idInfo)){
        productToCart[idInfo].titleInfo = title;
        productToCart[idInfo].priceInfo = price;
        productToCart[idInfo].imgInfo = img;
        if(isNaN(productToCart[idInfo].qty)){
            productToCart[idInfo].qty = 1;
        }else{
            productToCart[idInfo].qty += 1;
        }

        //Success alert
        $('.datalert').html('<span class="success">Add Item Success</span>');
	CountInCart();
        setTimeout(()=>{
            $('.datalert').empty();
        }, 1000)
        
    }

}

//count items

 function CountInCart(){
	total_items = 0;
	if(productToCart.length > 0){
		$.each(productToCart, function (key, value) {
			if(value.hasOwnProperty("qty")===true && value.qty>0){
				total_items+=value.qty;
			}
		});
	}
	$("#total-items-html").html(total_items);
}

 //show on the cart
 function HoverCart(){
     $('.cart').css("display", "block");
     $('.navCart').addClass('hoverCart');
     $('.cart').html("");
     if(productToCart.length > 0){
         $('.cart').remove(".cartNull");
         $.each(productToCart, function (index, value) {
	    if(value.hasOwnProperty("qty")===true && value.qty>0 && value.imgInfo!="undefined"){
            $('.cart').append("<div class='cartItem'><div class='cartImg'><img src='" + value.imgInfo + "' alt='img' /></div><div class='cartDetial'><p>"+ value.titleInfo +"</p><p>"+ value.qty + " X <strong> $" + value.priceInfo + "</strong></p><p> <span>Size: </span>" + "<span class=‘sizeUpper’>" + value.sizeInfo +  "</span></p></div></div>");
	    }
        })
     }else{
        $('.cart').append("<p class='cartNull'>Shopping cart is empty, please add items</p>")
     }
     //mouse remove leave
    $('.cart').mouseleave((e)=>{
        $('.cart').css("display", "none");
        $('.navCart').attr('class', 'navCart');
     })
 }


$("document").ready(function(){
	CountInCart();
});
