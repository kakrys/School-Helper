INSERT INTO proj_school(school_name, school_city, school_address)
values('МОУ СОШ 3773', 'Калининград', 'Улица Резиновой Уточки, строение 27');

insert into proj_grade(grade_number, litera, school_id)
values(6, 'Ю', 1);

insert into proj_subject (subject_name)
values ('Math'), ('Russian'), ('Physics');

insert into proj_variant(generator_code, count, subject_id)
VALUES ('hFDGdfu43nfds2345', 3, 1);

insert into proj_exercise(EXERCISE_CONDITION, ANSWER)
VALUES ('Выберите верный ответ из предложенных: а, б , с', 'a'),
       ('x+10=20', '10');
