
# Demoblaze Functional Test Plan + Automation Suite

**Test Website:** https://demoblaze.com/index.html  
**Goal:** Demonstrate functional testing approach, test design, automation selection rationale, and documentation of issues/bugs.

### Note: test files are located under the e2e folder.

---

## Objective

Complete the following requirements against the test website to showcase:
- Functional testing approach
- Test case design skills
- Ability to employ automation for quality assurance

This assessment focuses on **technical skill: test planning and automation testing**.

---

## Scope

### In Scope (Functional)
- Navigation and core UI routes (Home, Product Details, Cart)
- Product browsing and category filtering
- Add-to-cart and cart rendering behaviour
- Checkout flow (Place Order modal + purchase confirmation)
- User system (Sign up + Login)
- Contact form validation
### Out of Scope (for this exercise)
- Performance/load testing at scale
- Security testing (auth bypass, injection, etc.)
- Visual regression beyond basic checks
- Cross-browser deep matrix (kept small for time)

---

## Testing Approach

### Types of functional tests to prioritize

1. **Smoke Tests (P0)**
   - Verify the application is reachable and core pages load.
   - Validate critical UI elements exist (navbar, product list, cart button).

2. **Critical User Journey (P0)**
   - Browse product → open product detail → add to cart → verify in cart.
   - Checkout (Place Order) → complete purchase → confirmation shown.

3. **Regression Tests (P1)**
   - Category filtering changes the product list.
   - Cart item removal updates the cart list and total.

4. **Negative / Validation Tests (P2)**
   - Checkout with missing fields (if validation exists).
   - Handling of empty cart checkout attempts.

> Rationale for prioritization: The highest business risk is the user journey that drives purchases.
> We prioritize flows that cover navigation, product selection, cart correctness, and checkout completion.

---

## Rationale for chosen automation approach

### Why E2E UI automation (vs. only unit/integration)
- The system is a plain HTML + JS website; many behaviours are driven by client-side scripts and modals.
- Key risks are in UI wiring and user flow correctness (cart, checkout).
- E2E tests simulate real user actions and validate the experience end-to-end.

### Risk-based and maintainable
- Limit to a small set of high-value tests (up to 5) to keep suite stable.
- Use robust selectors and explicit waits for dynamic content.
- Centralize page actions in small “Page Objects” for readability.

---

## Tools / Frameworks Considered

### Candidate tools
- **Playwright** (Chosen)
- Cypress
- Selenium/WebDriver

### Why Playwright was chosen
- Reliable auto-waits and modern handling of SPA-like behaviour
- Strong selector engine and built-in test runner, tracing, screenshots/video
- Simple parallelization and CI friendliness

**Language:** TypeScript (common in web QA automation, fast iteration)

---

## Environment & Execution

### Prerequisites
- Node.js 18+ recommended
- `npm install` then `npx playwright install`

### Run commands
- `npx playwright test`
- `npx playwright test --headed`
- `npx playwright show-report`

### Artifacts
- HTML report
- Screenshots/traces on failures (configurable)

---

## Automated Test Cases (Up to 5)

> Each test documents scenario + reason to automate.

### TC01 – Smoke and basic performance testing
**Scenario 1:**  
Open `https://www.demoblaze.com/ ` and verify navbar and a product exists, confirm loading times.

**Why automate:**  
Fast indicator of site availability and broken deployments.

**Expected:**  
Navbar links visible, product list container visible, loading times are acceptable.

---

**Scenario 2:**  
On Home page, click a category (e.g., “Laptops”) and confirm product cards update.

**Why automate:**  
Category filtering is common functionality with frequent UI regressions due to async rendering.

**Expected:**  
Product list is displayed; content changes after selecting category.

---

**Scenario 3:**
On Home page, click on the cart link and confirm page updates.

**Why automate:**  
Fast indicator of site navigation availability and broken deployments.

**Expected:**  
Cart page loads and displays a list (if any).

---

### TC02 - Critical Journey: Cart 
**Scenario 1 :**  
Add product to cart and verify it appears in Cart.
Open first product → click “Add to cart” → navigate to Cart → verify item present.

**Why automate:**  
This is a core conversion step, high business impact.

**Expected:**  
Cart contains the added product.

---

**Scenario 2 :**  
Delete item removes it from cart (and updates total if applicable)
Open first product → click “Add to cart” → navigate to Cart → ensure cart has an item → click “Delete” → verify row removed.


**Why automate:**  
Cart correctness and removal behaviour are frequently broken by UI changes.

**Expected:**  
Item disappears from cart; total updates (if total is displayed).

---

**Scenario 3 :**  
Add 2 products to cart and verify it appears in Cart.
Open first product → click “Add to cart” → open second product → click “Add to cart” → navigate to Cart → verify items present.

**Why automate:**  
This is a core conversion step, high business impact.

**Expected:**  
Cart contains the added products.

---

### TC03 - Checkout: 
**Scenario 1:**  
Place order successfully completes purchase
Ensure an item is in cart → click “Place Order” → fill required fields → Purchase → confirm success.

**Why automate:**  
Checkout completion is the most critical user flow and most valuable E2E test.

**Expected:**  
Success confirmation dialog appears (e.g., “Thank you for your purchase!”).

---

**Scenario 2:**  
Incorrect details in order does not completes purchase
Ensure an item is in cart → click “Place Order” → incorrectly fill required fields → Purchase → confirm error.

**Why automate:**  
Checkout completion is the most critical user flow and most valuable E2E test, invalid purchase details will lead to loss of money.

**Expected:**  
Error confirmation dialog appears (e.g., “Invalid Details!”).

