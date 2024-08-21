document.addEventListener('DOMContentLoaded', function () {
  const contentHeading = document.getElementById('content-heading');

  function displayContent(content) {
    contentHeading.textContent = content;
  }

  function handleDashboardClick(e) {
    e.preventDefault();
    displayContent('Welcome to Admin Dashboard');
    // Additional logic specific to the dashboard section
  }

  function handleCustomerClick(e) {
    e.preventDefault();
    displayContent('Customer Information');
    // Additional logic specific to the customer section

      fetch('/users')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    let table = document.getElementById('customer-table');
    let tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    data.forEach(user => {
      let row = tbody.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      cell1.innerHTML = user.name;
      cell2.innerHTML = user.email;
    });
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

  }

  function handleCleanersClick(e) {
    e.preventDefault();
    displayContent('Cleaners Information');
    // Additional logic specific to the cleaners section
    // For example, make an AJAX request to fetch or manipulate data on the server side
    // Replace '/admin/cleaners' with your actual server route
    // Example: fetch('/admin/cleaners').then(response => response.json()).then(data => console.log(data));
  }

  function handleServicesClick(e) {
    e.preventDefault();
    displayContent('Services Information');
    // Additional logic specific to the services section
    // For example, make an AJAX request to fetch or manipulate data on the server side
    // Replace '/admin/services' with your actual server route
    // Example: fetch('/admin/services').then(response => response.json()).then(data => console.log(data));
  }

  // Attach event listeners to the links
  document.getElementById('dashboard-link').addEventListener('click', handleDashboardClick);
  document.getElementById('customer-link').addEventListener('click', handleCustomerClick);
  document.getElementById('cleaners-link').addEventListener('click', handleCleanersClick);
  document.getElementById('services-link').addEventListener('click', handleServicesClick);
});