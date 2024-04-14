insert into proj_subject (SUBJECT_NAME)
values ('Math'),('Russian'),('English'),('Literature'),('Chemistry'),('Physics');

insert into proj_variant(generator_code, count, subject_id)
VALUES ('hFDGdfu43nfds2345', 3, 1);

insert into proj_exercise(EXERCISE_CONDITION, ANSWER)
VALUES ('Выберите верный ответ из предложенных: а, б , с', 'a'),
       ('x+10=20', '10');

insert into proj_class(CLASS_NUMBER)
VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11)

insert into proj_class_subject(CLASS_ID,SUBJECT_ID)
VALUES (6,1),(7,1),(7,2),(7,3),(7,4),(8,1),(8,5),(8,3),(8,4),(9,1),(9,6)