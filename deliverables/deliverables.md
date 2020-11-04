# Deliverables
Team 1
---

## Use Case Description
* **A user browses the catalogue (whether logged in or not)**
The user visits the web platform.
The system shows products.
The user can view detailed product information.
The user can add the product into the cart but for the checkout is required to register or login. 
* **An unregistered user register on the web platform**
The user clicks the registration button.
The system requires the input of username/email and password.
The user enters username/email and password.
The system checks the entries:
→ if the username/email already exists, show a warning, and stay on the same page.
→ if the password does not match the strength criteria, show a warning, and stay on     the same page.
→ if an information is missing, show a warning and stay on the same page.
→ if all the information is successfully inserted, continue to the next step. 
The system requires the input of additional information.
The user enters additional information.
The system saves the user input and creates a new user.
The system shows the successful registration popup and redirects the page to the profile.
* **A registered user login to the web platform**
The user clicks the login button.
The system requires the input of username/email and password.
The user enters his/her login credentials.
The system checks the entries:
→ if username/email or password is invalid, show a warning and stay on the same page
→ if username/email and password are entered correctly, the system changes the status of the user to logged in and redirects to the last visited page before clicking on the “Login” button.
The user can click on “Forgot password” if needed.
After clicking on the “Forgot password” button, he/she will receive an email with instructions how to reset the password.
* **A user will add a product**
The user clicks the upload button.
The system requires a product name, description, category and price.
The user enters the informations.
The system stores all information and displays a message.
* **Admin approves a product**
The admin user browse his dashboard with uploaded products.
The system shows all product informations.
The admin decides to approve or decline the product.
→ if admin approves, the product will be displayd on the website.
→ if admin declines, the product will not be displayed an the user gets an message.

## Use Case Diagram

![image 1](./deliverables/UseCaseDiagram1.jpg)

![image 1](./deliverables/UseCaseDiagram2.jpg)

## User Stories

As an unregistered user, I want to register, so I can login to the web platform.
As a registered user, I want to log in, so I can make full use of the web platform.
As an unregistered user, I want to browse the catalogue, so that I can see the products before I must register.
As a registered user, I want to buy and sell products.
As an administrator, I want to approve/disappear products by users, so I can check before they get posted.


## List of Functional and Non-Functional Requirements
**Functional:**
Register a new user
Login a registered user
Browse the catalogue
Sell and buy products

**Non-Functional: (see <a href="https://web.cse.ohio-state.edu/~bair.41/616/Project/Example_Document/Req_Doc_Example.html#Nonfunc">example</a>)**
Security: User data must remain confidential
Supportability: The web platform should run on all standard browsers
Performance: for example max. 5 seconds for login
Usability: The system should be easy to use


## CRC Cards for User Stories

* **User**
Product, Wallet, Transaction, Activity log, User Review, Product Comment
*knows all user details, modify user details, register/login/logout, add a product, modify/delete a own product, can add product comment, make a transaction, can refill wallet, can give user reviews, knows activity log, can buy/sell products*

* **Wallet**
User
*knows User, knows Amount*

* **Admin**
User, Product, Category
*special type of user, can approve/decline products, can add/modify category, can delete user, check activity log of users*

* **Transaction**
User, Product, Activity log, User review, Wallet
*knows user from, knows user to, knows product, knows price of product, initiates/enables user review, can add itself to activity log, cann add/subtract money from users wallet, calculates the price of a timebased product*

* **Activity log**
User, Transaction
*knows user it belongs to, knows transactions*

* **User Review**
User
*knows user from, knows user to, knows content of review*

* **Product**
User, Cateogry, Product Comment
*knows product information, knows infomation about availability*

* **Product picture**
Product
*knows link to image, knows description, knows product*

* **Product comment**
Product, User
*knows content of comment, knows product it belongs to, knows user that created comment*

* **Category**
Product
*knows name*



## Product backlog and sprint backlog

For tracking the tasks that need to be done, its deadlines, assigning the corresponding person that has to complete it and the progress we are using the ticketing system Notion.

The detailed overview can be found on this link: https://www.notion.so/invite/f52cb06cdddb39d3bcf7ba8f894450eb1580b1c5 
