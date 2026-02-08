FROM mcr.microsoft.com/devcontainers/java:21

# Install Node.js 20.x for frontend development
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Maven (if not already included)
RUN apt-get update && apt-get install -y maven \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set up workspace
WORKDIR /workspace

# Create non-root user (vscode user is already created by base image)
USER vscode
