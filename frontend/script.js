const academicStructure = {
    be: {
        cse_general: {
            2026: ["CGA", "CGB"],
            2027: ["CGC", "CGD"],
            2028: ["CGE", "CGF"],
            2029: ["CGG", "CGH"]
        },
        cse_ait: {
            2026: ["CA1", "CA2"],
            2027: ["CA3", "CA4"],
            2028: ["CA5", "CA6"],
            2029: ["CA7", "CA8"]
        },
        ece: {
            2026: ["ECA", "ECB"],
            2027: ["ECC", "ECD"],
            2028: ["ECE", "ECF"],
            2029: ["ECG", "ECH"]
        }
    },
    mba: {
        marketing: {
            2026: ["MK1", "MK2"],
            2027: ["MK3", "MK4"],
            2028: ["MK5", "MK6"],
            2029: ["MK7", "MK8"]
        },
        finance: {
            2026: ["FN1", "FN2"],
            2027: ["FN3", "FN4"],
            2028: ["FN5", "FN6"],
            2029: ["FN7", "FN8"]
        },
        hr: {
            2026: ["HR1", "HR2"],
            2027: ["HR3", "HR4"],
            2028: ["HR5", "HR6"],
            2029: ["HR7", "HR8"]
        }
    },
    bba: {
        international_business: {
            2026: ["IB1", "IB2"],
            2027: ["IB3", "IB4"],
            2028: ["IB5", "IB6"],
            2029: ["IB7", "IB8"]
        },
        entrepreneurship: {
            2026: ["EN1", "EN2"],
            2027: ["EN3", "EN4"],
            2028: ["EN5", "EN6"],
            2029: ["EN7", "EN8"]
        }
    }
};

document.getElementById("course").addEventListener("change", updateDepartments);
document.getElementById("department").addEventListener("change", updateSections);
document.getElementById("batch").addEventListener("change", updateSections);
// document.getElementById("program-lan").addEventListener("append", progamminglan());

function updateDepartments() {
    const course = document.getElementById("course").value;
    const departmentSelect = document.getElementById("department");

    departmentSelect.innerHTML = "<option value=''>Select Department</option>";

    if (academicStructure[course]) {
        Object.keys(academicStructure[course]).forEach(dept => {
            const opt = document.createElement("option");
            opt.value = dept;
            opt.textContent = dept.replaceAll('_', ' ').toUpperCase(); // optional formatting
            departmentSelect.appendChild(opt);
        });
    }
}

function updateSections(){
    const course = document.getElementById("course").value;
    const batch = document.getElementById("batch").value;
    const department = document.getElementById("department").value;
    const sectionSelect = document.getElementById("section");

    sectionSelect.innerHTML = "<option value=''>Select Section</option>";

    if (
        academicStructure[course] &&
        academicStructure[course][department] &&
        academicStructure[course][department][batch]
    ) {
        academicStructure[course][department][batch].forEach(sec => {
            const opt = document.createElement("option");
            opt.value = sec;
            opt.textContent = sec;
            sectionSelect.appendChild(opt);
        });
    }
}

document.getElementById("course").addEventListener("change", programmingLan);

function programmingLan() {
    const course = document.getElementById("course").value;
    const progInput = document.getElementById("program-lan");
    const programmingLangInput = document.getElementById("program-lan");

    if (course !== "be") {
        programmingLangInput.value = "NA";
        progInput.setAttribute("readonly", true);
        progInput.style.backgroundColor = "#f0f0f0";
    } else {
        programmingLangInput.value = ""; 
        progInput.removeAttribute("readonly");
        progInput.style.backgroundColor = "white";
    }
}

// Form validation and submission
document.getElementById("student-form").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = "#ff4444";
            field.style.backgroundColor = "#fff5f5";
        } else {
            field.style.borderColor = "#4CAF50";
            field.style.backgroundColor = "white";
        }
    });
    
    if (isValid) {
        try {
            // Create FormData object to handle file uploads
            const formData = new FormData(this);
            
            // Submit to backend server
            const response = await fetch('http://localhost:3000/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert("Form submitted successfully! Data saved to database.");
                this.reset(); // Clear form
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Error submitting form. Please make sure the server is running on http://localhost:3000");
        }
    } else {
        alert("Please fill in all required fields marked in red.");
    }
});

function validateMobileNumber(input) {
    input.addEventListener("input", function() {
        const value = this.value.replace(/\D/g, ''); // Remove non-digits
        this.value = value;
        
        if (value.length === 10) {
            this.style.borderColor = "#4CAF50";
        } else if (value.length > 0) {
            this.style.borderColor = "#ff4444";
        } else {
            this.style.borderColor = "#ccc";
        }
    });
}

validateMobileNumber(document.getElementById("student-no"));