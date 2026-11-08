# Stage 1: Build the JAR with Maven & OpenJDK 17
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies first for caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and package
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the Spring Boot application with a lightweight JRE
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=build /app/target/*.jar app.jar

# Expose Render default port (Render provides PORT environment variable)
ENV PORT=8080
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar app.jar"]

