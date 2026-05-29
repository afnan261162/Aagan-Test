/**
 * Generate a bcrypt password hash to add to lib/admin-users.json
 *
 * Usage:
 *   node scripts/hash-password.mjs YourNewPassword
 *
 * Then copy the output hash into lib/admin-users.json
 */
import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 10);
console.log("\nHashed password:");
console.log(hash);
console.log("\nPaste this value into lib/admin-users.json under \"password\".");
