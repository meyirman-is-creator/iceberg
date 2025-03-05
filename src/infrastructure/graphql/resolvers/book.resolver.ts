import { container } from "../../di/container";
import { IBookService } from "../../../domain/book/book.service";

export const bookResolver = {
  async createBook({ title, description, authorId }: any) {
    const bookService = container.resolve<IBookService>("BookService");
    return bookService.createBook(title, description, authorId);
  },

  async getBooksList() {
    const bookService = container.resolve<IBookService>("BookService");
    return bookService.getBooksList();
  },

  async getBookById({ id }: any) {
    const bookService = container.resolve<IBookService>("BookService");
    return bookService.getBookById(id);
  },

  async updateBook({ id, title, description, authorId }: any) {
    const bookService = container.resolve<IBookService>("BookService");
    return bookService.updateBook(id, { title, description, authorId });
  },
};
