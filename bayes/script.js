document.getElementById('predictionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Get user inputs
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;

    // Get other symptoms based on checkbox choice
    const otherSymptoms = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.value !== 'Fever') {
            otherSymptoms.push(checkbox.value);
        }
    });

    // Show all fieldsets
    const fieldsets = document.querySelectorAll('fieldset');
    fieldsets.forEach(function(fieldset) {
        fieldset.style.display = 'block';
    });

    // do Naive Bayes classification
    const probability = predictMalariaLikelihood(childFever, adultFever, otherSymptoms);
    const stage = predictMalariaStage(childFever, adultFever, otherSymptoms);

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<div>
        <p>Hello ${name},</p>
        <p>Based on your symptoms, there is a ${probability.toFixed(2)}% chance of having malaria.</p>
        <p>Your predicted stage of malaria is: ${stage}</p>
        <p>Age: ${age}</p>
        <p>Address: ${address}</p>
        <button id="printButton">Print</button>
    </div>`;

    // Add event listener to the print button
    document.getElementById('printButton').addEventListener('click', printResult);



});

function toggleFieldset() {
    var age = parseInt(document.getElementById("age").value); // Get the age value from the input field
    var adultFieldset = document.getElementById("adult");
    var childrenFieldset = document.getElementById("children");

    if (age < 19) {
        alert("You are to select only from children symptoms only")
        adultFieldset.disabled = true; // Disable the adult fieldset
        childrenFieldset.disabled = false; // Enable the children fieldset
    } else {
        alert("You are to select from Adult symptoms only")
        adultFieldset.disabled = false; // Enable the adult fieldset
        childrenFieldset.disabled = true; // Disable the children fieldset
    }
}


// Role to print the result
function printResult() {
    // Get the result div content
    const resultContent = document.getElementById('result').innerHTML;
    // Open a new window
    const printWindow = window.open('', '_blank');
    // Write the content to the new window
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Result</title>
            <!-- Bootstrap CSS -->
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
            <!-- Your custom CSS -->
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <div class="container">
                <div class="card mt-5">
                    <div class="card-body">
                        <center><h2 class="card-title text-center">MALARIA PREDICTION SYSTEM</h2>
                        <h4 class="card-title text-center">RESULT</h4><center>
                        <hr>
                        <div class="border border-success">
                            ${resultContent}
                        </div>
                    </div>
                </div>
            </div>
         <center>   <footer>
            <div class="text-center  text-white mt-3">
            <p>All rights reserved &copy; 2024 Malaria Prediction System || Bello Abdulbasit Onoruoiza</p>
        </div>
    </footer></center>
            <!-- Bootstrap JS -->
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            <!-- Your custom script -->
            <script src="script.js"></script>
        </body>
        </html>
    `);
    // Print the window
    printWindow.print();
}




















