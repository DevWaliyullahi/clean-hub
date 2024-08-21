function logout(event) {
  event.preventDefault();
  document.getElementById("logoutForm").submit();
}
async function fetchCleaners() {
  try {
    const response = await fetch("/cleaners");
    const data = await response.json();

    if (data.Cleaner && data.Cleaner.length > 0) {
      const cleanersList = document.getElementById("cleanersList");

      data.Cleaner.forEach((cleaner) => {
        console.log("Cleaner:", cleaner);
        const hireButton = document.createElement("button");
        hireButton.textContent = "Hire";
        hireButton.addEventListener("click", () => showHireModal(cleaner.id));

        const cleanerDiv = document.createElement("div");
        cleanerDiv.className = "cleanerCard";
        cleanerDiv.textContent = cleaner.fullname;
        cleanerDiv.appendChild(hireButton);

        cleanersList.appendChild(cleanerDiv);
      });
    } else {
      console.log("No cleaners found");
    }
  } catch (error) {
    console.error("Error fetching cleaners", error);
  }
}

function showHireModal(cleanerId) {
  // Set the cleanerId in the hidden input
  document.getElementById("cleanerId").value = cleanerId;

  // Display the modal
  document.getElementById("hireCleanerModal").style.display = "block";
}

function closeModal() {
  // Hide the modal
  document.getElementById("hireCleanerModal").style.display = "none";
}

document
  .getElementById("hireCleanerForm")
  .addEventListener("submit", hireCleaner);

async function hireCleaner(event) {
  event.preventDefault();

  try {
    const serviceName = document.getElementById("serviceName").value;
    const description = document.getElementById("description").value;
    const servicePrice = document.getElementById("servicePrice").value;
    const date = document.getElementById("date").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const cleanerId = document.getElementById("cleanerId").value;

    const response = await fetch("/services/hire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        address,
        cleanerId,
        serviceName,
        description,
        servicePrice,
        date,
      }),
    });

    if (response.ok) {
      console.log("Hiring request sent successfully");
    } else {
      console.error("Failed to send hiring request");
    }

    // Hide the modal after submission
    closeModal();
  } catch (error) {
    console.error("Error hiring cleaner", error);
  }
}

fetchCleaners();

// Function to disable or hide the form elements
function disableForm(form) {
  const formElements = form.elements;
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = true;
  }
  form.style.display = "none";
  // form.remove();
}

// Function to create a rating and review form
function createRatingReviewForm(service) {
  const form = document.createElement("form");
  form.id = `rating-form-${service.id}`; // Add a unique ID for each form

  const ratingLabel = document.createElement("label");
  ratingLabel.textContent = "Rating:";
  form.appendChild(ratingLabel);

  const ratingInput = document.createElement("input");
  ratingInput.type = "number";
  ratingInput.min = 1;
  ratingInput.max = 5;
  ratingInput.value = service.serviceRating;
  form.appendChild(ratingInput);

  const reviewLabel = document.createElement("label");
  reviewLabel.textContent = "Review:";
  form.appendChild(reviewLabel);

  const reviewInput = document.createElement("input");
  reviewInput.type = "text";
  reviewInput.name = "review";
  reviewInput.value = service.serviceReview;
  form.appendChild(reviewInput);

  const submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.textContent = "Submit Rating and Review";
  submitButton.addEventListener("click", async () => {
    await submitRatingReview(service.id, ratingInput.value, reviewInput.value);
    // After submission, disable or hide the form
    // disableForm(form);
  });
  form.appendChild(submitButton);

  return form;
}

