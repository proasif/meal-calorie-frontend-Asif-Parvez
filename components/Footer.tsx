export default function Footer() {
  return (
    <footer className="p-4 text-center text-sm text-white-500 dark:text-white-400 bg-gray-50 dark:bg-gray-900/40">
      © {new Date().getFullYear()} Meal Calorie App
    </footer>
  );
}
