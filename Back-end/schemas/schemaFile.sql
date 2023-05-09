/* sudo -u username psql -d database -a -f filepath.sql */
CREATE TABLE
  users (
    id SERIAL NOT NULL PRIMARY KEY,
    auth_id VARCHAR(200) DEFAULT null,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(50),
    user_password VARCHAR(60),
    weight_lbs integer,
    height_inches integer,
    sex VARCHAR(50),
    profile_pic VARCHAR(100)
  );

CREATE TABLE
  muscle_groups (
    id SERIAL NOT NULL PRIMARY KEY,
    muscle_group VARCHAR(50),
    photo_url VARCHAR(250)
  );

CREATE TABLE
  exercises (
    id SERIAL NOT NULL PRIMARY KEY,
    exercise VARCHAR(50),
    muscle_group_id integer REFERENCES muscle_groups (id),
    user_id integer REFERENCES users (id) ON DELETE CASCADE DEFAULT null
  );

CREATE TABLE
  workout_exercises (
    id SERIAL NOT NULL PRIMARY KEY,
    est_cals_burned integer DEFAULT 0,
    log_date DATE NOT NULL,
    is_complete boolean DEFAULT false,
    exercise_id integer REFERENCES exercises (id) ON DELETE CASCADE,
    user_id integer REFERENCES users (id) ON DELETE CASCADE
  );

CREATE TABLE
  exercise_set (
    id SERIAL NOT NULL PRIMARY KEY,
    weight_lbs integer,
    reps integer,
    reps_actual integer DEFAULT 0,
    workout_exercise_id integer REFERENCES workout_exercises (id) ON DELETE CASCADE
  );

CREATE TABLE
  daily_calories (
    id SERIAL NOT NULL PRIMARY KEY,
    total_cals_burned integer DEFAULT 0,
    total_cals_gained integer DEFAULT 0,
    log_date DATE NOT NULL,
    user_id integer REFERENCES users (id) ON DELETE CASCADE
  );

CREATE TABLE
  foods (
    id SERIAL NOT NULL PRIMARY KEY,
    food_name VARCHAR(255),
    food_id VARCHAR(255),
    measurements VARCHAR(2000),
    nutrients VARCHAR(500),
    food_image VARCHAR(255)
  );

CREATE TABLE
  nutrition_log (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id integer REFERENCES users (id),
    log_date DATE NOT NULL,
    food integer REFERENCES foods (id),
    portion real,
    measurement VARCHAR(100),
    consumed boolean DEFAULT false
  );



-- INSERT default muscle groups
INSERT INTO
  public.muscle_groups (id, muscle_group, photo_url)
