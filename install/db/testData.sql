insert into proj_subject (SUBJECT_NAME)
values ('Math'),('Russian'),('English'),('Literature'),('Chemistry'),('Physics');

insert into proj_variant(generator_code, count, subject_id)
VALUES ('hFDGdfu43nfds2345', 3, 1);

insert into proj_exercise(exercise_description, exercise_condition, exercise_generator_rules, generator_code, answer, exercise_addition_file_path)
VALUES
    ('Вычислите выражение','(2+3*(9-17)+24/8-(|(56*sqrt(3*(1+2)^(4-1)-72)*2):4|-1))+2', null, null, '-100', null),
    ('Вычислите выражение','2.3*3.1-10+14', null, null, '-100', null),
    ('Вычислите выражение','123-15^2+(3*33-70+2.15^2)-11', null, null, '-100', null),
    ('Вычислите выражение','|sqrt(121)+(sqrt(3^2+4^2)-3^5)|-10', null, null, '-100', null);

insert into proj_class(CLASS_NUMBER)
VALUES ('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8'),('9'),('10'),('11');

insert into proj_class_subject(CLASS_ID,SUBJECT_ID)
VALUES (6,1),(7,1),(7,2),(7,3),(7,4),(8,1),(8,5),(8,3),(8,4),(9,1),(9,6);

insert into proj_themes(NAME, DESCRIPTION, VIDEO_LINK, LITERATURE_LINK, USEFUL_LINK, SUMMARY_LINK, CLASS_NUMBER,SUBJECT_NAME)
VALUES ('Умножение и деление дробей','В этой теме описаны основные принципы деления и умножения дробей. Основные правила, а также их использование',
        'https://www.youtube.com/embed/aUJM2uj9ccU?si=EFkxOY8KSLCiH64d','https://resolventa.ru/dejstviya-s-drobyami','https://ru.onlinemschool.com/math/assistance/fraction/fraction_calc/',
        'https://infourok.ru/konspekt-uroka-po-matematike-na-temu-umnozhenie-drobej-5-klass-5811245.html','6','math'),
        ('Отрицательные числа','В этой теме рассказывается об отрицательных числах, их представлении и способах взаимодействия с ними',
         'https://www.youtube.com/embed/hW0vt5qHf4w?si=8FY3IBbwSndLrDO6','https://dzen.ru/a/Y8aA8JMvPjmx392y','https://ru.intemodino.com/math/arithmetic/multiplying-and-dividing-fractions.html',
         'http://fizmat.by/math/fraction/division','6','math');

insert into proj_themes(NAME, DESCRIPTION, VIDEO_LINK, LITERATURE_LINK, USEFUL_LINK, SUMMARY_LINK, CLASS_NUMBER,SUBJECT_NAME)
VALUES ('TEST1','В этой теме описаны основные принципы деления и умножения дробей. Основные правила, а также их использование',
        'https://www.youtube.com/embed/aUJM2uj9ccU?si=EFkxOY8KSLCiH64d','https://resolventa.ru/dejstviya-s-drobyami','https://ru.onlinemschool.com/math/assistance/fraction/fraction_calc/',
        'https://infourok.ru/konspekt-uroka-po-matematike-na-temu-umnozhenie-drobej-5-klass-5811245.html,https://up.bitrix.info/2023/module-4/team-6/finalproject/-/blob/materials_branch/install/components/proj/materials/templates/.default/template.php?ref_type=heads,https://www.youtube.com/watch?v=iMRdIhRJkFY','6','math');

insert into proj_themes(NAME, DESCRIPTION, VIDEO_LINK, LITERATURE_LINK, USEFUL_LINK, CLASS_NUMBER,SUBJECT_NAME)
VALUES ('TEST1','В этой теме описаны основные принципы деления и умножения дробей. Основные правила, а также их использование',
        'https://www.youtube.com/embed/aUJM2uj9ccU?si=EFkxOY8KSLCiH64d','https://resolventa.ru/dejstviya-s-drobyami','https://ru.onlinemschool.com/math/assistance/fraction/fraction_calc/'
        ,'6','math');