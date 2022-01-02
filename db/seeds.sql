INSERT INTO department (name)
VALUES
    ('Marketing'),
    ('Engineering'),
    ('Creative');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales', 40000, 1),
    ('Promoter', 20000, 1),
    ('Project Lead', 120000, 2),
    ('Engineer', 60000, 2),
    ('Designer', 70000, 3),
    ('Assistant', 30000, 3);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES
    ('Ronald', 'Firbank', 1, NULL),
    ('Virginia', 'Woolf', 1, NULL),
    ('Piers', 'Gaveston', 2, NULL),
    ('Charles', 'LeRoi', 5, NULL),
    ('Katherine', 'Mansfield', 4, 6),
    ('Dora', 'Carrington', 3, NULL),
    ('Edward', 'Bellamy', 4, 6),
    ('Montague', 'Summers',5, NULL),
    ('Octavia', 'Butler', 6, 8),
    ('Unica', 'Zurn', 6, 8);        