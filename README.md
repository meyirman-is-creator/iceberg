# ICEBERG Backend (Node + TypeScript + Prisma)

Пример многослойной (**луковой**) архитектуры на TypeScript с использованием:
- **Express** в качестве HTTP‐сервера  
- **GraphQL** (пакеты `graphql` и `express-graphql`)  
- **Prisma** (PostgreSQL) для доступа к БД  
- **Yarn** для управления зависимостями  

> **Примечание**: В реальном проекте будет больше валидации, логирования, тестов и т. д. Здесь мы демонстрируем основную идею: **разделение на слои** (Domain, Application, Infrastructure) и зависимость от абстракций (интерфейсов), а не от конкретных реализаций.

---

## Содержание

1. [Структура проекта](#структура-проекта)  
2. [Установка и запуск (локально)](#установка-и-запуск-локально)  
4. [Скрипты (package.json)](#скрипты-packagejson)  
5. [Описание слоёв](#описание-слоёв)  
7. [Контакты](#контакты)

---

## Структура проекта

Упрощённая схема (вариант по слоям):

```
my-backend/
  ├─ src/
  │   ├─ domain/                 # Сущности (entity) + Интерфейсы репозиториев/сервисов
  │   │   ├─ user/
  │   │   │   ├─ user.entity.ts
  │   │   │   ├─ user.repository.ts
  │   │   │   └─ user.service.ts
  │   │   └─ book/
  │   │       ├─ book.entity.ts
  │   │       ├─ book.repository.ts
  │   │       └─ book.service.ts
  │   │
  │   ├─ application/            # Бизнес-логика
  │   │   ├─ user/
  │   │   │   └─ user.service.impl.ts
  │   │   └─ book/
  │   │       └─ book.service.impl.ts
  │   │
  │   ├─ infrastructure/         # «Внешняя оболочка»: БД, Kafka, DI, HTTP, ...
  │   │   ├─ database/
  │   │   │   ├─ prismaClient.ts
  │   │   │   └─ repository/
  │   │   │       ├─ user.repository.prisma.ts
  │   │   │       └─ book.repository.prisma.ts
  │   │   ├─ graphql/
  │   │   │   ├─ schema.ts
  │   │   │   └─ resolvers/
  │   │   │       ├─ user.resolver.ts
  │   │   │       └─ book.resolver.ts
  │   │   ├─ http/
  │   │   │   ├─ server.ts
  │   │   │   └─ authMiddleware.ts (пример)
  │   │   └─ di/
  │   │       ├─ container.ts
  │   │       └─ index.ts (регистрация реализаций)
  │   └─ index.ts                # Точка входа (startServer, runConsumer, etc.)
  │
  ├─ prisma/
  │   └─ schema.prisma           # Prisma-схема (модели User, Book)
  │
  ├─ docker-compose.yml
  ├─ Dockerfile
  ├─ package.json
  ├─ tsconfig.json
  └─ .dockerignore
```

---

## Установка и запуск (локально)

1. **Установите зависимости**:
   ```bash
   yarn install
   ```
2. **Настройте .env** для Prisma:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb"
   ```
   (Убедитесь, что локальный PostgreSQL поднят.)

3. **Примените схему в БД**:
   ```bash
   yarn db:generate    # prisma generate
   yarn db:migration   # create migration (dev)
   yarn db:deploy      # prisma migrate deploy
   ```
   Или по необходимости `yarn prisma db push`.

4. **Запуск в dev-режиме**:
   ```bash
   yarn dev
   ```
   Это запускает `ts-node-dev` на `src/index.ts` (live reload).  
   Сервер доступен на `http://localhost:3000/graphql`.

5. **Сборка и запуск**:
   ```bash
   yarn build   # tsc -> dist
   yarn start   # node dist/index.js
   ```
   Сервер будет работать на `http://localhost:3000/graphql`.

---

## Скрипты (package.json)

- **`yarn dev`** — запуск в dev-режиме (ts-node-dev).  
- **`yarn build`** — компиляция TypeScript в `dist/`.  
- **`yarn start`** — запуск Node на скомпилированном `dist/index.js`.  
- **`yarn lint:fix`** и **`yarn prettier:fix`** — автоисправление ESLint/Prettier.  
- **`yarn db:migration`**, **`yarn db:deploy`** — миграции Prisma.  
- **`yarn prisma generate`** — генерация Prisma Client.  

---

## Описание слоёв

1. **Domain** (ядро): содержит _сущности_ (Entity) и _интерфейсы_ (репозиториев, сервисов). Не зависит ни от Express, ни от Prisma.  
2. **Application**: бизнес-логика, реализует интерфейсы Domain (например, `UserServiceImpl`), работая с абстрактными `IUserRepository`, `IBookRepository`.  
3. **Infrastructure**: все «детали» (Prisma, Express, GraphQL и т. д.). Здесь мы пишем реализации репозиториев (например, `UserRepositoryPrisma`), регистрируем зависимости в DI-контейнере, настраиваем HTTP-сервер и пр.  
4. **index.ts**: точка входа, запускающая сервер.

---

## Контакты

- **Автор**: [meirman_is_creator](mailto:sarsenbaymeyirman@gmail.com)  
- **Репозиторий**: <https://github.com/meyirman-is-creator/iceberg>

Приятной разработки!

