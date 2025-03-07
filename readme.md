# High Availability (HA) Setup with Docker, HAProxy, and Node.js

This project demonstrates a simple **High Availability (HA)** setup using Docker, HAProxy, and Node.js. 

It includes:
- Two Node.js web servers (`app1` and `app2`) that dynamically generate and display a UUID.
- An HAProxy load balancer that distributes traffic between the two web servers.

---

## **Features**
- **Load Balancing**: HAProxy distributes incoming traffic between `app1` and `app2`.
- **Dynamic Content**: Each web server generates a unique UUID for every request.
- **Dockerized**: All components are containerized using Docker for easy setup and testing.

---

## **Prerequisites**
Before you begin, ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Docker Desktop for Windows will install both docker and docker-compose.

---

## **Setup Instructions**

### **1. Clone the Repository**
Clone this repository (or create the project structure manually):
```bash
git clone <repository-url>
cd ha-docker-demo
```

### **2. Build and Start the Containers**
Run the following command to build and start the Docker containers:
```bash
docker-compose up -d
```
This will:
- Build the Docker images for `app1` and `app2`.
- Start the HAProxy load balancer and the two Node.js web servers.

### **3. Build and Start the Containers**
Check if all containers are running:
```bash
docker ps
```
You should see three containers::
- `haproxy`
- `app1`
- `app2`

---
## **Testing the Setup**
### **1. Access the Load Balancer**
Open your browser and go to:
```bash
http://localhost
```
### **2. Observe the Output**
- Refresh the page multiple times.
- You should see responses alternating between:
    - "Hello from Web Server 1!" with a UUID.
    - "Hello from Web Server 2!" with a UUID.

---
## **Configuration Files**
### **haproxy.cfg**
The HAProxy configuration file defines the load balancing rules:
```bash
global
    daemon
    maxconn 256

defaults
    mode http
    timeout connect 5000ms
    timeout client 50000ms
    timeout server 50000ms

frontend http_front
    bind *:80
    default_backend http_back

backend http_back
    balance roundrobin
    server app1 app1:80 check
    server app2 app2:80 check
```
### **Node.js Web Servers**
Each web server (`app1` and `app2`) serves an HTML page with a dynamically generated UUID:
```bash
import http from 'http';
import { v4 as uuidv4 } from 'uuid';

const hostname = '0.0.0.0';
const port = 80;

const server = http.createServer((req, res) => {
  const uuid = uuidv4();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Web Server</title>
      </head>
      <body>
        <h1>Hello from Web Server!</h1>
        <p>System UUID: ${uuid}</p>
      </body>
    </html>
  `);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
---
## **Stopping the Setup**
To stop and remove the containers, run:
```bash
docker-compose down
```
