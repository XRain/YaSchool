YaSchool
========

Тестовое задание для Школы Разработчиков Интерфейсов от Яndex

В проекте частично соблюдена методология БЭМ, в частности:
    -Правила именования
    -Файловая структура
bem-tools не используется, xjst и bemjson я заменил более привычной мне связкой nodejs+jade

при запуске make.sh рендерер проверяетналичие файлов всех блоков (и их элементов), перечисленных в pages.js и создает отсутствующие.
Затем происходит сборка index.html из шаблонов, и подключение браузерных скриптов.