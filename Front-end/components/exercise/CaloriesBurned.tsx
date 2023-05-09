export default function CaloriesBurned({ caloriesBurned }: any) {
  return (
    <div className="m-3 flex h-4.5/6 flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-600 text-center shadow-inner">
      <p className="text-sm">Total Calories Burned (Estimate)</p>
      <b className="text-4xl">{caloriesBurned}</b>
    </div>
  );
}
