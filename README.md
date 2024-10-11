KaniMart: A Comprehensive E-Commerce Platform
KaniMart is an Amazon-inspired, feature-rich e-commerce platform based on sleek user-friendly design principles. The objective of KaniMart is to provide administrators with the robust management tools while making shopping seamless for its users. In short, the platform caters for an extensive range of e-commerce functionalities that ensure customers and administrators have access to all the necessary tools and features that efficiently are required for effective online retailing.


Core Features and Functionalities

For Users:
Product Browsing: Browse through hundreds of products with categories and detailed product pages for hassle-free navigation and purchase.
Reviews & Ratings: Provide reviews and ratings to share your feedback and help other users make informed choices.
Order Management: Order, track status, and view order history for a completely transparent shopping experience.
Account Management: Change profile, reset or change password, and manage all your account details in a secure environment.

For Administrators:
Product Management: Create, edit, and inventory management.
Order Management: View and update customer order, with auto-completion
User Role Management: Assign or change the user role in case a proper organizational control
Review Moderation: Read offending reviews to eliminate them.

User-centric & secure application
This website will focus both on the site's user experience and security. Features will include password reset, secure profile management, and role-based access control to protect data and provide satisfaction to users. KaniMart is made with inspiration from Amazon sound and familiar interface: delivering a professional, trustworthy, and efficient online shopping experience.

Create a config.env file in backend/config folder
Use MongoDB, the schemas are predefined.
Run this in terminal in both root directory and in frontend folder:
npm install 

Add these in config.env:

PORT=8000
NODE_ENV=production/development
DB_LOCAL_URI=
JWT_SECRET=
JWT_EXPIRES_TIME=
COOKIE_EXPIRES_TIME=
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM_NAME=
SMTP_FROM_EMAIL=
BACKEND_URL=http://127.0.0.1:8000
FRONTEND_URL=http://127.0.0.1:3000
STRIPE_API_KEY=
STRIPE_SECRET_KEY=
