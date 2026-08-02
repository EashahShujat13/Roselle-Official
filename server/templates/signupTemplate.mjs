const signupTemplate = (fullname) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>

<body style="margin:0;padding:0;background:#f7f3ff;font-family:Arial,sans-serif;">

<table width="100%" cellspacing="0" cellpadding="0">
<tr>
<td align="center" style="padding:40px;">

<table width="600" cellspacing="0" cellpadding="0"
style="background:#ffffff;border-radius:18px;padding:40px;">

<tr>
<td align="center">

<h1 style="color:#b48cf0;letter-spacing:8px;">
ROSELLE
</h1>

<h2 style="color:#333;">
Welcome to Roselle Official
</h2>

<p style="font-size:16px;color:#666;line-height:28px;">
Hi <b>${fullname}</b>,
<br><br>
Your account has been created successfully.
<br>
We're excited to have you as part of our family.
</p>

<a
href="http://localhost:5173"
style="
display:inline-block;
margin-top:25px;
background:#b48cf0;
color:white;
padding:14px 35px;
border-radius:30px;
text-decoration:none;
font-weight:bold;
"
>
Explore Collection
</a>

<p style="margin-top:40px;color:#999;">
Thank you for choosing Roselle.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};

export default signupTemplate;