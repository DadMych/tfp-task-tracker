import { randomBytes } from "crypto";

const owner = randomBytes(24).toString("hex");
const boss = randomBytes(24).toString("hex");

console.log("\n🔑 Сгенерированы токены доступа:\n");
console.log(`ACCESS_TOKEN_OWNER=${owner}`);
console.log(`ACCESS_TOKEN_BOSS=${boss}`);
console.log("\n📎 Ссылки для доступа (после запуска dev-сервера):\n");
console.log(`  Вы:       http://localhost:3000/access/${owner}`);
console.log(`  Начальник: http://localhost:3000/access/${boss}`);
console.log("\nСкопируйте строки в .env.local\n");
