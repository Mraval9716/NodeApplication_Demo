var express = require("express");
var path = require("path");

var express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const { check, validationResult } = require('express-validator');
const { info } = require("console");
const mongoose = require("mongoose"); 
// parse application/x-www-form-urlencoded


// create a new express app
var myApp = express();
myApp.use(bodyParser.urlencoded({ extended: false }));

myApp.use(express.static(path.join(__dirname, 'public')));

myApp.set('views', path.join(__dirname, 'views'));

myApp.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/foodpanda", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Session method as per the instructions from lecture for using session in application.
myApp.use(session({
  secret: 'superrandomsecret',
  resave:false,
  saveUninitialized: true
}));

// http://localhost:8080
myApp.get("/", function (req, res) {
    res.render('index');
});

// http://localhost:8080/about
myApp.get("/about", function (req, res) {

  res.render('about');
});

myApp.get("/orders", function (req, res) {
    res.render('orders');
  });
// create a restaurant model and define its schema
const RestaurantModel = mongoose.model("restaurant", {
 restaurantName: String,
  address: String,
  phone_no: String,
  email: String,
  password: String,
  description:String,
  cuisine: String,
});
const phoneNoFormat=RegExp(/^\d{3}-\d{3}-\d{4}$/);
  myApp.get("/registration", function (req, res) {
    console.log("Get Request for params");
    res.render('registration');
  });
  myApp.post("/registration", [
    check('res_name').not().isEmpty().
    withMessage("Restaurant name cannot be empty"),
    check("res_address")
    .not()
    .isEmpty()
    .withMessage("Restaurant address can't be empty"),
    check("email").not().isEmpty()
    .withMessage("Email address can't be empty")
    .isEmail().withMessage("Must be a valid email address"),
     check("phone_no").not()
     .isEmpty()
     .withMessage("Phone number cannot be empty")
    .matches(phoneNoFormat)
    .withMessage("Phone number should be in XXX-XXX-XXXX format."),
     check("password").not().isEmpty().
     withMessage("Password can not be empty").isLength({ min: 8 })
    .withMessage("Password should contain atleast 8 characters").custom(customPasswordValidation),
    check("confirm_password").not().isEmpty().withMessage("Confirm Password can not be empty")
    .isLength({ min: 8 })
    .withMessage("Confirm Password should contain atleast 8 characters")

  ], function (req, res) {
    const errors = validationResult(req);
     var info = {};
  if (!errors.isEmpty()) {   
     info = { errors: errors.array() };  
     console.log(info);
       res.render('registration', info);  }
    else{
      //Code to feed values to mongo db schema
      console.log(req.body.phone_no);
      var resnameForm = req.body.res_name;
      var addressForm = req.body.res_address;
      var phoneNoForm = req.body.phone_no;
      var emailForm = req.body.email;
      var passwordForm = req.body.password;
      var descriptionForm = req.body.description;
      var cuisineForm = req.body.cuisine;
      console.log(req.body.phone_no);
      var restaurantData = {
        restaurantName: resnameForm,
        address:addressForm,
        phone_no:phoneNoForm,
        email: emailForm,
        password: passwordForm,
        description: descriptionForm,
        cuisine:cuisineForm,
      };
      

      // create a new instance of the Restaurant model and save the formdata
      var newRestaurant = new RestaurantModel(restaurantData);
      //Data added to database with new restaurant registration
      newRestaurant.save().then(function () {
        // wait for async operation to complete and then render the dahboard
        console.log("New restaurant added to food panda online ordering");
        req.session.restaurantName = resnameForm;
        console.log(req.session.restaurantName);
        //Put page to be rendered on successful registration
        res.render("index", newRestaurant);
      });
    }
  }
  );
  function customPasswordValidation(value, { req }) {
    if (value !== req.body.confirm_password) {
      throw new Error("Password should be the same as confirm password");
    }
    return true;
  }
 
myApp.listen(8080);
console.log("Food panda online orders is running on the port 8080");