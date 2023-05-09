/* eslint-disable */
// @ts-nocheck

const MuscleGroups = ({
  muscle_groups,
  clearSearchOnClick,
}: any): JSX.Element => {
  return (
    <div className="flex flex-col justify-center py-3 lg:flex-row lg:space-x-1">
      {muscle_groups.map((item: any) => {
        return (
          <button
            className=" rounded border border-gray-400 bg-white py-2 text-center text-lg  font-semibold text-gray-800 shadow  hover:bg-purple-200 sm:w-auto sm:overflow-auto lg:w-[200px] lg:text-[13px]"
            key={item.muscle_group_id}
            onClick={() => {
              clearSearchOnClick();

              try {
                document
                  .getElementById(item.muscle_group_id)
                  .scrollIntoView({ behavior: "smooth" });
              } catch {
                return null;
              }
            }}
          >
            {item.muscle_group}
          </button>
        );
      })}
    </div>
  );
};

export default MuscleGroups;
