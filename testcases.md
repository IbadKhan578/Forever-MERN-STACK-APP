


requirements:

User should be able to register with name, email, and password.

User should be able to log in with valid credentials.

Logged-in user should be able to create a new post/item.

User should be able to view all posts/items.

User should be able to log out successfully.


| **Test Case ID** | **Scenario**                                | **Precondition**                     | **Steps**                                                                                        | **Expected Result**                                              | **Actual Result** | **Status** |
| ---------------- | ------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ----------------- | ---------- |
| **TC001**        | Verify user registration with valid details | App is open on Register page         | 1. Enter valid name, email, password<br>2. Click “Register”                                      | Account is created successfully and redirected to login page     | As expected       | ✅ Pass     |
| **TC002**        | Verify login with valid credentials         | User account exists                  | 1. Enter valid email & password<br>2. Click “Login”                                              | User redirected to home page/dashboard                           | As expected       | ✅ Pass     |
| **TC003**        | Verify product browsing and details view    | Products exist in database           | 1. Open homepage<br>2. Click on any product                                                      | Product detail page displays name, image, price, and description | As expected       | ✅ Pass     |
| **TC004**        | Verify adding a product to cart             | User is logged in, product page open | 1. Click “Add to Cart” on a product<br>2. Open cart page                                         | Product appears in cart with correct name, quantity, and price   | As expected       | ✅ Pass     |
| **TC005**        | Verify placing an order successfully        | User is logged in, product in cart   | 1. Go to cart page<br>2. Click “Checkout”<br>3. Enter shipping details<br>4. Click “Place Order” | Order confirmation message displayed with unique order ID        | As expected       | ✅ Pass     |
| **TC006**        | Verify login with invalid password          | User account exists                  | 1. Enter valid email but wrong password<br>2. Click “Login”                                      | Error message “Invalid credentials” displayed                    | As expected       | ✅ Pass     |
| **TC007**        | Verify empty cart behavior                  | User is logged in                    | 1. Go to “Cart” page with no products                                                            | Message displayed: “Your cart is empty”                          | As expected       | ✅ Pass     |
