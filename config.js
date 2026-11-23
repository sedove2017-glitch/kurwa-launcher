/*
 * Ссылки на сборки лаунчера.
 *
 * Пока файлы лежат рядом, в site/downloads, оставь относительные пути —
 * сайт работает и локально, и на любом хостинге, куда зальёшь папку целиком.
 *
 * Если сборки выложены в GitHub Releases (рекомендуется: файлы там до 2 ГБ),
 * подставь прямые ссылки на ассеты релиза. Пример:
 *
 *   setupUrl:    'https://github.com/username/kurwa-launcher/releases/download/v0.1.0/KurwaLauncher-setup-0.1.0.exe',
 *   portableUrl: 'https://github.com/username/kurwa-launcher/releases/download/v0.1.0/KurwaLauncher-0.1.0-portable.exe'
 *
 * Менять index.html при этом не нужно — ссылки подставит app.js.
 */
window.KURWA_CONFIG = {
  setupUrl: 'downloads/KurwaLauncher-setup-0.1.0.exe',
  portableUrl: 'downloads/KurwaLauncher-0.1.0-portable.exe',
  version: '0.1.0'
}
