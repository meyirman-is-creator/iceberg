import { container } from "./container";

import { BookRepositoryPrisma } from "../database/repository/book.repository.prisma";
import { BookServiceImpl } from "../../application/book/book.service.impl";

const bookRepository = new BookRepositoryPrisma();
const bookService = new BookServiceImpl(bookRepository);
container.register("BookService", bookService);
