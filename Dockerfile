#syntax=docker/dockerfile:1.4

# Base image
FROM node:20-alpine AS base
ARG DOTENV_PRIVATE_KEY_CI=privatekey
ENV DOTENV_PRIVATE_KEY_CI=${DOTENV_PRIVATE_KEY_CI}

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# Install dependencies and enable pnpm
RUN apk add --no-cache libc6-compat && \
    npm install -g corepack@latest && \
    corepack enable && \
    corepack prepare pnpm@latest --activate

WORKDIR /app
COPY . .

# Install production dependencies
FROM base AS prod-deps
ENV CI=true NODE_BUILD=true
RUN pnpm install --prod --frozen-lockfile --no-optional

# Build the application
FROM base AS build
ENV CI=true NODE_BUILD=true
RUN pnpm install --frozen-lockfile --no-optional && \
    pnpm dlx @dotenvx/dotenvx run -- pnpm run build

# Final production image
FROM node:20-alpine
# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 sveltekit
USER sveltekit

WORKDIR /app
# Copy necessary files from previous stages
COPY --from=prod-deps --chown=sveltekit:nodejs /app/node_modules /app/node_modules
COPY --from=build --chown=sveltekit:nodejs /app/build /app/build
COPY --from=build --chown=sveltekit:nodejs /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build --chown=sveltekit:nodejs /app/package.json ./package.json

# Set environment variables
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    ADDRESS_HEADER=X-Forwarded-For \
    XFF_DEPTH=1
ARG PORT=8080
ENV PORT=${PORT}

EXPOSE $PORT

# Start the application
CMD ["pnpm", "dlx", "@dotenvx/dotenvx", "run", "--", "node", "build"]
