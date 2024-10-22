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
1. [Локализация, смена темы, настройки иконок](#section1)
2. [Обзор диалогового окна](#section2)
3. [Множественная загрузка изображений, галерея](#section3)
4. [Настройка позиции текста на фото](#section4)
5. [Добавление характеристик](#section5)
6. [Добавление переводов с использованием Translate api](#section6)
7. [Добавление тегов](#section7)
8. [Копирование/вставка данных](#section8)
9. [Редактирование категории](#section9)
10. [Изменение последовательности категорий](#section10)
11. [Поиск по категориям](#section11)
12. [Локализация для динамически создаваемых записей](#section12)
13. [Сайдбар](#section13)
14. [Контекстное меню](#section14)

### <a name="section1"></a> Локализация, смена темы, настройки иконок
[Ссылка на видео](https://play.boomstream.com/dIxDJyOd?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/mHtIYwSu-a1.jpg" />

### <a name="section2"></a> Обзор диалогового окна
[Ссылка на видео](https://play.boomstream.com/NeRLoztY?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/szPQghC5-a2.jpg" />


### <a name="section3"></a> Множественная загрузка изображений, галерея
[Ссылка на видео](https://play.boomstream.com/3ccQiLQ7?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/SW4f6Iev-a7.jpg" />

### <a name="section4"></a> Настройка позиции текста на фото
[Ссылка на видео](https://play.boomstream.com/S6ux3KL4?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/k9CdpBqA-a4.jpg" />

### <a name="section5"></a> Добавление характеристик
[Ссылка на видео](https://play.boomstream.com/fCoHGaxk?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/RigylViP-a2.jpg" />

### <a name="section6"></a> Добавление переводов с использованием Translate api
[Ссылка на видео](https://play.boomstream.com/2Kde6u6l?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/iyGSgvZ1-a13.jpg" />

### <a name="section7"></a> Добавление тегов
[Ссылка на видео](https://play.boomstream.com/vuS3DLw6?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/WUAYciXj-a12.jpg" />

### <a name="section8"></a> Копирование/вставка данных
[Ссылка на видео](https://play.boomstream.com/AAOnApoW?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/nEstCxxx-a7.jpg" />

### <a name="section9"></a> Редактирование категории
[Ссылка на видео](https://play.boomstream.com/LKIgRQ1F?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/QsJR24lI-a2.jpg" />

### <a name="section10"></a> Изменение последовательности категорий
[Ссылка на видео](https://play.boomstream.com/RC5vL9Fi?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/Us3Dd7RU-a1.jpg" />

### <a name="section11"></a> Поиск по категориям
[Ссылка на видео](https://play.boomstream.com/ervRuD70?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/sB1OIdMr-a1.jpg" />

### <a name="section12"></a> Локализация для динамически создаваемых записей
[Ссылка на видео](https://play.boomstream.com/VBSy8jH0?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/H6bb5v6w-a1.jpg" />

### <a name="section13"></a> Сайдбар
[Ссылка на видео](https://play.boomstream.com/214Rc0Tk?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/eswEBHBI-a1.jpg" />

### <a name="section14"></a> Контекстное меню
[Ссылка на видео](https://play.boomstream.com/qNFmSVCk?autostart=1)<br />
<img style="width: 700px;" src="https://cdnv.boomstream.com/balancer/mK8ojI2L-a2.jpg" />
