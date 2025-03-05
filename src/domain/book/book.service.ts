import { BookEntity } from "./book.entity";

export interface IBookService {
  createBook(
    title: string,
    description: string | null,
    authorId: number
  ): Promise<BookEntity>;
  getBooksList(): Promise<BookEntity[]>;
  getBookById(id: number): Promise<BookEntity | null>;
  updateBook(id: number, data: Partial<BookEntity>): Promise<BookEntity | null>;
}
