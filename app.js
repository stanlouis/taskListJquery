$ (function () {
  // Define UI Vars
  const $form = $ ('#task-form');
  const $taskList = $ ('.collection');
  const $clearBtn = $ ('.clear-tasks');
  const $filter = $ ('#filter');
  const $taskInput = $ ('#task');

  // Load all event listeners
  loadEventListeners();

  function loadEventListeners () {
    $form.submit (addTask);
  }

  function addTask (e) {
    if ($taskInput.val () === '') {
      alert ('Add a task');
    }
    // Create li element
    const $li = $ ('<li />');
    // Add class and textNode
    $li.addClass ('collection-item').text ($taskInput.val ());
    // Crete link
    const $link = $ ('<a></a>');
    // Add class and icon
    $link
      .addClass ('delete-item secondary-content')
      .html ('<i class="fas fa-times"></i>');
    // Append link to li
    $li.append ($link);
    // Append li to ul
    $taskList.append ($li);
    // Clear text input
    $taskInput.val ('');
    e.preventDefault ();
  }
});
