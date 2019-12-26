# ReactWebStore
My application is now live!! It has a React JS front end, ASP.Net API for the back-end and it is connected to a SQL database hosted in Azure. It makes various API calls to my API controller to update, delete and insert records into the database.
Currently it features various aspects from the Material UI Framework and Bootstrap. It is integrated with Stripe which is a 3rd party payment processor. Stripe can take a customers credit card information and bill it with the order total without ever needing to touch confidential credit card information.
In terms of the back end, it keeps track of the items in the shopping cart by having a Shopping Cart header table to keep track of information regarding the session. Each item is entered in as its own seperate row in the Shopping Cart line items table. The session ID is stored in the browser. This is used to match the right computer 
When the user checks out, it collects information such as the name, email, billing, delivery address and a token summarizing the credit card information. The token information is sent to Stripe for billing and again the back end prepopulates 
the order header table with the customers information and the order line table with the item ordered. If you would like to do a simulated check out, please use 4242 4242 4242 4242 4242 42/42 424 as a test credit card in order to complete the checkout. 

*** If the application does not load after 10 seconds, please refresh the page *******

I have seperated my app into 2 folders. The front end folder will contain my React JS front end and the back end folder will contain my ASP.NET API endpoint.


Please see my Web store live: https://reactwebstore.azurewebsites.net (Please note it is still being developed at the moment)
