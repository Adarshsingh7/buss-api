export const forgotPasswordTemplate = (url: string) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email from Adarsh | react-quick-restro</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4caf50;
      padding: 10px;
      text-align: center;
      color: white;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      margin: 20px 0;
      font-size: 16px;
      line-height: 1.6;
      color: #333333;
    }
    .content p {
      margin-bottom: 20px;
    }
    .footer {
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #777777;
      background-color: #f4f4f4;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    .button {
      display: inline-block;
      background-color: #4caf50;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 4px;
      margin-top: 20px;
    }
    .button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <h1>Welcome to React-Quick-Restro</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <p>Hi there,</p>
      <p>You have received a message from Adarsh at React-Quick-Restro.</p>
      <p>Forgot your password try resetting on this link valid for 10 min only <i><strong>DO NOT SHARE THIS LINK</strong></i></p>
      <p>${url}</p>
      <a href="#" class="button">Visit Website</a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Thank you for being a part of React-Quick-Restro.</p>
      <p>&copy; 2024 React-Quick-Restro</p>
    </div>
  </div>
</body>
</html>
`;
