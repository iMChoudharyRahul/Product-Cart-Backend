# Project Apis list
 ## Auth apis
   1. SignUp api: Name, Phone no, email, password
   2. Login Api: phone no/email, password

 ## Middleware Apis
   1. Authenticate the values we get 
   2. image upload/ file upload

 ## Product Api
   1. Add products: title, price, category, description, company, productImage.
   2. Get All Product: 
   3. get product by product id(single product): _id
   4. update the product: _id, 
   5. delete the product: _id
   6. search product: name, company


## Process 
  app --> router --> controller(request and response) --> services(Business Logic) ---> deo(database queries) --> (model) or helper --> service --> controller ---> response send to client

## Steps:
   1. Folder Structure of our project
   2. Basic Setup our server and Middleware 
   3. Connect our Database
   4. Create our first Model: userModel
   5. Now we create our first Api: SingUP Api: