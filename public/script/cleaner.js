function logout(event) {
  event.preventDefault();
  document.getElementById("logoutForm").submit();
}
async function fetchCleanerServices() {
  try {
    const response = await fetch("/cleaners/services");
    console.log("Response:", response);
    const data = await response.json();
    console.log("Data:", data); // Log the data to the console

    if (data.services && data.services.length > 0) {
      const servicesList = document.getElementById("servicesList");
      servicesList.innerHTML = ""; // Clear previous service cards

      data.services.forEach((service) => {
        const serviceDiv = document.createElement("div");
        serviceDiv.className = "serviceCard";

        const userInfo = document.createElement("div");
        userInfo.textContent = `Name Of Client: ${service.name}`;
        serviceDiv.appendChild(userInfo);

        const serviceName = document.createElement("div");
        serviceName.textContent = `Service: ${service.serviceName}`;
        serviceDiv.appendChild(serviceName);

        const description = document.createElement("div");
        description.textContent = `Description: ${service.description}`;
        serviceDiv.appendChild(description);

        const price = document.createElement("div");
        price.textContent = `Price: ${service.servicePrice}`;
        serviceDiv.appendChild(price);

        // const status = document.createElement("div");
        // status.textContent = `Status: ${service.status}`;
        // serviceDiv.appendChild(status);

        const address = document.createElement("div");
        address.textContent = `Address: ${service.address}`;
        serviceDiv.appendChild(address);

        const date = document.createElement("div");
        date.textContent = `Date/Time: ${service.date}`;
        serviceDiv.appendChild(date);

        const statusDiv = document.createElement("div");
        statusDiv.textContent = `Status: ${service.status}`;
        serviceDiv.appendChild(statusDiv);


        switch (service.status.toLowerCase()) {
          case "pending":
            statusDiv.style.backgroundColor = "yellow";
            break;
          case "accepted":
            statusDiv.style.backgroundColor = "green";
            break;
          case "rejected":
            statusDiv.style.backgroundColor = "red";
            break;
          default:
            break;
        }

        if (service.status.toLowerCase() === "pending") {
          const acceptButton = document.createElement("button");
          acceptButton.textContent = "Accept";
          acceptButton.addEventListener("click", () =>
            acceptService(service.id)
          );
          acceptButton.style.backgroundColor = "green";
          serviceDiv.appendChild(acceptButton);

          const rejectButton = document.createElement("button");
          rejectButton.textContent = "Reject";
          rejectButton.addEventListener("click", () =>
            rejectService(service.id)
          );
          rejectButton.style.backgroundColor = "red";
          serviceDiv.appendChild(rejectButton);
        }

        servicesList.appendChild(serviceDiv);
      });
    } else {
      console.log("No services found");
    }
  } catch (error) {
    console.error("Error fetching services", error);
  }
}

async function acceptService(serviceId) {
  await updateServiceStatus(serviceId, "accept");
  fetchCleanerServices(); // Refresh the services list
}

async function rejectService(serviceId) {
  await updateServiceStatus(serviceId, "reject");
  fetchCleanerServices(); // Refresh the services list
}

async function updateServiceStatus(serviceId, status) {
  try {
    const response = await fetch(`/services/${status}/${serviceId}`, {
      method: "PUT",
    });

    if (!response.ok) {
      console.error(`Failed to update service ${serviceId} status`);
    }
  } catch (error) {
    console.error("Error updating service status", error);
  }
}

fetchCleanerServices();



