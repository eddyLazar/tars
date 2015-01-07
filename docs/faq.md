FAQ
===

<ol>
    <li>
        <strong>У меня OS X (Ubuntu, Linux Mint ...) В готовую сборку попадают не все файлы проекта.</strong><br/>
        Нужно увеличить <a href="https://github.com/artem-malko/tars/blob/master/docs/options.md#ulimit">ulimit</a> в `tars-config.js`
    </li>
    <li>
        <strong>Я ничего не понимаю в gulp, могу ли я комфортно пользоваться данным сборщиком?</strong><br/>
        Знания работы с gulp не обязательны. На данный момент сборщик покрывает большинство задач frontend'а. Все, что нужно знать, описано в документации.
    </li>
    <li>
        <strong>Почему именно gulp, а не grunt?</strong><br/>
        Отвечу цитатой с <a href="http://habrahabr.ru/post/208890/" target="_blank">habrahabr.ru</a>: 'Gulp.js это потоковый сборщик проектов на JS. Он использует Stream и действительно является очень быстрым. Для примера у меня есть проект где около тысячи stylus файлов, GruntJS нужно примерно 2.5 секунды на сборку и 2 секунды на обработку autoprefixer'ом. Gulp все это делает за 0.5 секунды выигрывая у GruntJS минимум в 4 раза.'
    </li>
    <li>
        <strong>Мне кажется, что используется слишком сложная файловая структура. Могу ли я ее модифицировать так, как нужно мне?</strong><br/>
        Если вы умеете работать с gulp, то после переименования/удаления/создания папок, необходимо править соответсвующие таски.<br/>
        Также можно спокойно расширять файловую структуру для js с использованием соответствующей <a href="https://github.com/artem-malko/tars/blob/master/docs/options.md#jspathstoconcatbeforemodulesjs-%D0%B8-jspathstoconcataftermodulesjs">опции</a> в конфиге сборщика.<br/>
        Для основной папки со статикой и папки с кратинками можно задать имя в соответсвующих <a href="https://github.com/artem-malko/tars/blob/master/docs/options.md#fs">опциях</a> в конфиге сборщика.
    </li>
</ol>