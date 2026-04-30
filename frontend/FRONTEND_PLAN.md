# Frontend Plan

## Objective
Build the frontend of `Power Gym Coach` in a fully mocked first phase, focusing on UX, flows, visual consistency, and domain structure before real API integration.

## Product principles
- Two access levels: `teacher` and `student`.
- The current plan must always be visible and easy to edit for the teacher.
- The current plan must always be visible for the student.
- Old plans and old progress entries must live only inside the history area.
- The first implementation cycle is mock-first.

## Access model

### Teacher
Main responsibility:
- manage students
- manage exercise library
- create and update training plans
- create and update diet plans
- request exams
- review assessments
- track progress and history

### Student
Main responsibility:
- follow the current plan
- review current training and diet
- upload assessment material
- send exams when requested
- track progress and history

## Core domain areas
1. Authentication and role selection
2. Current plan
3. Exercise library
4. Training
5. Food library
6. Diet
7. Supplementation
8. Assessment
9. Exams
10. Progress
11. History

## Current delivery status

Already implemented in the mocked frontend:
- role selection and role-based shell
- teacher and student tab navigation
- current plan visualization
- training editor
- meal editor
- diet portion preview
- exercise library
- assessment area
- progress area
- history area
- unit test foundation with Jest and React Native Testing Library

## Priority roadmap

### P1. Complete the plan editing loop
- supplementation editor
- explicit save/reset UX for current plan changes
- better transitions between plan view and plan editors
- student details actions wired to the correct flows
Status:
- completed in mocked frontend
- current plan now has draft/save/discard flow
- current plan now includes a review-before-save summary
- teacher student details is wired as an operational hub

### P2. Exams workflow
- dedicated exams screen for teacher and student
- request status visualization
- uploaded exam list
- quick actions to request or send new exams
Status:
- completed in mocked frontend
- timeline and quick actions are available for teacher and student

### P3. Assessment and progress refinement
- richer progress cards and comparisons
- better assessment timeline
- clearer relationship between assessment feedback and plan updates
Status:
- completed for the current mock phase
- assessment, exams and progress are now connected more clearly

### P4. Repository preparation for real API
- repository contracts per domain
- mock/state separation
- easier replacement of mock data by remote data sources
Status:
- in progress with strong foundation
- domain hooks and student overview repository were added to reduce direct mock coupling
- domain repository adapters were added for assessment, exams, plan, progress and student journey

## New delivery status

Recently completed:
- more realistic mocked exam workflow
- assessment-to-plan update flow
- unified student journey timeline for the teacher
- domain-level repository adapters
- stronger unit coverage on new workflow state and critical screens
- form-based mocked flows for assessment and exams
- reusable journey components for status, decisions and timeline
- richer progress comparisons and momentum summary
- current plan diff review with nutrition impact
- student journey filters and pending-priority summaries
- teacher review note flow for exams and assessment-triggered follow-up requests

## Information architecture

### Teacher app sections
1. Dashboard
2. Students
3. Current plan
4. Assessment
5. Exams
6. History

### Student app sections
1. Home
2. Current plan
3. Assessment
4. Progress
5. History

## Recommended navigation

### Shared
- Auth stack
- Role-based app shell

### Teacher navigation
- Bottom tabs:
  - Dashboard
  - Students
  - Current Plan
  - History
- Nested flows:
  - Student details
  - Training editor
  - Diet editor
  - Assessment review
  - Exam requests

### Student navigation
- Bottom tabs:
  - Home
  - Current Plan
  - Progress
  - History
- Nested flows:
  - Training details
  - Diet details
  - Assessment submission
  - Exams

## Teacher features breakdown

### 1. Student management
- student list
- student details
- quick status overview
- last assessment date
- current plan status

### 2. Current plan
Current plan is the main working area for the teacher.

Contains:
- active training plan
- active diet plan
- active supplementation plan
- current notes
- edit actions

### 3. Training plan
Structure:
- split by weekday
- each day has a title
- list of exercises
- notes per day

Exercise source:
- teacher can pick exercises from a reusable exercise library
- teacher can create custom exercises
- teacher can attach a personal demo video to each exercise

Suggested mocked model:
- Monday
- Tuesday
- Wednesday
- Thursday
- Friday
- Saturday
- Sunday

Each training day may contain:
- exercise reference id
- exercise name
- sets
- reps
- rest time
- load notes
- execution notes

### Exercise library
Purpose:
- central catalog of gym exercises
- reusable during training creation

Teacher actions:
- browse exercise list
- search exercises
- select an exercise for a workout day
- create new exercise
- edit custom exercise
- attach teacher demo video

Suggested exercise fields:
- id
- name
- category
- muscleGroup
- equipment
- instructions
- demoVideoUrl
- thumbnailUrl
- createdByTeacherId
- isCustom

### 4. Diet plan
Structure:
- split by meals
- notes per meal
- supplementation area

