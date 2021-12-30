INSERT INTO department (name)
VALUES
    ('Marketing'),
    ('Engineering'),
    ('Creative');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales', 40.000, 1),
    ('Promoter', 20.000, 1),
    ('Project Lead', 120.000, 2),
    ('Engineer', 60.000, 2),
    ('Designer', 70.000, 3),
    ('Assistant', 30.000, 3);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES
    ('Ronald', 'Firbank', 1, NULL),
    ('Virginia', 'Woolf', 1, NULL),
    ('Piers', 'Gaveston', 2, NULL),
    ('Charles', 'LeRoi', 5, NULL),
    ('Katherine', 'Mansfield', 4, NULL),
    ('Dora', 'Carrington', 3, NULL),
    ('Edward', 'Bellamy', 4, NULL),
    ('Montague', 'Summers',5, NULL),
    ('Octavia', 'Butler', 6, NULL),
    ('Unica', 'Zurn', 6, NULL);        