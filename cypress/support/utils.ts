const isMobile = () => {
  return Cypress.config("viewportWidth") < Cypress.env("mobileViewportWidthBreakpoint");
};

const getOSName = () => {
  if (typeof navigator !== "undefined") {
    const userAgent = navigator.userAgent;

    switch (true) {
      case /Windows/.test(userAgent):
        return "Windows";
      case /Mac/.test(userAgent):
        return "MacOS";
      case /Linux/.test(userAgent):
        return "Linux";
      case /Android/.test(userAgent):
        return "Android";
      default:
        return "Unknown";
    }
  } else {
    return "Unknown";
  }
};

function writeToFile(pathToFile, dataToWrite) {
  return cy.writeFile(pathToFile.toString(), dataToWrite.toString());
}

async function readFile(pathToFile) {
  cy.readFile(pathToFile).then((fileContents) => {
    console.log(fileContents);
    return fileContents;
  });
}

async function fileExists(targetPath) {
  cy.exec(`test -e ${targetPath}`).then((result) => {
    const fileExists = result.code === 0;
    return fileExists;
  });
}

async function deleteFileOrDirectory(filePath) {
  cy.exec(`test -e ${filePath}`).then((result) => {
    const fileExists = result.code === 0;

    if (fileExists) {
      cy.exec(`rm ${filePath}`).then(() => {
        cy.log(`File ${filePath} has been deleted.`);
      });
    } else {
      cy.log(`File ${filePath} does not exist.`);
    }
  });
}

module.exports = { deleteFileOrDirectory, getOSName, isMobile, writeToFile, readFile, fileExists };
