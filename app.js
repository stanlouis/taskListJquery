$(function() {
  // Define UI Vars
  const $form = $("#task-form");
  const $taskList = $(".collection");
  const $clearBtn = $(".clear-tasks");
  const $filter = $("#filter");
  const $taskInput = $("#task");

  // Get Tasks from local storage
  (function getLocalStorageTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(task => {
      addTaskToDom(task);
    });
  })();

  // Load all event listeners
  loadEventListeners();

  function loadEventListeners() {
    // DOM Load event
    $form.submit(getTaskInput);
    $taskList.click("i", removeTask);
    $clearBtn.click(clearTasks);
    $filter.keyup(filterTasks);
  }

  // Get Task Input
  function getTaskInput(e) {
    const $formInput = $taskInput.val();
    if (!($formInput && $formInput.trim().length)) {
      M.toast({html: "Task must not be blank"});
      e.preventDefault();
    } else {
      addTaskToDom($formInput);

      // Store task in Local Storage
      storeTaskInLocalStorage($formInput);

      // Clear input
      $taskInput.val("");
    }
  }

  // Store Task
  function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTaskToDom(item) {
    // Create li element
    const $li = $("<li />");
    // Add class and textNode
    $li.addClass("collection-item").text(item);
    // Crete link
    const $link = $("<a></a>");
    // Add class and icon
    $link
      .addClass("delete-item secondary-content")
      .html('<i class="fas fa-times"></i>');
    // Append link to li
    $li.append($link);
    // Append li to ul
    $taskList.append($li);
  }

  // Remove Task
  function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
      if (confirm("Are You Sure?")) {
        let taskToDelete = e.target.closest("li");
        taskToDelete.remove();
        // Remove from local storage
        removeTaskFromLocalStorage(taskToDelete);
      }
    }
  }

  // Remove from local storage
  function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task, index) => {
      if (taskItem.textContent === task) {
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  // Clear Tasks
  function clearTasks() {
    $taskList.empty();

    clearTasksFromLocalStorage();
  }

  // Clear Tasks from local storage
  function clearTasksFromLocalStorage() {
    localStorage.clear();
  }
  // FilterTasks
  function filterTasks() {
    const value = $(this)
      .val()
      .toLowerCase();
    $(".collection-item").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  }
});
