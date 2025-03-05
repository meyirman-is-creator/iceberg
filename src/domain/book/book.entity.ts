export class BookEntity {
  constructor(
    public readonly id: number | null,
    public readonly title: string,
    public readonly description: string | null,
    public readonly authorId: number
  ) {}
}
