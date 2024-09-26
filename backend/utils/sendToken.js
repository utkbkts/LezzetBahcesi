export default (user, statusCode, res) => {
  const jwtToken = user.getJwtToken();

  const setCookies = () => {
    res.cookie("jwtToken", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
    });
  };
  setCookies();
  res.status(statusCode).json({
    user,
  });
};
