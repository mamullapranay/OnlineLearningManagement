import React, { useState } from "react";

function Popup() {
  const [courseCode, setCourseCode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (courseCode.trim() !== "") {
      console.log(`Course Code: ${courseCode}`);
      // Add the logic to join the course using the course code
    } else {
      alert("Please enter a valid course code.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="CourseCode">Enter the Course code:</label><br/><br/>
      <input
        type="text"
        name="courseCode"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      /><br/><br/>
      <button type="submit">Join Course</button>
    </form>
  );
}

export default Popup;
