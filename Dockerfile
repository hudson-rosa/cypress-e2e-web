# Use the cypress/included base image with Node.js and Cypress pre-installed
FROM cypress/included:13.8.1

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package.json .
COPY package-lock.json .
COPY cypress.config.js .
COPY cypress.config.ui.js .
COPY cypress.config.api.js .

# Install npm dependencies
RUN npm install
RUN npm install cypress-multi-reporters mocha-junit-reporter --save-dev --force

# Copy the rest of the project files to the container
COPY . .

# Define environment variables if necessary (optional)
ENV TEST_ENV="dev"
ENV TEST_TYPE="ui"
ENV TZ="UTC"