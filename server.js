const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const host = "127.0.0.1";
const ordersFile = path.join(root, "orders.json");

const types = {
  ".html": "text/html;charset=utf-8",
  ".css": "text/css;charset=utf-8",
  ".js": "application/javascript;charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url.split("?")[0] === "/api/orders") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) req.destroy();
    });
    req.on("end", () => {
      try {
        const order = JSON.parse(body || "{}");
        if (!order.customer?.email || !order.customer?.name || !Array.isArray(order.items) || !order.items.length) {
          res.writeHead(400, { "Content-Type": "application/json;charset=utf-8" });
          res.end(JSON.stringify({ error: "Missing order information" }));
          return;
        }

        const existing = fs.existsSync(ordersFile)
          ? JSON.parse(fs.readFileSync(ordersFile, "utf8") || "[]")
          : [];
        const savedOrder = {
          ...order,
          orderId: `TF-${Date.now()}`,
          status: "paid_pending_fulfillment",
        };
        existing.push(savedOrder);
        fs.writeFileSync(ordersFile, JSON.stringify(existing, null, 2));
        res.writeHead(201, { "Content-Type": "application/json;charset=utf-8" });
        res.end(JSON.stringify({ orderId: savedOrder.orderId, status: savedOrder.status }));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json;charset=utf-8" });
        res.end(JSON.stringify({ error: "Invalid order payload" }));
      }
    });
    return;
  }

  let pathname = decodeURIComponent(req.url.split("?")[0]);
  if (pathname === "/") pathname = "/index.html";

  const file = path.normalize(path.join(root, pathname));
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
    });
    res.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`FishWeb preview: http://${host}:${port}`);
});
