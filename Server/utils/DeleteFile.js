const fs = require("fs").promises;

/**
 * Delete a file asynchronously
 * @param {string} filePath - The full path to the file to delete
 */
const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log("File deleted:", filePath);
  } catch (err) {
    console.error("Error deleting file:", err.message);
  }
};

module.exports = deleteFile;
