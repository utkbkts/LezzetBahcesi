export const getContactHtmlTemplate = (email, message) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lezzet Bahçesi</title>
    <style type="text/css">
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
      }
      .container {
        width: 100%;
        padding: 15px;
        background-color: #f4f4f4;
      }
      .email-content {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
      .email-header {
        font-size: 20px;
        font-weight: bold;
        color: #333;
        margin-bottom: 15px;
      }
      .email-body {
        font-size: 16px;
        color: #555;
        line-height: 1.5;
      }
      .email-footer {
        font-size: 14px;
        color: #999;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="email-content">
        <div class="email-header">
          Lezzet Bahçesi Bir Mesajınız Var
        </div>
        <div class="email-body">
          <p><strong>Gönderen:</strong> ${email}</p>
          <p><strong>Mesaj:</strong></p>
          <p>${message}</p>
        </div>
        <div class="email-footer">
          Bu mesaj Lezzet Bahçesi web sitesinden gönderildi.
        </div>
      </div>
    </div>
  </body>
</html>
`;
