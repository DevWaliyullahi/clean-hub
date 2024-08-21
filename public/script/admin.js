// Make a request to your backend to get all users
fetch("/admin/", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    const userListContainer = document.getElementById("userList");

    // Check if users are available
    if (data.User && data.User.length > 0) {
      // Create a table element
      const table = document.createElement("table");

      // Create the table header
      const headerRow = table.insertRow(0);
      Object.keys(data.User[0]).forEach((property) => {
        const th = document.createElement("th");
        th.innerHTML = property;
        headerRow.appendChild(th);
      });
      // Add an extra header cell for the delete column
      headerRow.insertCell().outerHTML = "<th>Action</th>";

      // Loop through each user and create table rows
      data.User.forEach((user) => {
        // Exclude users with isAdmin set to true
        if (!user.isAdmin) {
          const row = table.insertRow(-1);
          Object.values(user).forEach((value) => {
            const cell = row.insertCell(-1);
            cell.innerHTML = value;
          });
          // Add a delete button for each user
          const deleteCell = row.insertCell(-1);
          deleteCell.innerHTML = `<button onclick="deleteUser('${user.id}')">Delete</button>`;
        }
      });

      userListContainer.appendChild(table);
    } else {
      userListContainer.innerHTML = "<p>No users found.</p>";
    }
  })
  .catch((error) => console.error("Error fetching users:", error));

// Function to delete a user
function deleteUser(userId) {
  // Make a request to delete the user by ID
  fetch(`/admin/${userId}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      // Refresh the user list after deletion
      location.reload();
    })
    .catch((error) => console.error("Error deleting user:", error));
}

// Cleaners
// Make a request to your backend to get all cleaners
fetch("/admin/cleaners", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    const cleanerListContainer = document.getElementById("cleanerList");

    // Check if cleaners are available
    if (data.Cleaner && data.Cleaner.length > 0) {
      // Create a table element for cleaners
      const cleanerTable = document.createElement("table");

      // Create the table header for cleaners
      const cleanerHeaderRow = cleanerTable.insertRow(0);
      Object.keys(data.Cleaner[0]).forEach((property) => {
        const th = document.createElement("th");
        th.innerHTML = property;
        cleanerHeaderRow.appendChild(th);
      });
      // Add an extra header cell for the delete column
      cleanerHeaderRow.insertCell().outerHTML = "<th>Action</th>";

      // Loop through each cleaner and create table rows
      data.Cleaner.forEach((cleaner) => {
        // Exclude cleaners based on the 'isFeatured' property
        if (!cleaner.isFeatured) {
          const row = cleanerTable.insertRow(-1);
          Object.values(cleaner).forEach((value) => {
            const cell = row.insertCell(-1);
            cell.innerHTML = value;
          });
          // Add a delete button for each cleaner
          const deleteCell = row.insertCell(-1);
          deleteCell.innerHTML = `<button onclick="deleteCleaner('${cleaner.id}')">Delete</button>`;
        }
      });

      cleanerListContainer.appendChild(cleanerTable);
    } else {
      cleanerListContainer.innerHTML = "<p>No cleaners found.</p>";
    }
  })
  .catch((error) => console.error("Error fetching cleaners:", error));

// Function to delete a cleaner
function deleteCleaner(cleanerId) {
  // Make a request to delete the cleaner by ID
  fetch(`/admin/cleaners/${cleanerId}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      // Refresh the cleaner list after deletion
      location.reload();
    })
    .catch((error) => console.error("Error deleting cleaner:", error));
}

// Services
// Make a request to your backend to get all services
// Fetch services from the backend
fetch("/admin/services", { method: "GET" })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch services. Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const serviceListContainer = document.getElementById("serviceList");

    // Check if services are available
    if (data.services && data.services.length > 0) {
      // Create a table element for services
      const serviceTable = document.createElement("table");

      // Create the table header for services
      const serviceHeaderRow = serviceTable.insertRow(0);
      Object.keys(data.services[0]).forEach((property) => {
        const th = document.createElement("th");
        th.innerHTML = property;
        serviceHeaderRow.appendChild(th);
      });
      // Add an extra header cell for the delete column
      serviceHeaderRow.insertCell().outerHTML = "<th>Action</th>";

      // Loop through each service and create table rows
      data.services.forEach((service) => {
        const row = serviceTable.insertRow(-1);
        Object.values(service).forEach((value) => {
          const cell = row.insertCell(-1);
          cell.innerHTML = value;
        });
        // Add a delete button for each service
        const deleteCell = row.insertCell(-1);
        deleteCell.innerHTML = `<button onclick="deleteService('${service.id}')">Delete</button>`;
      });

      serviceListContainer.appendChild(serviceTable);
    } else {
      serviceListContainer.innerHTML = "<p>No services found.</p>";
    }
  })
  .catch((error) => {
    console.error("Error fetching services:", error);
    const serviceListContainer = document.getElementById("serviceList");
    serviceListContainer.innerHTML =
      "<p>Error fetching services. Please try again later.</p>";
  });

// Function to delete a service
function deleteService(serviceId) {
  // Make a request to delete the service by ID
  fetch(`/admin/services/${serviceId}`, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete service. Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Refresh the service list after deletion
      location.reload();
    })
    .catch((error) => console.error("Error deleting service:", error));
}
