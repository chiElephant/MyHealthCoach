import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import axios from "axios";

import ExerciseList from "../components/exercise/ExerciseList";
import CalorieComponent from "../components/exercise/CalorieComponent";
import SearchModal from "../components/exercise/SearchModal";
import EditModal from "../components/exercise/EditModal";
import CompletedModal from "../components/exercise/CompletedModal";
import AddSet from "../components/exercise/AddSet";
import IncompleteModal from "../components/exercise/IncompleteModal";
import LoginConfirmModal from "../components/exercise/LoginConfirmModal";
// import { ChildProps } from "../components/Layout";

import { MdOutlineFitnessCenter } from "react-icons/md";

export default function Exercise({
  query_date,
  currentDate,
  setTitle,
  setIcon,
  setShowCalendar,
  userId,
  default_exercises,
  muscle_groups,
  setShowReportButtons,
}: any): JSX.Element {
  // IDs
  const [workoutID, setWorkoutID] = useState(1);
  const [setID, setSetID] = useState(1);

  // Exercises
  const [exercises, setExercises] = useState([]);

  // Modals
  const [addModalState, setAddModalState] = useState(false);
  const [editModalState, setEditModalState] = useState(false);
  const [completedModalState, setCompletedModalState] = useState(false);
  const [addSetModalState, setAddSetModalState] = useState(false);
  const [fetchExercises, setfetchExercises] = useState(false);

  // Calories
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  //Sets
  const [editSets, setEditSets] = useState([]);

  //Confirmations
  const [workoutConfirm, setWorkoutConfirm] = useState(false);
  const [ loginConfirm, setLoginConfirm ] = useState(false);

  //Yey
  const [confetti, setConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    setTitle("Exercise");
    setIcon(() => MdOutlineFitnessCenter);
    setShowCalendar(true);
    setShowReportButtons(false);
  }, [setTitle, setIcon, setShowCalendar]);

  useEffect(() => {
    getUserExercises()
      .then(({ data }) => {
        setExercises(data.result);
        setCaloriesBurned(data.total_cals_burned);
      })
      .catch((error) => {
        console.log("ERROR GETTING EXERCISES: ", error.stack);
      });
  }, [
    addSetModalState,
    editModalState,
    completedModalState,
    addModalState,
    currentDate,
    userId,
    query_date,
  ]);

  //GET FUNCTIONS

  const getUserExercises = () => {
    return axios.get("api/exercise/workout/list", {
      params: { user_id: userId, log_date: query_date },
    });
  };

  const getExerciseSets = (workout_id: number) => {
    return axios.get("api/exercise/list/sets", {
      params: { workout_exercise_id: workout_id },
    });
  };

  //DELETE FUNCTIONS

  const deleteSet = async (set_id: number) => {
    try {
      await axios.delete("api/exercise/sets", { params: { set_id } });
      const { data: newSets } = await getExerciseSets(workoutID);

      setEditSets(newSets);
    } catch (error: any) {
      console.log(error.stack);
    }
  };

  const deleteExercise = async (workout_exercise_id: number) => {
    try {
      await axios.delete("api/exercise/workout", {
        params: { workout_exercise_id },
      });
      const { data: newWorkout } = await getUserExercises();

      setExercises(newWorkout.result);
    } catch (error: any) {
      console.log(error.stack);
    }
  };

  //COMPLETE FUNCTIONS

  const completeSet = (actual_reps: number, set_id: number) => {
    axios
      .put("api/exercise/set", null, {
        params: { set_id, actual_reps, user_id: userId },
      })
      .then(() => {
        toggleCompletedModal(set_id);
      })
      .catch((error) => {
        console.log(error.stack);
      });
  };

  const completeExercise = async (workout_exercise_id: number) => {
    //get sets for exercise
    try {
      const { data: sets } = await getExerciseSets(workout_exercise_id);

      if (!sets.length) {
        console.log("No Sets ):");
        setWorkoutConfirm(true);
        return;
      }

      for (var i = 0; i < sets.length; i++) {
        if (!sets[i].reps_actual) {
          setWorkoutConfirm(true);
          return;
        }
      }

      await axios.put("api/exercise/workout", null, {
        params: { workout_exercise_id, user_id: userId, log_date: query_date },
      });
      const { data: newWorkout } = await getUserExercises();

      setExercises(newWorkout.result);
      setCaloriesBurned(newWorkout.total_cals_burned);
      makeConfetti();
    } catch (error: any) {
      console.log(error.stack);
    }
  };

  const toggleAddModal = (): void => {
    if (userId) {
      setAddModalState((prevState) => !prevState);
    } else {
      setLoginConfirm((prevState) => !prevState);
    }
  };

  const toggleEditModal = (
    workout_id: number,
    repsRefs: [],
    weightsRefs: [],
    setIDs: []
  ) => {
    //if repsRefs and weightRefs are both defined, call put request

    if (repsRefs && weightsRefs) {
      setIDs.sort();

      let reps = repsRefs.map((rep: any) => {
        return Number(rep?.value);
      });

      let weights = weightsRefs.map((weight: any) => {
        return Number(weight?.value);
      });

      axios
        .put("api/exercise/workout/sets", {
          reps,
          weights,
          setIDs,
        })
        .then(({ data }) => {
          console.log("Successfully Updated Sets");
          setEditModalState((prevState) => !prevState);
        })
        .catch((error) => {
          console.log(error.stack);
        });
    } else {
      getExerciseSets(workout_id)
        .then(({ data }) => {
          setEditSets(data);
          setEditModalState((prevState) => !prevState);
          setWorkoutID(workout_id);
        })
        .catch((error) => {
          console.log(error.stack);
        });
    }
  };

  const toggleCompletedModal = (set_id: number) => {
    setCompletedModalState((prevState) => !prevState);
    setSetID(set_id);
  };

  const toggleAddSetModal = (workout_id: number) => {
    setAddSetModalState((prevState) => !prevState);
    setWorkoutID(workout_id);
  };

  const handleFetchExercises = (workout_id: number): void => {
    setfetchExercises((prevState) => !prevState);
  };

  const makeConfetti = () => {
    setConfetti(true);

    setTimeout(() => {
      setConfetti(false);
    }, 5000);
  };

  return (
    <div className="exerciseContainer h-full w-full">
      {confetti && <Confetti width={width} height={height} />}
      {addModalState && (
        <SearchModal
          query_date={query_date}
          user_id={userId}
          toggleAddModal={toggleAddModal}
          default_exercises={default_exercises}
          muscle_groups={muscle_groups}
          handleFetchExercises={handleFetchExercises}
        />
      )}
      {editModalState && (
        <EditModal
          toggleEditModal={toggleEditModal}
          deleteSet={deleteSet}
          workoutID={workoutID}
          sets={editSets}
        />
      )}
      {completedModalState && (
        <CompletedModal
          toggleCompletedModal={toggleCompletedModal}
          completeSet={completeSet}
          setID={setID}
        />
      )}
      {addSetModalState && (
        <AddSet toggleAddSetModal={toggleAddSetModal} workoutID={workoutID} />
      )}
      {workoutConfirm && (
        <IncompleteModal setWorkoutConfirm={setWorkoutConfirm} />
      )}
      {loginConfirm && (
        <LoginConfirmModal setLoginConfirm={setLoginConfirm} />
      )}

      <div className="lg:grid lg:grid-cols-[25%_75%] sm:flex sm:flex-col h-[90vh]">
        <CalorieComponent
          caloriesBurned={caloriesBurned}
          toggleAddModal={toggleAddModal}
        />
        <ExerciseList
          exercises={exercises}
          toggleEditModal={toggleEditModal}
          deleteExercise={deleteExercise}
          toggleCompletedModal={toggleCompletedModal}
          toggleAddSetModal={toggleAddSetModal}
          completeExercise={completeExercise}
        />
      </div>
    </div>
  );
}

interface Exercises {
  exercise_id: number;
  exercise: string;
  muscle_group_id: number;
  muscle_group: string;
}

interface MuscleGroups {
  muscle_group_id: number;
  muscle_group: string;
}

interface GetDefaultExerciseList {
  exercises: Exercises[];
  muscle_groups: MuscleGroups[];
}

export async function getStaticProps(): Promise<any> {
  try {
    const { data } = await axios.get<GetDefaultExerciseList>(
      `${String(process.env.BACKEND_URL)}/exercise/default/list`
    );

    return {
      props: {
        default_exercises: data.exercises,
        muscle_groups: data.muscle_groups,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
