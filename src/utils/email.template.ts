export const forgotPasswordTemplate = (url: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - Buss Trakin System</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 20px 0; text-align: center; background-color: #ffffff;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background-color: #000; border-radius: 8px 8px 0 0;">
                            <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Buss-Trakin-System</h1>
                            <p style="color: #e2e8f0; font-size: 16px; margin: 10px 0 0;">Password Reset Request</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; background-color: #ffffff;">
                            <p style="font-size: 16px; margin: 0 0 20px;">Hello Valued Customer,</p>
                            <p style="font-size: 16px; margin: 0 0 20px;">We received a request to reset your password for your Buss-Trakin-System account. Don't worry, we've got you covered!</p>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 15px; background-color: #edf2f7; border-radius: 8px;">
                                        <p style="font-size: 14px; color: #000; margin: 0 0 10px;">
                                            <img src="https://static-00.iconduck.com/assets.00/clock-icon-2048x2048-org46qq3.png" alt="Clock icon" style="vertical-align: middle; margin-right: 5px; width: 16px; height: 16px;">
                                            This link is valid for 10 minutes only
                                        </p>
                                        <p style="font-size: 14px; color: #000; margin: 0 0 15px;">
                                            <img src="https://t3.ftcdn.net/jpg/01/31/38/66/360_F_131386691_masUVl2XJWujkvbJrCfZPdGZIG9MIKjv.jpg" alt="Lock icon" style="vertical-align: middle; margin-right: 5px; width: 16px; height: 16px;">
                                            For security reasons, please do not share this link
                                        </p>
                                        <p style="font-size: 16px; font-weight: bold; margin: 0 0 15px;">Click the button below to reset your password:</p>
                                        <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 4px;">Reset Your Password</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="font-size: 14px; color: #718096; margin: 0 0 20px;">If you didn't request a password reset, please ignore this email or contact our support team if you have any concerns.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; border-radius: 0 0 8px 8px; text-align: center;">
                            <p style="font-size: 14px; color: #718096; margin: 0 0 10px;">Thank you for being a valued member of Buss-Trakin-System. We're here to make your dining experience extraordinary!</p>
                            <a href="https://Buss-Trakin-System.com" style="display: inline-block; padding: 10px 20px; background-color: #ffffff; color: #000; text-decoration: none; font-weight: bold; border: 1px solid #000; border-radius: 4px; margin-bottom: 10px;">
                                Visit Our Website
                                <img src="https://cdn-icons-png.flaticon.com/128/709/709576.png" alt="External link icon" style="vertical-align: middle; margin-left: 5px; width: 14px; height: 14px;">
                            </a>
                            <p style="font-size: 12px; color: #a0aec0; margin: 0;">&copy; 2024 Buss-Trakin-System. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
