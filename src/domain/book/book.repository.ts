import { BookEntity } from "./book.entity";

export interface IBookRepository {
  createBook(book: BookEntity): Promise<BookEntity>;
  findAll(): Promise<BookEntity[]>;
  findById(id: number): Promise<BookEntity | null>;
  updateBook(id: number, data: Partial<BookEntity>): Promise<BookEntity | null>;
}
