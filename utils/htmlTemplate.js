function getHtmlTemplateForVerification(name, link) {
  return `
    <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            color: #555555;
        }
        .verification-link {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>Dear ${name},</p>
        <p>Thank you for signing up! To complete your registration, please click the link below to verify your email address:</p>
        <a href="${link}" class="verification-link">Verify Email</a>
        <p>If you did not sign up for this account, please ignore this email.</p>
        <p>Best regards,<br> <a href="https://450dsa.com">450DSA</a> </p>
    </div>
</body>
</html>
    `;
}

module.exports = { getHtmlTemplateForVerification };
