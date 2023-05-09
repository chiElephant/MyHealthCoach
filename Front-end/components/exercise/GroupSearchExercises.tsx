const GroupSearchExercises = ({
  exercises,
  handleAddExerciseToWorkout,
}: any): JSX.Element => {
  return (
    <div className="ml-2 mb-2 flex flex-col">
      {exercises.map((exercise: any) => {
        return (
          <button
            className="txt:large m-1 rounded border border-gray-400 bg-white py-2 px-4 text-start font-semibold text-gray-800 shadow hover:bg-blue-200"
            key={exercise.exercise_id}
            onClick={() => handleAddExerciseToWorkout(exercise.exercise_id)}
          >
            {exercise.exercise}
          </button>
        );
      })}
    </div>
  );
};

export default GroupSearchExercises;