VALUES
  (1, 'Biceps', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858736/Muscle%20Groups/Bicep_ypvub8.jpg'),
  (2, 'Triceps', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858733/Muscle%20Groups/Tricep_fcjqcg.jpg'),
  (3, 'Chest', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858221/Muscle%20Groups/Chest_czuxgj.jpg'),
  (4, 'Shoulders', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858221/Muscle%20Groups/Shoulders_qbnu7z.jpg'),
  (5, 'Back', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858731/Muscle%20Groups/Back_oqtrom.jpg'),
  (6, 'Hamstrings', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858221/Muscle%20Groups/Hamstrings_nc1o6h.jpg'),
  (7, 'Quads', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858221/Muscle%20Groups/Quads_dwm1ap.jpg'),
  (8, 'Glutes', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858221/Muscle%20Groups/Glutes_o04mqs.jpg'),
  (9, 'Calves', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858221/Muscle%20Groups/Calves_yhhyxm.jpg'),
  (10, 'Abs', 'https://res.cloudinary.com/drtz4q3am/image/upload/v1671858735/Muscle%20Groups/Abs_s13jgg.jpg');

-- INSERT default exercises for Biceps
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
  ('DB Curls', 1),
  ('Hammer Curls', 1),
  ('Cable Curls', 1),
  ('Concentration Curls', 1),
  ('Preacher Curls', 1),
  ('DB Alternating Curls', 1),
  ('EZ Bar Curls', 1),
  ('Barbell Curls', 1);

-- INSERT default exercises for Triceps
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
  ('Skullcrusher', 2),
  ('DB Pull Overs', 2),
  ('Tricep Pushdown', 2),
  ('Dips', 2),
  ('Preacher Curls', 2),
  ('Tricep Kick Back', 2),
  ('Closegrip Bench', 2);

-- INSERT default exercises for Chest
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('DB Decline Press', 3),
('Machine Incline Press', 3),
('Cable Cross Overs', 3),
('Barbell Bench Press', 3),
('Machine Chest Press', 3),
('DB Bench', 3),
('Incline Bench', 3),
('Decline Bench', 3),
('Cambered Bar Bench', 3),
('Machine Incline Bench', 3);

-- INSERT default exercises for Shoulders
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('Shrugs', 4),
('Upright Rows', 4),
('DB Lateral Raise', 4),
('DB Front Raises', 4),
('DB Arnold Press', 4),
('Machine Military Press', 4),
('Push Press', 4),
('Face Pulls', 4),
('Cable Upright Rows', 4),
('DB Cuban Press', 4);

-- INSERT default exercises for Back
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('Chest Supported Rows', 5),
('Inverted Rows', 5),
('DB Rows', 5),
('T-Bar Rows', 5),
('Lat Pulldowns', 5),
('Seated Rows', 5),
('Seal Rows', 5),
('Bent-over Rows', 5),
('Rack Pulls', 5),
('Pendlay Rows', 5);

-- INSERT default exercises for Hamstrings
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('DB RDLs', 6),
('Seated Leg Curl', 6),
('Hamstring Curls', 6),
('Romanian Dealift', 6),
('Good Mornings', 6),
('Standing Leg Curl', 6),
('Stiff Leg Deadlift', 6),
('Single Leg Hip Thrust', 6),
('Landmine Single Leg RDL', 6),
('Reverse Hyperextension', 6);

-- INSERT default exercises for Quads
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('Leg Extensions', 7),
('Split Squat (Quad Emphasis)', 7),
('Lunges', 7),
('Reverse Hack Squat', 7),
('Leg Press', 7),
('Belt Squats', 7),
('Goblet Squats', 7),
('Front Squats', 7),
('Barbell Squats', 7),
('Safety Bar Squats', 7);

-- INSERT default exercises for Glutes
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('Barbell Glute Bridge', 8),
('Split Squat (Glutes Emphasis)', 8),
('Reverse Hyper', 8),
('Glute Kickbacks', 8),
('Smith Machine Hip Thrusts', 8),
('Smith Machine Reverse Lunge', 8),
('Lateral Lunge', 8);

-- INSERT default exercises for Calves
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
('Single Leg Calf Raise', 9),
('Bent Knee Calf Raises', 9),
('Calf Raises', 9),
('Barbell Seated Calf Raise', 9),
('Smith Machine Calf Raise', 9),
('Seated Calf Raise', 9);

-- INSERT default exercises for Abs
INSERT INTO
  public.exercises (exercise, muscle_group_id)
VALUES
  ( 'Barbell Russian Twists', 10),
  ( 'Cable Crunch', 10),
  ( 'Hanging Leg Raises', 10),
  ( 'Weighted Situps', 10),
  ( 'Front Plank', 10);

-- NUTRITION --

INSERT INTO
  public.foods (food_name, food_id, nutrients, measurements, food_image)
VALUES
  ('Bacon Clubhouse Burger 9.7 oz (274 g)', 'food_bmyxrshbfao9s1amjrvhoauob6mo', '{
      "CAL": "740",
      "FAT": "41",
      "SFAT": "16",
      "TFAT": "1.5",
      "CHOL": "125",
      "SALT": "1480",
      "CARB": "51",
      "FBR": "4",
      "SGR": "14",
      "PRO": "40",
      "ITEM": "Bacon Clubhouse Burger 9.7 oz (274 g)",
      "CATEGORY": "BURGERSANDWICH"
  }', '[
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
                    "label": "Whole",
                    "weight": 131.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_sandwich",
                    "label": "Sandwich",
                    "weight": 131.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                    "label": "Gram",
                    "weight": 1.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_ounce",
                    "label": "Ounce",
                    "weight": 28.349523125
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_pound",
                    "label": "Pound",
                    "weight": 453.59237
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram",
                    "label": "Kilogram",
                    "weight": 1000.0
                }
            ]', 'imagegoes here'),
  ('Premium Grilled Chicken Bacon Clubhouse Sandwich 10 oz (285 g)', 'food_aqnly5xaq6rsv2bv0oi81bugldyr', '{
      "CAL": "640",
      "FAT": "41",
      "SFAT": "16",
      "TFAT": "1.5",
      "CHOL": "125",
      "SALT": "1480",
      "CARB": "51",
      "FBR": "4",
      "SGR": "14",
      "PRO": "40",
      "ITEM": "Premium Grilled Chicken Bacon Clubhouse Sandwich 10 oz (285 g)",
      "CATEGORY": "BURGERSANDWICH"
  }', '[
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
                    "label": "Whole",
                    "weight": 131.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_sandwich",
                    "label": "Sandwich",
                    "weight": 131.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                    "label": "Gram",
                    "weight": 1.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_ounce",
                    "label": "Ounce",
                    "weight": 28.349523125
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_pound",
                    "label": "Pound",
                    "weight": 453.59237
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram",
                    "label": "Kilogram",
                    "weight": 1000.0
                }
            ]', 'image goes here'),
  ('Premium Buttermilk Crispy Chicken Bacon Clubhouse Sandwich 10.1 oz (287 g)', 'food_a3ssteza84mhb2alnunwga2n6yt8', '{
      "CAL": "700",
      "FAT": "41",
      "SFAT": "16",
      "TFAT": "1.5",
      "CHOL": "125",
      "SALT": "1480",
      "CARB": "51",
      "FBR": "4",
      "SGR": "14",
      "PRO": "40",
      "ITEM": "Premium Buttermilk Crispy Chicken Bacon Clubhouse Sandwich 10.1 oz (287 g)",
      "CATEGORY": "BURGERSANDWICH"
  }', '[
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
                    "label": "Whole",
                    "weight": 131.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_sandwich",
                    "label": "Sandwich",
                    "weight": 131.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                    "label": "Gram",
                    "weight": 1.0
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_ounce",
                    "label": "Ounce",
                    "weight": 28.349523125
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_pound",
                    "label": "Pound",
                    "weight": 453.59237
                },
                {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram",
                    "label": "Kilogram",
                    "weight": 1000.0
                }
            ]', 'image goes here');

--hardcoding user DO NOT DELETE!!!!!!!!!!!!!!!
INSERT INTO public.users(
      auth_id, firstname, lastname, email, user_password, weight_lbs, height_inches, sex)
      VALUES ('dfbdfbdxbdbdbfg', 'john', 'doe', 'test@test.com', '$2a$10$2QjueIyd34KXHCPhvhO5Vud2aefE96jJsOLejC.C0pxriPSBdgWbW', 150, 70, 'male');

INSERT INTO public.users(
      auth_id, firstname, lastname, email, user_password, weight_lbs, height_inches, sex)
      VALUES('kr945lj598u6j', 'jane', 'doe', 'doe@test.com', 'password', 150, 60, 'female');

-- hardcoding workout exercises
INSERT INTO public.workout_exercises(
      log_date, exercise_id, is_complete, user_id)
      VALUES ('2022-12-13', 6, false, 1), ('2022-12-13', 79, false, 1), ('2022-12-13', 71, false, 1), ('2022-12-14', 69, false, 1), ('2022-12-14', 64, false, 1), ('2022-12-15', 64, false, 1);


-----------------------------------------------------------
     -- INSERT STATEMENTS FOR REPORT MOCK DATA --
-----------------------------------------------------------

-- Insert exercises for users
INSERT INTO public.workout_exercises(
      log_date, exercise_id, is_complete, user_id)
      VALUES ('2022-1-4', 26, true, 1),('2022-1-13', 26, true, 1),('2022-1-24', 26, true, 1),('2022-3-2', 26, true, 1),('2022-3-14', 26, true, 1),('2022-4-21', 26, true, 1),('2022-5-5', 26, true, 1),('2022-5-14', 26, true, 1),('2022-5-27', 26, true, 1),('2022-5-28', 26, true, 1),('2022-7-26', 26, true, 1),('2022-7-27', 26, true, 1),('2022-7-29', 26, true, 1),('2022-8-5', 26, true, 1),('2022-8-8', 26, true, 1),('2022-8-14', 26, true, 1),('2022-8-19', 26, true, 1),('2022-10-6', 26, true, 1),('2022-10-10', 26, true, 1),('2022-10-11', 26, true, 1),('2022-10-12', 26, true, 1),('2022-10-22', 26, true, 1),('2022-11-14', 26, true, 1),('2022-12-20', 26, true, 1),('2022-12-23', 26, true, 1),('2022-2-13',39, true, 1),('2022-3-16',39, true, 1),('2022-3-20',39, true, 1),('2022-3-28',39, true, 1),('2022-4-12',39, true, 1),('2022-4-21',39, true, 1),('2022-5-19',39, true, 1),('2022-7-30',39, true, 1),('2022-10-12',39, true, 1),('2022-11-21',39, true, 1),('2022-1-1', 65, true, 1),('2022-2-1', 65, true, 1),('2022-3-1', 65, true, 1),('2022-4-1', 65, true, 1),('2022-5-1', 65, true, 1),('2022-6-1', 65, true, 1),('2022-7-1', 65, true, 1),('2022-8-1', 65, true, 1),('2022-9-1', 65, true, 1),('2022-10-1', 65, true, 1),('2022-11-1', 65, true, 1),('2022-12-1', 65, true, 1),('2021-1-11', 58, true, 1),('2021-3-1', 58, true, 1),('2021-4-6', 58, true, 1),('2021-4-12', 58, true, 1),('2021-4-28', 58, true, 1),('2021-5-26', 58, true, 1),('2021-6-7', 58, true, 1),('2021-7-11', 58, true, 1),('2021-9-21', 58, true, 1),('2021-10-17', 58, true, 1),('2021-10-27', 58, true, 1),('2021-10-28', 58, true, 1),('2021-4-9', 46, true, 1),('2021-4-10', 46, true, 1),('2021-4-11', 46, true, 1),('2021-4-12', 46, true, 1),('2021-4-13', 46, true, 1),('2021-4-14', 46, true, 1),('2021-4-15', 46, true, 1),('2021-4-16', 46, true, 1),('2021-4-17', 46, true, 1),('2021-4-18', 46, true, 1),('2021-4-19', 46, true, 1),('2022-12-13', 21, true, 1),('2022-12-14', 21, true, 1),('2022-12-15', 21, true, 1),('2022-12-16', 21, true, 2),('2022-12-17', 21, true, 2),('2022-12-18', 21, true, 2),('2022-12-19', 21, true, 2),('2022-1-1', 31, true, 1),('2022-2-1', 31, true, 1),('2022-3-1', 31, true, 1),('2022-4-1', 31, true, 1),('2022-5-1', 31, true, 1),('2022-6-1', 31, true, 1),('2022-7-1', 31, true, 1),('2022-8-1', 31, true, 1),('2022-9-1', 31, true, 1),('2022-10-1', 31, true, 1),('2022-11-1', 31, true, 1),('2022-12-1', 31, true, 1);

-- Insert sets for exercises
INSERT INTO public.exercise_set (
      weight_lbs, reps, workout_exercise_id)
      VALUES (120, 10, 7), (115, 10, 7), (105, 10, 7), (220, 10, 8), (215, 10, 8), (205, 10, 8), (270, 10, 9), (265, 10, 9), (255, 10, 9), (160, 10, 10), (155, 10, 10), (145, 10, 10), (150, 10, 11), (145, 10, 11), (135, 10, 11), (145, 10, 12), (140, 10, 12), (130, 10, 12), (70, 10, 13), (65, 10, 13), (55, 10, 13), (90, 10, 14), (85, 10, 14), (75, 10, 14), (180, 10, 15), (175, 10, 15), (165, 10, 15), (210, 10, 16), (205, 10, 16), (195, 10, 16), (200, 10, 17), (195, 10, 17), (185, 10, 17), (230, 10, 18), (225, 10, 18), (215, 10, 18), (260, 10, 19), (255, 10, 19), (245, 10, 19), (150, 10, 20), (145, 10, 20), (135, 10, 20), (180, 10, 21), (175, 10, 21), (165, 10, 21), (290, 10, 22), (285, 10, 22), (275, 10, 22), (200, 10, 23), (195, 10, 23), (185, 10, 23), (300, 10, 24), (295, 10, 24), (285, 10, 24), (240, 10, 25), (235, 10, 25), (225, 10, 25), (300, 10, 26), (295, 10, 26), (285, 10, 26), (160, 10, 27), (155, 10, 27), (145, 10, 27), (175, 10, 28), (170, 10, 28), (160, 10, 28), (195, 10, 29), (190, 10, 29), (180, 10, 29), (180, 10, 30), (175, 10, 30), (165, 10, 30), (80, 10, 31), (75, 10, 31), (65, 10, 31), (150, 10, 32), (145, 10, 32), (135, 10, 32), (250, 10, 33), (245, 10, 33), (235, 10, 33), (140, 10, 34), (135, 10, 34), (125, 10, 34), (80, 10, 35), (75, 10, 35), (65, 10, 35), (250, 10, 36), (245, 10, 36), (235, 10, 36), (190, 10, 37), (185, 10, 37), (175, 10, 37), (230, 10, 38), (225, 10, 38), (215, 10, 38), (100, 10, 39), (95, 10, 39), (85, 10, 39), (170, 10, 40), (165, 10, 40), (155, 10, 40), (180, 10, 41), (175, 10, 41), (165, 10, 41), (500, 10, 42), (495, 10, 42), (485, 10, 42), (100, 10, 43), (95, 10, 43), (85, 10, 43), (50, 10, 44), (45, 10, 44), (35, 10, 44), (78, 10, 45), (73, 10, 45), (63, 10, 45), (236, 10, 46), (231, 10, 46), (221, 10, 46), (367, 10, 47), (362, 10, 47), (352, 10, 47), (400, 10, 48), (395, 10, 48), (385, 10, 48), (200, 10, 49), (195, 10, 49), (185, 10, 49), (300, 10, 50), (295, 10, 50), (285, 10, 50), (158, 10, 51), (153, 10, 51), (143, 10, 51), (198, 10, 52), (193, 10, 52), (183, 10, 52), (220, 10, 53), (215, 10, 53), (205, 10, 53), (30, 10, 54), (25, 10, 54), (15, 10, 54), (50, 10, 55), (45, 10, 55), (35, 10, 55), (45, 10, 56), (40, 10, 56), (30, 10, 56), (80, 10, 57), (75, 10, 57), (65, 10, 57), (100, 10, 58), (95, 10, 58), (85, 10, 58), (125, 10, 59), (120, 10, 59), (110, 10, 59), (120, 10, 60), (115, 10, 60), (105, 10, 60), (110, 10, 61), (105, 10, 61), (95, 10, 61), (130, 10, 62), (125, 10, 62), (115, 10, 62), (150, 10, 63), (145, 10, 63), (135, 10, 63), (140, 10, 64), (135, 10, 64), (125, 10, 64), (145, 10, 65), (140, 10, 65), (130, 10, 65), (130, 10, 66), (125, 10, 66), (115, 10, 66), (150, 10, 67), (145, 10, 67), (135, 10, 67), (140, 10, 68), (135, 10, 68), (125, 10, 68), (140, 10, 69), (135, 10, 69), (125, 10, 69), (180, 10, 70), (175, 10, 70), (165, 10, 70), (200, 10, 71), (195, 10, 71), (185, 10, 71), (205, 10, 72), (200, 10, 72), (190, 10, 72), (210, 10, 73), (205, 10, 73), (195, 10, 73), (215, 10, 74), (210, 10, 74), (200, 10, 74), (220, 10, 75), (215, 10, 75), (205, 10, 75), (220, 10, 76), (215, 10, 76), (205, 10, 76), (350, 10, 77), (345, 10, 77), (335, 10, 77), (220, 10, 78), (215, 10, 78), (205, 10, 78), (280, 10, 79), (275, 10, 79), (265, 10, 79), (250, 10, 80), (245, 10, 80), (235, 10, 80), (380, 10, 81), (375, 10, 81), (365, 10, 81), (360, 10, 82), (355, 10, 82), (345, 10, 82), (420, 10, 83), (415, 10, 83), (405, 10, 83), (500, 10, 84), (495, 10, 84), (485, 10, 84), (100, 10, 85), (95, 10, 85), (85, 10, 85), (50, 10, 86), (45, 10, 86), (35, 10, 86), (78, 10, 87), (73, 10, 87), (63, 10, 87), (236, 10, 88), (231, 10, 88), (221, 10, 88), (367, 10, 89), (362, 10, 89), (352, 10, 89), (400, 10, 90), (395, 10, 90), (385, 10, 90), (200, 10, 91), (195, 10, 91), (185, 10, 91), (300, 10, 92), (295, 10, 92), (285, 10, 92), (158, 10, 93), (153, 10, 93), (143, 10, 93), (198, 10, 94), (193, 10, 94), (183, 10, 94), (220, 10, 95), (215, 10, 95), (205, 10, 95);

