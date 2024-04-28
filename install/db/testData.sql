insert into proj_subject (SUBJECT_NAME)
values ('Math'),('Russian'),('English');


insert into proj_exercise(exercise_description, exercise_condition, exercise_generator_rules, generator_code, answer, exercise_addition_file_path,THEME_ID)
VALUES
    ('Вычислите выражение','(2+3*(9-17)+24/8-(|(56*sqrt(3*(1+2)^(4-1)-72)*2):4|-1))+2', null, null, '-100', null,1),
    ('Вычислите выражение','2.3*3.1-10+14', null, null, '-100', null,1),
    ('Вычислите выражение','123-15^2+(3*33-70+2.15^2)-11', null, null, '-100', null,2),
    ('Вычислите выражение','|sqrt(121)+(sqrt(3^2+4^2)-3^5)|-10', null, null, '-100', null,2),
    ('В каком слове верно выделена буква,обозначающая ударный звук','а)красИвее, б)укрАинский, в)газопрОвод, г)дОбыча',null,null,'а',null,3),
    ('Какое слово пишется раздельно?', 'а)сколько(то), б)сколько(нибудь), в)(кое)о(чем), г)сколько(либо)',null,null,'в',null,3),
    ('Найдите причастие, в суффиксе которого пропущена буква Я?', '1)беле...щий парус, 2)вер...щий в справедливость, 3)дремл...щий щенок, 4)бре...щийся человек',null,null,'2',null,3),
    ('Укажите слово, в котором на месте пропуска пишется Ь.','1)надеть плащ..., 2)суп горяч..., 3)невтерпёж... сидеть, 4)увлеч...ся спортом',null,null,'4',null,4),
    ('Какое слово пишется через дефис?','1) (по) немногу, 2) (по) прежнему, 3) (в) двоем, 4) (по) просту',null,null,'2',null,4);



insert into proj_class(CLASS_NUMBER)
VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8'),('9'),('10'),('11');

insert into proj_class_subject(CLASS_ID,SUBJECT_ID)
VALUES (6,1),(7,2),(7,3);

insert into proj_themes(NAME, DESCRIPTION, VIDEO_LINK, LITERATURE_LINK, USEFUL_LINK, SUMMARY_LINK, CLASS_NUMBER,SUBJECT_NAME)
VALUES ('Умножение и деление дробей','В этой теме описаны основные принципы деления и умножения дробей. Основные правила, а также их использование',
        'https://www.youtube.com/embed/aUJM2uj9ccU?si=EFkxOY8KSLCiH64d','https://resolventa.ru/dejstviya-s-drobyami','https://ru.onlinemschool.com/math/assistance/fraction/fraction_calc/',
        'https://infourok.ru/konspekt-uroka-po-matematike-na-temu-umnozhenie-drobej-5-klass-5811245.html','6','math'),
        ('Отрицательные числа','В этой теме рассказывается об отрицательных числах, их представлении и способах взаимодействия с ними',
         'https://www.youtube.com/embed/hW0vt5qHf4w?si=8FY3IBbwSndLrDO6','https://dzen.ru/a/Y8aA8JMvPjmx392y','https://ru.intemodino.com/math/arithmetic/multiplying-and-dividing-fractions.html',
         'http://fizmat.by/math/fraction/division','6','math'),
        ('Н и НН в причастиях','В данной теме описано правописание Н и НН в причастиях и отглагольных прилагательных','https://www.youtube.com/embed/vGw5oXJOHmk?si=GgBPl1afWGK1H93u',
         'https://skysmart.ru/articles/russian/n-i-nn-v-raznyh-chastyah-rechi','https://russkiiyazyk.ru/chasti-rechi/glagol/prichastie/n-i-nn-v-prichastiyah.html','https://nsportal.ru/shkola/russkiy-yazyk/library/2017/11/23/urok-n-nn-v-prichastiyah',
         '7','russian'),('Виды деепричастий','В данной теме представлены основные виды деепричастий','https://www.youtube.com/embed/5yWVkAJ-dss?si=CCan1WbVCA1p7GT6','https://interneturok.ru/lesson/russian/7-klass/bglava-3-deeprichastieb/deeprichastiya-sovershennogo-i-nesovershennogo-vida-morfologicheskiy-razbor-deeprichastiy',
         'https://izamorfix.ru/rus/morfologiya/vidy_deeprich.html','https://infourok.ru/konspekt-uroka-po-temevidi-deeprichastiy-3730260.html','7','russian'),
	     ('Настоящие времена','В данной теме представлены Основные сведения о present simple (настоящем времени)— как использовать правильно,Present Simple Passive,Present progressive passive','https://www.youtube.com/embed/hP8YKUOSP74?si=yaGnyPiSOgZgZhju',
	      'https://englex.ru/ways-to-express-the-present-in-english/',
	      'https://infourok.ru/tablica-nastoyashie-vremena-v-anglijskom-yazyke-6214905.html','https://infourok.ru/konspekt-uroka-po-angliyskomu-yaziku-na-temu-nastoyaschie-vremena-klass-2449635.html',
	      '7','english');


UPDATE b_user SET WORK_POSITION = 'admin' where ID = 1;

insert into proj_bug_categories(NAME)
VALUES ('Ошибки в упражнениях'),('Проблемы с личным кабинетом'),('Проблемы с отображением'),('Другие ошибки');