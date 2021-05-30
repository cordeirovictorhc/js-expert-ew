const http = require("http");

const DEFAULT_USER = {
  username: "cordeirovictorhc",
  password: "123456",
};

const routes = {
  "/contact:get": (req, res) => {
    res.write("Contact us");
    return res.end();
  },

  "/login:post": async (req, res) => {
    // response é um iterator!
    for await (const data of req) {
      // data é um buffer
      const user = JSON.parse(data);
      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        res.writeHead(401);
        res.write("Login failed");
        return res.end();
      }

      res.write("Login success");
      return res.end();
    }
  },

  default: (req, res) => {
    res.write("Hello world");
    return res.end();
  },
};

const handler = function (req, res) {
  const { url, method } = req;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;

  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  return chosen(req, res);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("app running at", 3000));

module.exports = app;
