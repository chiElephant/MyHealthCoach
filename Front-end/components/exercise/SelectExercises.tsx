import GroupSearchExercises from "./GroupSearchExercises";

const SelectExercises = ({
  exercises,
  handleAddExerciseToWorkout,
}: any): JSX.Element => {
  console.log("exercises in select: ", exercises);

  const groups = exercises.reduce((acc: any, obj: any) => {
    const { muscle_group, muscle_group_id } = obj;

    const key = muscle_group;
    const group = acc[key] ?? [];

    return { ...acc, [key]: [...group, obj] };
  }, {});

  return (
    <div className=" h-[600px] w-full items-center overflow-auto overflow-y-scroll rounded-2xl bg-slate-50 p-2 shadow-well">
      {Object.entries(groups).map((item: any, index) => {
        const muscle_group_id = item[1][0].muscle_group_id;
        const muscle_group = item[1][0].muscle_group;
        const group_exercises = item[1];

        return (
          <div
            key={muscle_group_id}
            className="flex w-full flex-col justify-start"
          >
            <div
              id={muscle_group_id}
              className="mb-2 text-2xl font-semibold text-gray-800"
            >
              {muscle_group}
            </div>
            <GroupSearchExercises
              exercises={group_exercises}
              handleAddExerciseToWorkout={handleAddExerciseToWorkout}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SelectExercises;
