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
VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11);

insert into proj_class_subject(CLASS_ID,SUBJECT_ID)
VALUES (6,1),(7,1),(7,2),(7,3),(7,4),(8,1),(8,5),(8,3),(8,4),(9,1),(9,6);