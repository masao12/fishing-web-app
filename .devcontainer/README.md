# DevContainer Setup

## Prerequisites
- Windows with WSL2 enabled
- VS Code installed
- Docker Desktop for Windows installed and running
- "Dev Containers" extension installed in VS Code

## Getting Started

1. Open this repository in VS Code
2. VS Code will detect the `.devcontainer` folder and prompt you to "Reopen in Container"
3. Click "Reopen in Container" (or use Command Palette: `Dev Containers: Reopen in Container`)
4. Wait for the container to build and start (first time may take a few minutes)

## What's Included

### Development Environment
- Java 21 (OpenJDK)
- Maven (for Spring Boot backend)
- Node.js 20 + npm (for React/Vite frontend)
- PostgreSQL 16 client tools

### Database
- PostgreSQL 16 running in a separate container
- Database: `fishing_db`
- User: `fishing_user`
- Password: `fishing_pass`
- Port: `5432` (accessible on localhost)

### VS Code Extensions (Auto-installed)
- Java Extension Pack
- Spring Boot Extension Pack
- ESLint
- Prettier
- Tailwind CSS IntelliSense

### Port Forwarding
- `8080`: Spring Boot backend
- `5173`: Vite development server
- `5432`: PostgreSQL database

## Verifying the Setup

Once the container is running, open a terminal in VS Code and verify:

```bash
# Check Java version
java -version

# Check Maven
mvn -version

# Check Node.js and npm
node -version
npm -version

# Check PostgreSQL connection
psql -h localhost -U fishing_user -d fishing_db
# Password: fishing_pass
```

## Next Steps

1. Create Spring Boot backend structure
2. Create React frontend structure
3. Set up database migrations
4. Implement JPA entities based on `/doc/db-design.md`
