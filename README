Please run with these command
yarn install root dir first 
then
cd to /apps
   cd to backend -> yarn install
   cd to frontend -> yarn install

cd back to /apps
  yarn run dev:frontend
  yarn run dev:backend

(React Questions 2). Write a unit test for the UserProfile React component using Jest and React Testing
Library.
(for question 3). Design and develop two APIs using NestJS and Postgres with the following
specifications:
http://localhost:3000/ -> FE
http://localhost:3001/ -> BACKEND
-----------------------------
(Back-end Questions)

1. Assuming the system currently has three microservices: Customer API, Master Data API,
and Transaction Data API, there is a new feature that requires data from all three
microservices to be displayed in near real-time. The current technology stack includes
REST APIs and an RDBMS database. How would you design a new API for this feature?

MICRO SERVICE DESIGN

![Product Screenshot](https://raw.githubusercontent.com/paoonline/my-product/master/apidesign.png)

 (Micro service design)
- Services are split: Customer API, Master Data API, Transaction API
* Each has its own database (likely per bounded context)
Call api gateway first
Central entry point for routing, rate-limiting

(Producer)  Customer API,  Master Data API, Transaction Data API,  post data to db and event to kafka
Each service writes to its own DB
Then publishes events to Kafka (e.g., customer.created, transaction.updated, etc.)

(KAFKA) Event steam  send event to redis consumer
Kafka consumer listens for events
Writes processed/aggregated data into Redis 

(When write to redis , Redis has limited durability  use DB backup as well)
Since Redis is not persistent by default, you add:
* DB backup for recovery
* Optional: Redis AOF (Append-Only File) or RDB snapshot config

(INT api for initial BACKUP table)
An internal API to dump Redis data into backup DB

(Batch job)
Clear redis after midnight because  Redis has limited durability

(NEW API get from redis and will be near real time)
For read performance: new consumer-facing API reads from Redis

----------------
2. Assuming the team has started planning a new project, the project manager asks you for a
performance test strategy plan

should ask project manager about this
Declare Objective 
Validate system performance under expected and peak load conditions.

Analysis Risk with Risk management

Scope Release discusstion 
Critical APIs 
Frontend Backend services (database queries, caching layers)

Test Types
Load Testing: k6, JMeter, 

Test Environment report
Pen test report

(Tool prepare report)
Monitoring: Prometheus + Grafana, Datadog
CI/CD Integration
Sonar cube -> need to pass all service

Sign-off & Post-Release Monitoring report

----------------------
(Additional Requirements)

(Validation):
   Ensure proper DTO type checking to prevent invalid data structures.
   DTO Protection: Protect each DTO to avoid unintended data injection from other request sources.
   SQL Injection: Implement safeguards to prevent SQL injection attacks from user input.
   Symbol Replacement: Sanitize and replace special characters like < and > with . to avoid SQL injection and parsing issues.
   XSS Protection: Implement measures to prevent Cross-Site Scripting (XSS) attacks from malicious actors.


(Database design):

-- Table to support multi-language translations (many-to-one with product)
Many to one
 CREATE TABLE product_translation (
  id UUID PRIMARY KEY,
  // ref product table
  product_id UUID REFERENCES product(id) ON DELETE CASCADE AUTOGEN,
  // product name
  name VARCHAR(50) NOT NULL,
  // product description
  description VARCHAR(255),
  // country  th, en
  lang VARCHAR(2) NOT NULL
);

-- Table to store products (one product can have many translations with other lang)
CREATE TABLE product (
  id UUID PRIMARY KEY, one
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

const [data, total] = await this.translationRepo.findAndCount({
      where: {
        name: ILike(`%${name}%`),
        lang,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

// we can used this query for select product with multilang
SELECT * 
FROM product_translation p
WHERE p.name ILIKE '%' || $1 || '%'
  AND p.lang = $2
ORDER BY p.id ASC
LIMIT $3 OFFSET ($4 - 1) * $3;

(Testing Strategy):

   unit tests
      jest and mocha
      Focus on small, isolated functions or components.
      Test each function with various inputs and verify expected outputs.
      No dependencies on databases or external services.

   integration tests,
      Test how multiple modules work together (e.g., Controller + Service + DB).
      Includes database connection (often mocked or using test DB).
      Handles cases like success, validation, and error scenarios.
   
    end-to-end testing
      Simulates the full flow from request to response.   
      Uses tools like Supertest (for NestJS) or Cypress (for frontend).
      Often run against staging or test environments.

----------
React Questions
   useCallback ใช้ทําอะไร  -> use for subscribe state for callback function

   example:
   const memoizedCallback = useCallback(() => {
     // function logic
   }, [dependency1, dependency2]);





