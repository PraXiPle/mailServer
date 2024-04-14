const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
};
const comparePassword = async (loginPassword, dbPassword) => {
    try {
        const flag = await bcrypt.compare(loginPassword, dbPassword);
        return flag;
    } catch (error) {
        console.error("Error during password comparison:", error);
        throw error; // Rethrow the error for higher-level handling
    }
};

module.exports = { hashPassword, comparePassword };