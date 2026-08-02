const resetPasswordTemplate = (fullname, resetLink) => {
  return `
<!DOCTYPE html>
<html>

<body style="margin:0;padding:0;background:#f7f3ff;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">

<tr>

<td align="center" style="padding:40px;">

<table width="600"
style="background:white;border-radius:18px;padding:40px;">

<tr>

<td align="center">

<h1 style="color:#b48cf0;letter-spacing:8px;">
ROSELLE
</h1>

<h2 style="color:#333;">
Reset Password
</h2>

<p
style="
font-size:16px;
line-height:28px;
color:#666;
"
>

Hi <b>${fullname}</b>,
<br><br>

We received a request to reset your password.

</p>

<a
href="${resetLink}"
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

Reset Password

</a>

<p
style="
margin-top:35px;
color:#999;
font-size:14px;
"
>

This link expires in 15 minutes.

</p>

<p
style="
font-size:13px;
color:#999;
"
>

If you didn't request this,
please ignore this email.

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

export default resetPasswordTemplate;