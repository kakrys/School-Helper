insert into proj_subject (SUBJECT_NAME)
values ('Math'),('Russian'),('English'),('Literature'),('Chemistry'),('Physics');

insert into proj_variant(generator_code, count, subject_id)
VALUES ('hFDGdfu43nfds2345', 3, 1);

insert into proj_exercise(EXERCISE_CONDITION, ANSWER)
VALUES ('Выберите верный ответ из предложенных: а, б , с', 'a'),
       ('x+10=20', '10');

insert into proj_class(CLASS_NUMBER)
VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8'),('9'),('10'),('11');

insert into proj_class_subject(CLASS_ID,SUBJECT_ID)
VALUES (6,1),(7,1),(7,2),(7,3),(7,4),(8,1),(8,5),(8,3),(8,4),(9,1),(9,6);

insert into proj_themes(NAME, DESCRIPTION, VIDEO_LINK, LITERATURE_LINK, USEFUL_LINK, SUMMARY_LINK, CLASS_NUMBER,SUBJECT_NAME)
VALUES ('Умножение и деление дробей','В этой теме описаны основные принципы деления и умножения дробей. Основные правила, а также их использование',
        'https://www.youtube.com/watch?v=UtJEXMvrfRs','https://resolventa.ru/dejstviya-s-drobyami','https://ru.onlinemschool.com/math/assistance/fraction/fraction_calc/',
        'https://infourok.ru/konspekt-uroka-po-matematike-na-temu-umnozhenie-drobej-5-klass-5811245.html','6','math'),
        ('Отрицательные числа','В этой теме рассказывается об отрицательных числах, их представлении и способах взаимодействия с ними',
         'https://www.youtube.com/watch?v=hW0vt5qHf4w','https://dzen.ru/a/Y8aA8JMvPjmx392y','https://ru.intemodino.com/math/arithmetic/multiplying-and-dividing-fractions.html',
         'http://fizmat.by/math/fraction/division','6','math');
