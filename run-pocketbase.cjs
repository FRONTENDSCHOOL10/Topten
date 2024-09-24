const { execSync } = require('child_process');
require('dotenv').config();

const cmd =
  process.platform === 'win32'
    ? process.env.POCKETBASE_COMMAND_WINDOWS
    : process.env.POCKETBASE_COMMAND_MAC;

if (!cmd) {
  throw new Error(
    'The command to execute is not defined. Please check your .env file.'
  );
}

execSync(cmd, { stdio: 'inherit' });
