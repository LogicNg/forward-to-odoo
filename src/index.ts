import * as http from "http";
import httpProxy from "http-proxy";

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Handle any errors that occur during proxying
proxy.on("error", (err, req, res) => {
  console.error("Proxy error:", err);
  if (res instanceof http.ServerResponse) {
    res.writeHead(500, {
      "Content-Type": "text/plain",
    });
    res.end("Proxy error: " + err.message);
  }
});

// Create an HTTP server that receives requests and forwards them
const server = http.createServer((req, res) => {
  console.log(`Forwarding request: ${req.method} ${req.url}`);

  proxy.web(req, res, {
    target: "http://59.148.57.22:8969",
  });
});

// Listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
