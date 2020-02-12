# ReactWebStore
Technical information:
1) It has a React JS front end, an ASP.Net API for the back-end and it is connected to a SQL database hosted in Azure. Currently, it features various aspects from the Material UI Framework and Bootstrap.

2) It is integrated with Stripe which is a 3rd party payment processor. Stripe can take a customer's credit card information and bill it with the order total without ever needing to touch confidential credit card information.

3) Also, it uses Auth0 for authentication as a service. Auth0 helps me handle the complexity of authentication and authorization for my webstore. It helps me determine who is a valid user and who can access restricted parts of the website.

4) It makes various API calls to my API controllers to update, delete and insert records into the database. a) In terms of the back end, it keeps track of the items in the shopping cart by having a Shopping Cart header table to keep track of information regarding the session. Each item is entered in as its own separate row in the Shopping Cart line items table. The session ID is stored in the browser. This is used to match the right user to the cart when the user checks out. It collects information such as the name, email, billing information, delivery information and a token summarizing the credit card information. The token information is sent to Stripe for billing and then again the back end pre-populates the order header table with the customer's information and the order line table with the item ordered.
5) In terms of authentication. Auth0 uses JSON web tokens for the underlying mechanism to create access tokens. If the user does not provide a valid token in the header of the request, it will be denied access to the Order history page and Account details page even with the correct HTTP Post data. Once a user logs in, he is able to view all orders he has placed under that account including the order date, billing/delivery information associated with the order and products tied to that order. Also, the logged-in user can view his account details page. Upon visiting this page, he can set his default information including his name and billing/delivery information. When he does checks out, that information can be pre-populated at check out if desired. This information will be stored in 3 tables. One table includes the name, email and flag needed to determine if the information should be pre-populated at check out. The other table contains the billing information. The 3rd table contains the delivery information.

Non-Technical information:
My webstore has the following features:

1) View items and add items to your cart

2) View your shopping cart and head to the checkout

3) Insert all your Billing, Delivery and credit card information before you check out

4) Check out and your payment information is sent to Stripe for billing

5) Create an account and log in

6) Once logged in, you can view your order history

6) Once logged in, you can set your default account information. Once this is set, that information can be used to prepopulate the checkout forms with your default checkout information

If you would like to do a simulated checkout, please use 4242 4242 4242 4242 4242 42/42 424 as a test credit card in order to complete the checkout.

*** If the application does not load after 10 seconds, please refresh the page *******

Github Account Info:
I have seperated my app into 2 folders. The front end folder will contain my React JS front end and the back end folder will contain my ASP.NET API endpoint.

Please see my Web store live: https://reactwebstore.azurewebsites.net 
