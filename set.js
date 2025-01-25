const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0huYi80Zk9HeEx0cktjWUdaRkFGc2p3MWgrckMwUEN5TGRjMGJaV2gxdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWWI0SGdDaFJjMWYzL0ZVdkFpRUl4SHlLdmtlVWlDRWNqWFl4RTlxeG8yMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTUEFlQjJESFBDUUdtbUIySVdXTFZ2amg4Mm9YSE85cWxxSEFFdHdFT0VNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0TnBtNGFyK1YwMS9raWRtdGlqRGRGNytXa1dITE1kYzRHVUVFM3k2bzJFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklDc0ZPblZzVVUwMThlTVkvZWJ3NDVsQ3Q3cE53RW1sMWQ3Y2Z0NmtpVjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilk1VG5maUVTSU9IeXBPREpRNFBQL0pSSWVLL3pJQ0poZVROdjRMck5aaW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUd0b0RMUk9BM3RNMWdLeVBwY1dMQWV2ZE1ZSTZ3VVp2SlBJbjI1WDVHRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM01WMHNNUytXZWt6a1F1eEEwNklqVWxmd294S0JZNE1SSWMxQktTV2JtYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktyUG5zM2dUT2ZQSmc3Qnlsa3BzOFJMMjVFcldCVFZaRmFBZjRqSXl6UlVmbk5yZXFYQ3JjbCtsWXY5elowUkFTeU13NkVGb0UwODRrMUIyMEVCeUNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzMsImFkdlNlY3JldEtleSI6IkpETHFkR2RpcitIUWIycmxvcS9ZVi9xT0hzcS9CUDJqa1FYeHlwUmt6L1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ink1ZHpBN1lVUlAtdnZSdzVoV0pJcXciLCJwaG9uZUlkIjoiZDJmMDNjNzktZDJlYy00MTJiLTk2MWEtOTA1ZWJkZWE4ZTk5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik8yTmh3dUxIbFgzZGN5aFRacC9JTks0ZXhndz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzS09oTFdrK2dyMzlhVmhXOUpuSm1wZFIrSU09In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUzNMWTdGTkYiLCJtZSI6eyJpZCI6IjIzNDcwNjk0ODI1NTA6NTdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1B1bG1ia0VFTHpHMHJ3R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ii9JWUZnM2pSYTBKMWh3cFovdUd6bi9qVUtKb0pUaUh1S0NjYzAxcUFEaGM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlA0akxKOHFUYmVpY2RMa01XRGJvK25JMzIzTkhCQkovMTd1RXV0bEMxSnhZd0VTZWl2RVRDOWVCbnVyVEE1aFNrZnYvclRielFtU1hWM25sd0p0akFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJINzF5NFhxQWZqWEhtTE52UERZS1l3TUZoVi9PR09KZDdVc2s0REFOUk44WmtXVDlVVzQ5Q1YyaHVKUVNlL0d6N2szdjhWNElEdTdVMTgrRy83dWpDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNjk0ODI1NTA6NTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZnlHQllONDBXdENkWWNLV2Y3aHM1LzQxQ2lhQ1U0aDdpZ25ITk5hZ0E0WCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNzc5NDM3OH0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2347069482550",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
