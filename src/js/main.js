"use strict";

document.addEventListener("DOMContentLoaded", collectData);

async function collectData() {
  const url = "https://webbutveckling.miun.se/files/ramschema.json";

  try {
    const response = await fetch(url);
    const courses = await response.json();

    displayCourses(courses);
  } catch (error) {
    console.error("Fel: " + error);
  }
}

function displayCourses(courses) {
  let coursesTableEl = document.querySelector("#coursestable");

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

    coursesTableEl.appendChild(courseRow);
  });
}
