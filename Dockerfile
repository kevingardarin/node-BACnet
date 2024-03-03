FROM node:16-alpine

# Set working directory
WORKDIR /BACnet

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn --frozen-lockfile

# Add node-BACnet
Add . .

# Run compliance tests
CMD yarn compliance
