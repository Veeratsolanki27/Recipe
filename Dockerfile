# Stage 1: Build the JAR with Maven & OpenJDK 17
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and src from the Recipe_backend directory
COPY Recipe_backend/pom.xml ./pom.xml
RUN mvn dependency:go-offline -B

COPY Recipe_backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the Spring Boot application with a lightweight JRE
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=build /app/target/*.jar app.jar

ENV PORT=10000
EXPOSE 10000

# Bind to 0.0.0.0 and port 10000/PORT so Render port scanner detects it
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-10000} -Dserver.address=0.0.0.0 -jar app.jar"]
