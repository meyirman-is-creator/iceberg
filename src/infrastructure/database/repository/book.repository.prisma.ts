import { IBookRepository } from "../../../domain/book/book.repository";
import { BookEntity } from "../../../domain/book/book.entity";
import { prisma } from "../prismaClient";
import { PrismaClient, Book } from '@prisma/client';
export class BookRepositoryPrisma implements IBookRepository {
  public async createBook(book: BookEntity): Promise<BookEntity> {
    const created = await prisma.book.create({
      data: {
        title: book.title,
        description: book.description ?? null,
        authorId: book.authorId,
      },
    });
    return new BookEntity(
      created.id,
      created.title,
      created.description,
      created.authorId
    );
  }

  public async findAll(): Promise<BookEntity[]> {
    const books = await prisma.book.findMany();
    return books.map(
      (b:Book) => new BookEntity(b.id, b.title, b.description, b.authorId)
    );
  }

  public async findById(id: number): Promise<BookEntity | null> {
    const found = await prisma.book.findUnique({ where: { id } });
    if (!found) return null;
    return new BookEntity(
      found.id,
      found.title,
      found.description,
      found.authorId
    );
  }

  public async updateBook(
    id: number,
    data: Partial<BookEntity>
  ): Promise<BookEntity | null> {
    const updated = await prisma.book.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        authorId: data.authorId,
      },
    });
    if (!updated) return null;
    return new BookEntity(
      updated.id,
      updated.title,
      updated.description,
      updated.authorId
    );
  }
}