Food source:
- teacher can pick foods from a reusable food library
- food data should include calories and macronutrients
- teacher defines grams or quantity at selection time
- totals should be recalculated automatically

Suggested meals:
- breakfast
- morning snack
- lunch
- afternoon snack
- dinner
- supper

Each meal may contain:
- food reference id
- meal title
- food items
- quantity
- unit type
- calories
- carbs
- protein
- fat
- observation

Diet totals should show:
- total calories
- total carbohydrates
- total proteins
- total fats
- per-meal totals

### Food library
Purpose:
- central catalog of foods for diet assembly
- reusable across all student diet plans

Reference:
- use TACO 4th revised and expanded edition (NEPA/UNICAMP, 2011) as the nutritional reference for the mocked structure

Teacher actions:
- browse food list
- search food list
- select a food for a meal
- define grams or quantity
- optionally add custom food later

Suggested food fields:
- id
- name
- category
- defaultBase
- baseAmount
- baseUnit
- calories
- carbs
- protein
- fat
- fiber
- source

Suggested diet-item behavior:
- if base is `100g`, recalculate nutrition proportionally by entered grams
- if base is `1 unidade`, recalculate by entered quantity
- totals should update meal summary and diet summary instantly

Supplementation section:
- supplement name
- dosage
- time
- observation

### 5. Assessment
The student sends:
- images
- text description

The teacher reviews:
- current condition
- observations
- adjustment suggestions
- new plan trigger

### 6. Exams
Teacher can:
- request exams
- define request note
- mark request as pending or delivered

Student can:
- upload exam files
- see requested exams

## Student features breakdown

### 1. Home
- current plan summary
- today training summary
- today diet summary
- latest teacher feedback
- pending exam requests

### 2. Current plan
Must show:
- active plan name
- active date range
- training summary
- diet summary
- supplementation summary
- total calories and macro summary

### 3. Training
- view weekly split
- open training day details
- read exercise instructions and notes
- watch teacher demo video when available

### 4. Diet and supplementation
- view meals
- read observations
- view supplement routine
- view calories and macro totals

### 5. Assessment
- send images
- send text description
- read teacher evaluation

### 6. Progress
- body changes timeline
- weight notes
- completed assessments
- visual comparison cards

### 7. History
- old plans
- old progress entries
- old assessments

## Rule for current plan vs history

### Current plan area
Only:
- active training
- active diet
- active supplementation
- active assessment context

### History area
Only:
- past plans
- past progress data
- archived assessments
- previous exam submissions if needed

## Frontend mock strategy

### Phase 1
- no backend
- no real upload
- local mocked repository data
- static role switch for teacher and student
- local editing flows only

### Mock layers
- `src/types` for domain contracts
- `src/repository/mock` for fake data
- `src/hooks` for business flow
- `src/screens` for role-based pages

### Mock nutrition strategy
- create a mocked food dataset inspired by TACO fields
- use local calculations for grams, quantity, calories, carbs, protein, and fat
- show summary charts using mocked aggregated values

## Suggested domain models
- `User`
- `Student`
- `Teacher`
- `Plan`
- `ExerciseLibraryItem`
- `TrainingPlan`
- `TrainingDay`
- `TrainingExercise`
- `FoodLibraryItem`
- `DietPlan`
- `Meal`
- `MealItem`
- `Supplement`
- `AssessmentRequest`
- `AssessmentSubmission`
- `AssessmentReview`
- `ExamRequest`
- `ExamUpload`
- `ProgressEntry`
- `HistoryRecord`

## Implementation phases

### Phase 1: foundations
1. Define types
2. Create mock repository
3. Create global auth and role mock state
4. Define role-based navigation
5. Define nutrition calculation helpers

### Phase 2: design system
1. Expand Storybook
2. Create list items
3. Create tabs and top bars
4. Create form sections
5. Create cards for current plan and history

### Phase 3: teacher flow
1. Dashboard
2. Student list
3. Exercise library
4. Student details
5. Current plan editor
6. Assessment review
7. Exam requests

### Phase 4: student flow
1. Home
2. Current plan
3. Training details
4. Exercise detail with teacher video
5. Diet details
6. Assessment submission
7. Progress
8. History

### Phase 5: polish
1. Better transitions
2. Empty states
3. Loading skeletons
4. Validation states
5. Mock media/file states

## First screens to build
1. Role selection
2. Teacher dashboard
3. Student home
4. Exercise library
5. Student details
6. Current plan screen
7. Diet editor with food picker

## First component groups to add to Storybook
1. Typography scale
2. Navigation tab item
3. Summary card
4. Student list item
5. Exercise item
6. Exercise video card
7. Meal card
8. Supplement card
9. Assessment card
10. Exam request card
11. History card
12. Food picker item
13. Macro summary card
14. Calories chart card

## Practical next step
Start by modeling the domain types and mocked repositories, then build the role selection and the two entry dashboards:
- teacher dashboard
- student home
