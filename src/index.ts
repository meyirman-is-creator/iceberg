import "reflect-metadata"; // если используете библиотеки DI, где нужно
import { startServer } from "./infrastructure/http/server";
import "./infrastructure/di/container";
import './infrastructure/di/UserService';
import './infrastructure/di/BookService';

(async () => {
  try {
    await startServer();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
