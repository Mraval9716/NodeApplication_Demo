//Validations on button click for all fields and for checking phone number format.
function validateForm() {
var restaurant_name = document.getElementById('resname').value;
var restaurant_address = document.getElementById('address').value;
var restaurant_phone = document.getElementById('phone').value;
var restaurant_email = document.getElementById('email').value;
var password = document.getElementById('pass').value;
var con_password = document.getElementById('conpass').value;
var regex_phone =  /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/ ;
if(restaurant_name.length<=0){
    document.getElementById("lblname").className = '';
    isValidated = false;
}else{
    document.getElementById("lblname").className = 'hidden';
    isValidated = true;
}
if(restaurant_address.length<=0){
    document.getElementById("lbladdress").className = '';
    isValidated = false;
}else{
    document.getElementById("lbladdress").className = 'hidden';
    isValidated = true;

}
if(restaurant_phone.length>0 && !regex_phone.test(restaurant_phone)){
    lblnumber.innerHTML = "Phone number should be in XXX-XXX-XXXX format"; 
    document.getElementById("lblnumber").className = '';
    isValidated = false;
}else if(restaurant_phone.length<=0){
    document.getElementById("lblnumber").className = '';
    isValidated = false;
}else{
    document.getElementById("lblnumber").className = 'hidden';
    isValidated = true;
}
if(restaurant_email.length<=0){
    document.getElementById("lblemail").className = '';
    isValidated = false;
}else{
    document.getElementById("lblemail").className = 'hidden';
    isValidated = true;

}
if(password.length<=0 && con_password.length<=0) {
        lblpassword.innerHTML = "Please enter password"; 
        lblconpassword.innerHTML = "Please enter confirm password"; 
        document.getElementById("lblpassword").className = '';
        document.getElementById("lblconpassword").className = '';
        isValidated = false;
}else if(password.length<8&&con_password.length<8){
    lblpassword.innerHTML =  "Password should be atleast having 8 characters"; 
    lblconpassword.innerHTML =  "Confirm Password should be atleast having 8 characters"; 
    document.getElementById("lblpassword").className = '';
    document.getElementById("lblconpassword").className = '';
    isValidated = false;
}else{
    if(password!=con_password){
        lblpassword.innerHTML = "Password and confirm password must be same"; 
        lblconpassword.innerHTML = "Password and confirm password must be same"; 
        document.getElementById("lblpassword").className = '';
        document.getElementById("lblconpassword").className = '';
        isValidated = false;
    }else{
        document.getElementById("lblpassword").className = 'hidden';
        document.getElementById("lblconpassword").className = 'hidden';
        isValidated = true;
    }
}
if(isValidated){
    return true;
}else{
    return false;
}

}
//function defined for checking phone number format.
function checkphoneNumber(number){
    var regex_phone =  /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/ ;
    if(number.value.match(regex_phone)){
        return true;
    }else{
        return false;
    }
}


