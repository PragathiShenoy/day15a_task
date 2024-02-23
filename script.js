async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Function to display fetched data and implement pagination
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Function to display fetched data and implement pagination
let firstButtonClicked = false;
let lastButtonClicked = false;

async function displayData(page = 1, pageSize = 6) {
  const dataContainer = document.getElementById("dataContainer");
  const paginationContainer = document.getElementById("pagination");

  // Fetch data from the provided link
  const data = await fetchData("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");

  if (data.length === 0) {
    dataContainer.innerHTML = "No data available.";
    paginationContainer.innerHTML = "";
    return;
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  const paginatedData = data.slice(startIndex, endIndex);

  let html = "<div class='table-container'><table><tr><th>ID</th><th>Name</th><th>Email</th></tr>";
  paginatedData.forEach((item, index) => {
    const id = startIndex + index + 1;
    html += `<tr><td>${id}</td><td>${item.name}</td><td>${item.email}</td></tr>`;
  });
  html += "</table></div>";

  dataContainer.innerHTML = html;

  // Create pagination buttons
  const totalPages = Math.ceil(data.length / pageSize);
  let paginationHTML = `<div class="pagination">`;

  // Previous button
  if (page === 1) {
    paginationHTML += `<button disabled>Previous</button>`;
  } else {
    paginationHTML += `<button onclick="displayData(${page - 1}, ${pageSize})">Previous</button>`;
  }

  // Numbered buttons
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button class="${i === page ? 'active' : ''}" onclick="handleButtonClick(${i}, ${pageSize})">${i}</button>`;
  }

  // Next button
  if (page === totalPages) {
    paginationHTML += `<button disabled>Next</button>`;
    lastButtonClicked ? alert("You're on the last page!") : lastButtonClicked = true;
  } else {
    paginationHTML += `<button onclick="displayData(${page + 1}, ${pageSize})">Next</button>`;
  }

  paginationHTML += `</div>`;
  paginationContainer.innerHTML = paginationHTML;

  if (page === 1) {
    firstButtonClicked ? alert("You're on the first page!") : firstButtonClicked = true;
  }
}

function handleButtonClick(page, pageSize) {
  displayData(page, pageSize);
}

// Initial display with default page and page size
displayData();
