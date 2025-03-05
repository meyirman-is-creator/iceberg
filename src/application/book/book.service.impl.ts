// src/application/book/book.service.impl.ts

import { IBookService } from "../../domain/book/book.service";
import { IBookRepository } from "../../domain/book/book.repository";
import { BookEntity } from "../../domain/book/book.entity";

export class BookServiceImpl implements IBookService {
  constructor(private bookRepo: IBookRepository) {}

  public async createBook(
    title: string,
    description: string | null,
    authorId: number
  ): Promise<BookEntity> {
    const book = new BookEntity(null, title, description, authorId);
    return this.bookRepo.createBook(book);
  }

  public async getBooksList(): Promise<BookEntity[]> {
    return this.bookRepo.findAll();
  }

  public async getBookById(id: number): Promise<BookEntity | null> {
    return this.bookRepo.findById(id);
  }

  public async updateBook(
    id: number,
    data: Partial<BookEntity>
  ): Promise<BookEntity | null> {
    return this.bookRepo.updateBook(id, data);
  }
}
