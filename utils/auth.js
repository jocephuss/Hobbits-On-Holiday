const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};
//this middleware checks if the user is logged in before allowing access to certain routes. If not, it

module.exports = withAuth;
