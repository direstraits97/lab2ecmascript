"use strict";

document.addEventListener("DOMContentLoaded", collectData);

async function collectData() {
  const url = "https://webbutveckling.miun.se/files/ramschema.json";

  try {
    const response = await fetch(url);
    const courses = await response.json();

    document.querySelector("#search").addEventListener("input", () => {
      displayCourses(courses);
    });
    document.querySelector("#coursecode").addEventListener("click", () => {
      displayCourses(courses, "coursecode");
    });
    document.querySelector("#coursename").addEventListener("click", () => {
      displayCourses(courses, "coursename");
    });
    document
      .querySelector("#courseprogression")
      .addEventListener("click", () => {
        displayCourses(courses, "courseprogression");
      });
    displayCourses(courses);
  } catch (error) {
    console.error("Fel: " + error);
  }
}

function displayCourses(courses, sortKey) {
  let coursesTableContent = document.querySelector("#coursestablecontent");
  let courseSearch = document.querySelector("#search").value;

  coursesTableContent.innerHTML = "";

  courses
    .filter(
      (course) =>
        course.coursename.toLowerCase().includes(courseSearch) ||
        course.code.toLowerCase().includes(courseSearch),
    )
    .sort((a, b) => {
      if (sortKey === "coursecode") {
        let x = a.code.toLowerCase();
        let y = b.code.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
      }
      if (sortKey === "coursename") {
        let x = a.coursename.toLowerCase();
        let y = b.coursename.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
      }
      if (sortKey === "courseprogression") {
        let x = a.progression.toLowerCase();
        let y = b.progression.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
      } else {
        return 0;
      }
    })
    .forEach((course) => {
      let courseCode = document.createElement("td");
      let courseName = document.createElement("td");
      let courseProgression = document.createElement("td");

      let courseCodeContent = document.createTextNode(course.code);
      let courseNameContent = document.createTextNode(course.coursename);
      let courseProgressionContent = document.createTextNode(
        course.progression,
      );

      courseCode.appendChild(courseCodeContent);
      courseName.appendChild(courseNameContent);
      courseProgression.appendChild(courseProgressionContent);

      let courseRow = document.createElement("tr");

      courseRow.appendChild(courseCode);
      courseRow.appendChild(courseName);
      courseRow.appendChild(courseProgression);

      coursesTableContent.appendChild(courseRow);
    });
}