---

**Scenario 3:**  
No product in order does not completes purchase
Ensure no item is in cart → click “Place Order” → fill required fields → Purchase → confirm error.

**Why automate:**  
Checkout completion is the most critical user flow and most valuable E2E test, no product being purchased should not be processed.

**Expected:**  
Error confirmation dialog appears (e.g., “No product being ordered!”).

---

### TC04 - Contact: 
**Scenario 1:**  
Open and close contact form
From home page → click “Contact” → click the close dialog button

**Why automate:**  
Feedback and reporting issues with the site are necessary for users.

**Expected:**  
Contact form opens and closes.

---

**Scenario 2:**  
Open and fill out a valid form
From home page → click “Contact” →  fill required fields → click “Send message”

**Why automate:**  
Feedback and reporting issues with the site are necessary for users.

**Expected:**  
Contact form can be filled out successfully.

---

**Scenario 3:**  
Open and fill out an invalid form with an incorrectly formatted email
From home page → click “Contact” →  fill required fields → click “Send message”

**Why automate:**  
Feedback and reporting issues with the site are necessary for users, site administrators will want to respond to a valid email.

**Expected:**  
Contact form cannot be filled out successfully, specifying the email address is invalid.

---

**Scenario 4:**  
Open and fill out an empty invalid form
From home page → click “Contact” →  fill no fields → click “Send message”

**Why automate:**  
Feedback and reporting issues with the site are necessary for users, it should not process an invalid form.

**Expected:**  
Contact form cannot be filled out successfully, specifying all inputs are invalid.

---

### TC05 - Users: 
**Scenario 1:**  
Create a user and sign in
From home page → click “Sign up” →  fill required fields → click “Sign up” → click “Log in” →  fill required fields → click “Log in” → Success

**Why automate:**  
Logging in to save user details and access order histories are important.

**Expected:**  
User is created and can be logged into.

---

**Scenario 2:**  
Create a user
From home page → click “Sign up” →  fill required fields → click “Sign up”

**Why automate:**  
Logging in to save user details and access order histories are important.

**Expected:**  
User is created.

---

**Scenario 3:**  
Sign in with no password
From home page → click “Sign up” →  fill required fields → click “Sign up” → click “Log in” →  fill only username → click “Log in” → Error message


**Why automate:**  
Users should only be able to sign in with their specific password.

**Expected:**  
User is created but cannot be logged into.

---


## Issues / Bugs Found

> This section is intentionally included for documenting defects discovered during exploratory testing or automation runs.


### Defect Template
- **ID:** BUG-001
- **Title:** Purchase can be done with incorrect details
- **Severity / Priority:** Critical
- **Environment:** Chrome/Windows
- **Steps to Reproduce:**
  1. Ensure an item is in cart
  2. Click “Place Order” and only fill a character into Name and Credit Card
  3. Click Purchase
- **Expected Result:** Error confirmation dialog appears (e.g., “Invalid Details!”)
- **Actual Result:** Purchase successful
- **Evidence:**
<img width="542" height="832" alt="image" src="https://github.com/user-attachments/assets/f6610c84-68cf-47ee-b634-ad8ef406e36c" />

- **Notes / Suspected Cause:** No input validation


### Defect Template
- **ID:** BUG-002
- **Title:** No product in order completes purchase
- **Severity / Priority:** High
- **Environment:** Chrome/Windows
- **Steps to Reproduce:**
  1. Ensure no item is in cart
  2. Click “Place Order” and only fill required fields
  3. Click Purchase
- **Expected Result:** Error confirmation dialog appears (e.g., “Invalid Order!”)
- **Actual Result:** Purchase successful
- **Evidence:** 
<img width="526" height="839" alt="image" src="https://github.com/user-attachments/assets/ac8f0eff-5877-4372-846a-649c12d27aed" />

- **Notes / Suspected Cause:** No verification that an item is required for purchase


### Defect Template
- **ID:** BUG-003
- **Title:** Contact form with an incorrectly formatted email allows submission
- **Severity / Priority:** Medium
- **Environment:** Chrome/Windows
- **Steps to Reproduce:**
  1. Open the contact form
  2. Incorrectly fill required email field
  3. Click Send Message
- **Expected Result:** Error confirmation dialog appears (e.g., “Invalid Email!”)
- **Actual Result:** Message successful
- **Evidence:**
<img width="514" height="505" alt="image" src="https://github.com/user-attachments/assets/1f4bfcd4-e62a-4803-88d4-8813d9088fbb" />

- **Notes / Suspected Cause:** No verification that of valid email addresses


### Defect Template
- **ID:** BUG-004
- **Title:** Contact form with an empty form allows submission
- **Severity / Priority:** Low
- **Environment:** Chrome/Windows
- **Steps to Reproduce:**
  1. Open the contact form
  2. Don’t fill any fields
  3. Click Send Message
- **Expected Result:** Error confirmation dialog appears (e.g., “Invalid Details!”)
- **Actual Result:** Message successful
- **Evidence:**
<img width="504" height="500" alt="image" src="https://github.com/user-attachments/assets/0bbdfb50-82e1-4564-877f-7210b2b9d8d9" />

- **Notes / Suspected Cause:** No verification that fields are being populated


### Known sources of flakiness to watch
- Dynamic product loading (async)
- Browser alert on “Add to cart”
- Cart rendering delays

---

## Summary

This suite is **focused and risk-based**, covering:
- Availability (smoke)
- Discoverability (category browsing)
- Purchase path (add-to-cart + checkout)
- Cart correctness
- Contact forms
- User system

The automation is structured for maintainability and quick CI execution.
