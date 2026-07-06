# The Only Task Tracker

Трекер задач с доступом по персональным ссылкам и уведомлениями в Telegram.

## БД: Turso (не Supabase)

На Vercel файловая SQLite не работает — используем **[Turso](https://turso.tech)** (libSQL, SQLite-совместимая облачная БД):

- бесплатный tier хватит на двоих
- нативно работает в serverless
- локально — `file:data/tracker.db` без Turso-аккаунта

### Настройка Turso для Vercel

```bash
# установить CLI
brew install tursodatabase/tap/turso

turso auth login
turso db create the-only-task-tracker
turso db show the-only-task-tracker --url
turso db tokens create the-only-task-tracker
```

Добавить в Vercel → Settings → Environment Variables:
- `TURSO_DATABASE_URL` — libsql://...
- `TURSO_AUTH_TOKEN` — токен из CLI

## Быстрый старт (локально)

```bash
npm install
npm run generate-tokens   # токены доступа → в .env.local
cp .env.example .env.local
# заполнить TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID_OWNER
npm run dev
```

## Доступ

| Роль | Переменная | URL |
|------|-----------|-----|
| Исполнитель | `ACCESS_TOKEN_OWNER` | `/access/<token>` |
| Руководитель | `ACCESS_TOKEN_BOSS` | `/access/<token>` |

## Поля задачи

- **Сайт:** store.realreality.com, fofgod.com, sacraments.fofgod.com, spiritualblueprint.com
- **Категория:** баг, фича, контент, дизайн, деплой, другое
- **Срочность:** срочно / не срочно
- **Важность:** 🟢 низкая / 🟡 средняя / 🔴 высокая
- **Статус:** бэклог → в работе → на проверке → готово

## Telegram

Уведомления только исполнителю (`TELEGRAM_CHAT_ID_OWNER`). При создании, обновлении и удалении задачи.

## Деплой на Vercel

1. Push в [GitHub](https://github.com/DadMych/the_only_task_tracker)
2. Import project в Vercel
3. Добавить env variables (см. `.env.example`)
4. Deploy

## Переменные окружения

См. `.env.example` — секреты только в Vercel / локальном `.env.local`, **не в git**.
