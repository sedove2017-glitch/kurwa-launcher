# Сайт Kurwa Launcher

Статический лендинг без сборщика: чистые HTML, CSS и JS. Открывается двойным
кликом по `index.html`, работает на любом бесплатном статическом хостинге.

## Что внутри

```
site/
  index.html        — лендинг
  styles.css        — оформление
  app.js            — меню, снег, галерея фонов, демо модов
  config.js         — ссылки на сборки (единственное место для правок при публикации)
  assets/
    video/          — видео для hero и превью фонов
    posters/        — постеры фонов
    screens/        — скриншоты лаунчера
    favicon.svg
  downloads/        — локальные сборки .exe (в git не попадают)
```

## Локальный просмотр

Просто открой `site/index.html` в браузере. Либо из корня проекта:

```bash
npm run site
```

## Бесплатная публикация

Сайт статический, сервер и база не нужны — значит, хостинг может быть бесплатным.
Сборки `.exe` весят 274 МБ, поэтому их лучше не класть в репозиторий сайта, а
выложить в **GitHub Releases** (до 2 ГБ на файл, бесплатно).

### Вариант 1. GitHub Pages (рекомендую)

Всё делается через веб-интерфейс, git на компьютере не обязателен.

1. Создай публичный репозиторий, например `kurwa-site`.
2. Загрузи туда содержимое папки `site/` (без `downloads/*.exe`).
3. `Settings → Pages → Source: Deploy from a branch → main / (root) → Save`.
4. Через 1–2 минуты сайт будет доступен:
   `https://<username>.github.io/kurwa-site/`.
5. Создай релиз: `Releases → Draft a new release`, тег `v0.1.0`, прикрепи
   `KurwaLauncher-setup-0.1.0.exe` и `KurwaLauncher-0.1.0-portable.exe`, опубликуй.
6. Скопируй прямые ссылки на ассеты (правый клик по файлу в релизе →
   «Копировать ссылку») и вставь их в `site/config.js`:

```js
window.KURWA_CONFIG = {
  setupUrl: 'https://github.com/<username>/kurwa-site/releases/download/v0.1.0/KurwaLauncher-setup-0.1.0.exe',
  portableUrl: 'https://github.com/<username>/kurwa-site/releases/download/v0.1.0/KurwaLauncher-0.1.0-portable.exe',
  version: '0.1.0'
}
```

7. Загрузи обновлённый `config.js` в репозиторий — кнопки на сайте начнут
   скачивать сборки из релиза. `index.html` менять не нужно.

### Вариант 2. Cloudflare Pages (drag & drop)

1. Зарегистрируйся на `pages.cloudflare.com`.
2. `Create application → Pages → Upload assets`.
3. Перетащи папку `site/` (без `downloads`, лимит 25 МБ на файл).
4. Получи адрес вида `https://kurwa-launcher.pages.dev`.
5. Сборки — так же в GitHub Releases, ссылки в `config.js`.

Плюсы: быстрый CDN, бесплатный HTTPS и неограниченный трафик на статике.

### Вариант 3. Netlify Drop

`app.netlify.com/drop` — перетащи папку и получи `*.netlify.app`. Хорошо для
быстрой проверки, для постоянного сайта удобнее GitHub Pages или Cloudflare.

### Друзьям без хостинга

Можно просто заархивировать папку `site/` целиком (с `downloads/`) и отправить
в Telegram. Сайт откроется двойным кликом по `index.html` — интернет не нужен.

## Домен

- Бесплатно: поддомен хостинга (`*.github.io`, `*.pages.dev`, `*.netlify.app`).
- Бесплатный «настоящий» домен: `eu.org` (ручная модерация, ждать долго) или
  `is-a.dev` (через pull request на GitHub).
- Свой домен: от ~200–300 ₽/год за `.ru`/`.xyz`; подключается к GitHub Pages или
  Cloudflare Pages в настройках DNS, HTTPS выдаётся автоматически.

## Обновление версии лаунчера

1. Собрать новые `.exe` (`npm run build:win`).
2. Загрузить их в новый GitHub Release с тегом версии.
3. Обновить `setupUrl` / `portableUrl` и `version` в `site/config.js`.
4. При желании обновить тексты версии в `index.html` (они статические).
