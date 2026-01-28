"use strict";

document.addEventListener("DOMContentLoaded", collectData);

async function collectData() {
  const url = "https://webbutveckling.miun.se/files/ramschema.json";

  try {
    const response = await fetch(url);
    const courses = await response.json();

    document.querySelector("#search").addEventListener("input", (e) => {
      let courseSearch = document.querySelector("#search").value;
      console.log(courseSearch, courses);
      let filteredCourses = courses.filter(
        (course) =>
          course.coursename.toLowerCase().includes(courseSearch) ||
          course.code.toLowerCase().includes(courseSearch),
      );
      displayCourses(filteredCourses);
    });
    displayCourses(courses);
  } catch (error) {
    console.error("Fel: " + error);
  }
}

function displayCourses(courses) {
  let coursesTableContent = document.querySelector("#coursestablecontent");
  coursesTableContent.innerHTML = "";

  courses.forEach((course) => {
    let courseCode = document.createElement("td");
    let courseName = document.createElement("td");
    let courseProgression = document.createElement("td");

    let courseCodeContent = document.createTextNode(course.code);
    let courseNameContent = document.createTextNode(course.coursename);
    let courseProgressionContent = document.createTextNode(course.progression);

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
