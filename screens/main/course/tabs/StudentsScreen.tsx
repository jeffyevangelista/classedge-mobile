import Screen from "@/components/screen";
import StudentList from "@/features/students/components/StudentList";
import React from "react";

const StudentsScreen = () => {
  return (
    <Screen className="px-5">
      <StudentList />
    </Screen>
  );
};

export default StudentsScreen;
