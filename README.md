# [Админ панель ](https://kitsunaana.store/catalog)
***
## Установка
Находясь в корневой папке проекта можно установить все зависимости одной командой
```shell
npm run install:all
```
Или по отдельности
```shell
cd server && npm install
```
```shell
cd client && npm install
```
Если нужен контейнер для поднятия БД postgres
```shell
cd docker-dev && docker-compose up -d
```
По умолчанию используются значения:
 * **User**: postgres
 * **Database**: postgres
 * **Password**: postgres
 * **Port**: 5432

Эти значения также указаны в `server/.env.example`. Скопируйте
содержимое файла и создайте новый `sever/.env`.
Измените настройки если вы указали в `docker-compose.yaml` другие
параметры
```shell
copy .\server\.env.example .\server\.env
```
Для клиента нужно указать по какому URL делать запросы, указывается 
этот параметр в `client/.env`. Укажите в созданный файл параметр
`API_URL` если хотите использовать отличый от `http://localhost:3333`

```shell
copy .\client\.env.example .\client\.env
```

## Запуск
Находясь в корневой папке проекта выполните команду
```shell
npm start
```
Или по отдельности
```shell
cd server && npm run start:dev
```
Если хотите использовать `vite`
```shell
cd client && npm run start:vite
```
Если хотите использовать `webpack`
```shell
cd client && npm run start
```

## Что реализовано
1. [Локализация, смена темы, настройки иконок](#a-namesection1a-локализация-смена-темы-настройки-иконок)
2. [Обзор диалогового окна](#a-namesection2a-обзор-диалогового-окна)
3. [Множественная загрузка изображений, галерея](#a-namesection3a-множественная-загрузка-изображений-галерея)
4. [Настройка позиции текста на фото](#a-namesection4a-настройка-позиции-текста-на-фото)
5. [Добавление характеристик](#a-namesection5a-добавление-характеристик)
6. [Добавление переводов с использованием Translate api](#a-namesection6a-добавление-переводов-с-использованием-translate-api)
7. [Добавление тегов](#a-namesection7a-добавление-тегов)
8. [Копирование/вставка данных](#a-namesection8a-копированиевставка-данных)
9. [Редактирование категории](#a-namesection9a-редактирование-категории)
10. [Изменение последовательности категорий](#a-namesection10a-изменение-последовательности-категорий)
11. [Поиск по категориям](#a-namesection11a-поиск-по-категориям)
12. [Локализация для динамически создаваемых записей](#a-namesection12a-локализация-для-динамически-создаваемых-записей)
13. [Сайдбар](#a-namesection13a-сайдбар)
14. [Контекстное меню](#a-namesection14a-контекстное-меню)

...

### <a name="section1"></a> Локализация, смена темы, настройки иконок
![example-1](https://i.postimg.cc/3JXHcJVY/1-ezgif-com-video-to-gif-converter.gif)

### <a name="section2"></a> Обзор диалогового окна
![example-2](https://i.postimg.cc/bYTF4DLy/2-ezgif-com-video-to-gif-converter.gif)

### <a name="section3"></a> Множественная загрузка изображений, галерея
![example-3](https://i.postimg.cc/zGLtLdNv/3-ezgif-com-video-to-gif-converter.gif)

### <a name="section4"></a> Настройка позиции текста на фото
![example-4](https://i.postimg.cc/sDg0zj0p/4-ezgif-com-video-to-gif-converter.gif)

### <a name="section5"></a> Добавление характеристик
![example-5](https://i.postimg.cc/J0P6XvtD/5-ezgif-com-video-to-gif-converter.gif)

### <a name="section6"></a> Добавление переводов с использованием Translate api
![example-6](https://i.postimg.cc/QxYYx2Rv/6-ezgif-com-video-to-gif-converter.gif)

### <a name="section7"></a> Добавление тегов
![example-7](https://i.postimg.cc/y8wf0F6P/7-ezgif-com-video-to-gif-converter.gif)


### <a name="section8"></a> Копирование/вставка данных
![example-8](https://i.postimg.cc/bJR3XWxC/8-ezgif-com-video-to-gif-converter.gif)

### <a name="section9"></a> Редактирование категории
![example-9](https://i.postimg.cc/GthzbKzc/9-ezgif-com-video-to-gif-converter.gif)

### <a name="section10"></a> Изменение последовательности категорий
![example-10](https://i.postimg.cc/C10mQSqn/10-ezgif-com-video-to-gif-converter.gif)

### <a name="section11"></a> Поиск по категориям
![example-11](https://i.postimg.cc/1zwvBffZ/11-ezgif-com-video-to-gif-converter.gif)

### <a name="section12"></a> Локализация для динамически создаваемых записей
![example-12](https://i.postimg.cc/J40KgTGx/12-ezgif-com-video-to-gif-converter.gif)

### <a name="section13"></a> Сайдбар
![example-13](https://i.postimg.cc/4yLPycFp/13-ezgif-com-video-to-gif-converter.gif)

### <a name="section14"></a> Контекстное меню
![example-14](https://i.postimg.cc/CMmmcyLd/14-ezgif-com-video-to-gif-converter.gif)