// Function to submit the rating and review
async function submitRatingReview(serviceId, rating, review) {
  console.log(`Service ID: ${serviceId}`);
  console.log(`Rating: ${rating}`);
  console.log(`Review: ${review}`);
  try {
    const response = await fetch(`/services/rate-review/${serviceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({
        rating,
        review,
      }),
    });

    if (response.ok) {
      console.log(
        `Rating and review for Service ${serviceId} submitted successfully`
      );

      // disableForm(form);
    } else {
      const errorData = await response.json();
      console.error(
        `Failed to submit rating and review for Service ${serviceId}:`,
        errorData
      );
    }
  } catch (error) {
    console.error(
      `Error submitting rating and review for Service ${serviceId}`,
      error
    );
  }
}

async function openRatingReviewForm() {
  try {
    const response = await fetch("/services/history");
    const data = await response.json();

    if (response.ok) {
      console.log("Service History:", data);

      const serviceHistoryDiv = document.getElementById("serviceHistory");

      // Clear previous content
      serviceHistoryDiv.innerHTML = "";

      data.services.forEach((service) => {
        console.log("This is,", service);
        const serviceDiv = document.createElement("div");
        serviceDiv.className = "serviceCard";
        serviceDiv.textContent = `Service ID: ${service.id}, Status: ${service.status}`;
        serviceDiv.textContent += `Service Name: ${service.serviceName}, Description: ${service.description}, Price: ${service.servicePrice}, Address: ${service.address}, Date: ${service.date}`;

        if (service.status === "Accepted") {
          const ratingLabel = document.createElement("label");
          ratingLabel.textContent = "Rating (1-5 stars): ";
          const ratingInput = document.createElement("input");
          ratingInput.type = "number";
          ratingInput.min = "1";
          ratingInput.max = "5";
          ratingInput.name = "rating";

          const reviewLabel = document.createElement("label");
          reviewLabel.textContent = "Review: ";
          const reviewInput = document.createElement("input");
          reviewInput.type = "text";
          reviewInput.name = "review";

          const submitButton = document.createElement("button");
          submitButton.textContent = "Submit Rating and Review";
          submitButton.addEventListener("click", () =>
            submitRatingReview(service.id, ratingInput.value, reviewInput.value)
          );

          serviceDiv.appendChild(ratingLabel);
          serviceDiv.appendChild(ratingInput);
          serviceDiv.appendChild(reviewLabel);
          serviceDiv.appendChild(reviewInput);
          serviceDiv.appendChild(submitButton);
        }

        serviceHistoryDiv.appendChild(serviceDiv);
      });
    } else {
      console.error("Failed to fetch service history");
    }
  } catch (error) {
    console.error("Error fetching service history", error);
  }
}

// Function to fetch user information
async function fetchUserInfo() {
  try {
    const response = await fetch("/users/info");
    const data = await response.json();

    if (response.ok) {
      console.log("User Information:", data);
    } else {
      console.error("Failed to fetch user information");
    }
  } catch (error) {
    console.error("Error fetching user information", error);
  }
}

async function fetchServiceHistory() {
  try {
    const response = await fetch("/services/history");
    const data = await response.json();

    if (response.ok) {
      console.log("Service History:", data);

      const serviceHistoryDiv = document.getElementById("serviceHistory");

      // Clear previous content
      serviceHistoryDiv.innerHTML = "";

      if (data.services.length === 0) {
        // If no services, display a message
        serviceHistoryDiv.textContent = "No service history available.";
      } else {
        // Create a table element
        const table = document.createElement("table");
        table.className = "serviceTable";

        // Create table header
        const headerRow = table.insertRow(0);
        const headers = [
          "Service ID",
          "Service Name",
          "Status",
          "Description",
          "Price",
          "Address",
          "Date",
          "Cleaner",
          "Rating",
          "Review",
        ];
        headers.forEach((header) => {
          const th = document.createElement("th");
          th.textContent = header;
          headerRow.appendChild(th);
        });

        // Create table rows for each service
        data.services.forEach((service) => {
          const row = table.insertRow();
          row.className = "serviceRow";

          // Add data to the row
          row.insertCell().textContent = service.id;
          row.insertCell().textContent = service.serviceName;
          row.insertCell().textContent = service.status;
          row.insertCell().textContent = service.description;
          row.insertCell().textContent = service.servicePrice;
          row.insertCell().textContent = service.address;
          row.insertCell().textContent = service.date;
          row.insertCell().textContent = service.cleanerName;
          row.insertCell().textContent = service.serviceRating;
          row.insertCell().textContent = service.serviceReview;

          // Append the row to the table
          table.appendChild(row);
        });

        // Append the table to the serviceHistoryDiv
        serviceHistoryDiv.appendChild(table);
      }
    } else {
      console.error("Failed to fetch service history");
    }
  } catch (error) {
    console.error("Error fetching service history", error);
  }
}
