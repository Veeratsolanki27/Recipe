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

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar app.jar"]

