// Show more rows in the taken courses table
function toggleCourseVisibility (elem) {
  // find the courses
  const courses = elem.parentNode.getElementsByClassName('course')
  if (courses == null) {
    return
  }

  // toggle hidden-course class from the third elements
  for (const course of courses) {
    if (course.classList.contains('hidden-course') || course.classList.contains('toggled-hidden-course')) {
      course.classList.toggle('hidden-course')
      course.classList.add('toggled-hidden-course')
    }
  }

  // toggle the buttons visibility
  const buttonsToToggle = elem.parentNode.getElementsByClassName('show-more-btn')
  for (const buttonToToggle of buttonsToToggle) {
    buttonToToggle.classList.toggle('hidden')
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const els = Array.from(document.getElementsByClassName('btn'));

  els.filter((el) => el != null && (el.id === 'show-more-btn' || el.id === 'show-less-btn')).forEach((el) =>
    el.addEventListener('click', ({ target }) =>
      toggleCourseVisibility(target)))
})
