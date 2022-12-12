# node_CRUD_user
This ia a REST api of users with authorization where user can signup, login, update and delete his account



**HOW TO USE THIS API:**

Clone this repo using the command ```git clone https://github.com/sumitsharma372/node_CRUD_user.git```

1. Make a **.env** file in ROOT_Directory with the following lines
```
MONGO_URI=<your own mongodb database url>
PORT=4000
JWT_SECRET_KEY=<your own secret key>
```
2. run the command ```npm install``` and to start the application run ```npm start```
3. To Test the api use any REST API Tester e.g POSTMAN
4. The end points are:
```
   /user/signupuser      POST
   /user/loginuser       POST
  
  ( Authorization header required for the following requests Format: 'Authorization: Bearer <token>')
  (You will get the token from previous requests)
  (e.g You can add this in **Auth** section in POSTMAN )
  
   /user/getuser         GET      
   /user/updateuser      PATCH
   /user/deleteuser      DELETE
  ```
  5. req body :
 
      ```
      {
       "name": "",
       "email": "",
       "phone": "",
       "password": ""
      }
      ```
  
### OR YOU CAN DIRECTLY USE THIS API WHICH I HAVE HOSTED ON _RENDER_ 

  - Use the link : [https://node-api-users.onrender.com](https://node-api-users.onrender.com)
  - Use can use this in any API TESTER like POSTMAN or [TALEND API Tester](https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm?hl=en) Chrome Web Extension
  - Now you can use the end points stated in __Point 4__
