# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

# Copy dependency manifests first for better layer caching
COPY pom.xml .
COPY .mvn/ .mvn/
# Download dependencies (cached unless pom.xml changes)
RUN apk add --no-cache maven && \
    mvn dependency:go-offline -B

# Copy source and build, skipping tests for a faster production image
COPY src/ src/
RUN mvn package -DskipTests -B

# ── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the fat JAR from the build stage
COPY --from=builder /app/target/smart-student-dashboard-1.0.0.jar app.jar

USER appuser

# Render injects PORT env var; fall back to 8080 locally
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "-Dserver.port=${PORT:-8080}", "app.jar"]