function predictMalariaLikelihood(childFever, adultFever, otherSymptoms) {
    let probability = 0;

    // If fever is present, increase probability
    if (childFever || adultFever) {
        probability += (childFever ? 60 : 50); // Adjust probability based on age group
    }

    // Adjust probability based on other symptoms

    if (otherSymptoms.includes('Cough')) {
        probability += (childFever ? 10 : 30); // 10% for children, 30% for adults
    }
    if (otherSymptoms.includes('Vomiting')) {
        probability += (childFever ? 35 : 15); // 30% for children, 15% for adults
    }
    if (otherSymptoms.includes('Diarrhea')) {
        probability += (childFever ? 5 : 1); // 5% for children, 1% for adults
    }
    if (otherSymptoms.includes('Convulsions')) {
        probability += (childFever ? 5 : 0); // 5% for children, 0% for adults
    }
    if (otherSymptoms.includes('Posturing')) {
        probability += (childFever ? 2 : 0); // 2% for children, 0% for adults
    }
    if (otherSymptoms.includes('Prostration/obtundation')) {
        probability += (childFever ? 20 : 0); // 20% for children, 0% for adults
    }
    if (otherSymptoms.includes('Jaundice')) {
        probability += (childFever ? 5 : 5); // 5% for both children and adults
    }
    if (otherSymptoms.includes('Hypoglycemia')) {
        probability += (childFever ? 10 : 5); // 10% for children, 5% for adults
    }
    if (otherSymptoms.includes('Metabolic acidosis')) {
        probability += (childFever ? 5 : 0); // 5% for children, 0% for adults
    }
    if (otherSymptoms.includes('Renal failure')) {
        probability += (childFever ? 2 : 0); // 2% for children, 0% for adults
    }
    if (otherSymptoms.includes('Severe anemia')) {
        probability += (childFever ? 15 : 10); // 15% for children, 10% for adults
    }
    if (otherSymptoms.includes('Hyperparasitemia')) {
        probability += (childFever ? 5 : 0); // 5% for children, 0% for adults
    }
    if (otherSymptoms.includes('Respiratory distress')) {
        probability += (childFever ? 5 : 0); // 5% for children, 0% for adults
    }
    if (otherSymptoms.includes('Neurological sequelae')) {
        probability += (childFever ? 3 : 0); // 3% for children, 0% for adults
    }
    if (otherSymptoms.includes('Bleeding/clotting disturbances')) {
        probability += (childFever ? 2 : 0); // 2% for children, 0% for adults
    }
    if (otherSymptoms.includes('Rare invasive bacterial infection')) {
        probability += (childFever ? 1 : 0); // 1% for children, 0% for adults
    }
    if (otherSymptoms.includes('Pulmonary edema')) {
        probability += (childFever ? 2 : 0); // 2% for children, 0% for adults
    }
    if (otherSymptoms.includes('Enlarged liver')) {
        probability += (childFever ? 5 : 10); // 5% for children, 10% for adults
    }
    if (otherSymptoms.includes('General feeling of being unwell')) {
        probability += (childFever ? 10 : 0); // 10% for children, 0% for adults
    }
    if (otherSymptoms.includes('Chills')) {
        probability += (childFever ? 0 : 20); // 0% for children, 20% for adults
    }
    if (otherSymptoms.includes('Sweats')) {
        probability += (childFever ? 0 : 15); // 0% for children, 15% for adults
    }
    if (otherSymptoms.includes('Headaches')) {
        probability += (childFever ? 0 : 40); // 0% for children, 40% for adults
    }
    if (otherSymptoms.includes('Nausea')) {
        probability += (childFever ? 0 : 25); // 0% for children, 25% for adults
    }
    if (otherSymptoms.includes('Body aches')) {
        probability += (childFever ? 0 : 30); // 0% for children, 30% for adults
    }
    if (otherSymptoms.includes('Weakness')) {
        probability += (childFever ? 3 : 35); // 3% for children, 35% for adults
    }
    if (otherSymptoms.includes('Enlarged spleen')) {
        probability += (childFever ? 0 : 10); // 0% for children, 10% for adults
    }
    if (otherSymptoms.includes('Mild jaundice')) {
        probability += (childFever ? 0 : 5); // 0% for children, 5% for adults
    }
    if (otherSymptoms.includes('Elevated temperatures')) {
        probability += (childFever ? 3 : 10); // 0% for children, 10% for adults
    }
    if (otherSymptoms.includes('Perspiration')) {
        probability += (childFever ? 0 : 15); // 0% for children, 15% for adults
    }
    if (otherSymptoms.includes('Increased respiratory rate')) {
        probability += (childFever ? 0 : 5); // 0% for children, 5% for adults
    }
    if (otherSymptoms.includes('Severe anemia')) {
        probability += (childFever ? 2 : 10); // 0% for children, 10% for adults
    }
    if (otherSymptoms.includes('Hypoglycemia')) {
        probability += (childFever ? 0 : 5); // 0% for children, 5% for adults
    }
    if (otherSymptoms.includes('Acidosis')) {
        probability += (childFever ? 0 : 5); // 0% for children, 5% for adults
    }
    if (otherSymptoms.includes('Renal impairment')) {
        probability += (childFever ? 0 : 5); // 0% for children, 5% for adults
    }
    if (otherSymptoms.includes('Hyperlactatemia')) {
        probability += (childFever ? 0 : 5); // 0% for children, 5% for adults
    }

    // Cap the probability to a greatest of 100%
    probability = Math.min(100, probability);

    return probability;
}

function predictMalariaStage(childFever, adultFever, otherSymptoms) {
    let stage = "Early";


    // If fever is present, change stage to Chronic
    if (childFever || adultFever) {
        stage = "Chronic";
    }

    // Check for symptoms associated with different stages of malaria

    if (otherSymptoms.includes("Convulsions") || otherSymptoms.includes("Posturing")) {
        stage = "Sporozoite stage";
    } else if (otherSymptoms.includes("Jaundice") || otherSymptoms.includes("Enlarged liver")) {
        stage = "Liver stage (exo-erythrocytic schizogony)";
    } else if (otherSymptoms.includes("Blood in urine") || otherSymptoms.includes("Anemia")) {
        stage = "Blood stage (erythrocytic schizogony)";
    } else if (otherSymptoms.includes("Low blood sugar") || otherSymptoms.includes("Renal failure")) {
        stage = "Gametocyte stage";
    } else if (otherSymptoms.includes("Severe anemia") || otherSymptoms.includes("Hypoglycemia")) {
        stage = "Mosquito stage (sporogonic cycle)";
    }

    return stage;
}

function logout() {
    // Redirect to the login page or do any other logout actions
    alert("You have succesfully log out!")
    window.location.href = "../index.html"; // Change the URL as needed
}

// Add event listener to the logout button
document.getElementById("logoutBtn").addEventListener("click", logout);