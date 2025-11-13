import Screen from "@/components/screen";
import CourseList from "@/features/courses/components/CourseList";

const CoursesScreen = () => {
  return (
    <Screen className="px-5 md:px-0">
      <CourseList />
    </Screen>
  );
};

export default CoursesScreen;
