# Cloud Architecture Demo

A Java-based Proof of Concept (PoC) developed to demonstrate fundamental cloud architecture patterns, resilience mechanisms, and cloud computing technologies through a single application.

The project combines practical implementations of software design patterns with containerization and AWS services.

## Technologies

- **Java 17** – Main programming language.
- **Spring Boot** – Backend development and REST API.
- **Maven** – Dependency management and build automation.
- **Resilience4j** – Fault tolerance and resilience patterns.
- **Docker** – Application containerization.
- **Docker Compose** – Multi-container application management.
- **Nginx** – Reverse proxy and load balancing.
- **AWS Lambda** – Serverless computing.
- **AWS ECS** – Container orchestration.
- **AWS EC2** – Cloud infrastructure and deployment.

## Implemented Features

The project aims to demonstrate the following eight topics:

| # | Pattern / Technology | Description |
|---|---|---|
| 1 | Circuit Breaker | Prevents repeated requests to failing services. |
| 2 | Retry Pattern | Automatically retries failed operations. |
| 3 | Timeout Pattern | Limits the maximum waiting time for operations. |
| 4 | Serverless & Docker | Demonstrates AWS Lambda and Docker containers. |
| 5 | API Gateway, Load Balancer & Reverse Proxy | Manages and distributes incoming requests. |
| 6 | Hub-and-Spoke Architecture | Demonstrates centralized communication between services. |
| 7 | Lift-and-Shift Migration | Demonstrates application migration to AWS infrastructure. |
| 8 | Bastion Host | Demonstrates secure access to private cloud resources. |

## Current Implementations

The following components have been developed and tested locally:

- REST API with Spring Boot.
- Circuit Breaker implementation.
- Retry mechanism.
- Timeout handling.
- Hub-and-Spoke communication simulation.
- Docker Compose configuration with two backend instances.
- Nginx reverse proxy and load balancing configuration.
- Java 17 AWS Lambda function.

Additional AWS infrastructure demonstrations and deployment configurations are planned.

## Project Structure

```text
cloud-architecture-demo/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── org/uce/patterns/
│       │       ├── controller/
│       │       ├── service/
│       │       └── lambda/
│       └── resources/
│
├── infrastructure/
│   └── nginx/
│       └── nginx.conf
│
├── Dockerfile
├── compose.yml
├── pom.xml
└── README.md
```

## Getting Started

### Prerequisites

- Java 17
- Maven
- Docker Desktop
- IntelliJ IDEA (recommended)

### Run Locally

Clone the repository:

```bash
git clone https://github.com/jgsoto/architecture-patterns.git
```

Navigate to the project directory:

```bash
cd patterns
```

Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

The application will be available at:

```text
http://localhost:8080
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/hello` | Basic application response. |
| GET | `/api/circuit-breaker` | Demonstrates Circuit Breaker. |
| GET | `/api/retry` | Demonstrates automatic retries. |
| GET | `/api/timeout` | Demonstrates timeout handling. |
| GET | `/api/hub-spoke` | Demonstrates Hub-and-Spoke communication. |
| GET | `/api/lambda` | Executes the Lambda handler locally. |

## Docker Deployment

Build and start the containers:

```bash
docker compose up --build -d
```

Check running containers:

```bash
docker ps
```

The application can be accessed through Nginx:

```text
http://localhost/api/hello
```

Stop the containers:

```bash
docker compose down
```

## AWS Lambda

The project includes a Java 17 Lambda handler that receives an event and returns a greeting message.

Example input:

```json
{
  "name": "Student"
}
```

Expected output:

```text
Hola Student! Esta respuesta fue generada por AWS Lambda.
```

The handler can be tested locally through the Spring Boot API. Deployment to AWS Lambda is part of the planned cloud implementation.