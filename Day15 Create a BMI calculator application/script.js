document.addEventListener('DOMContentLoaded', () => {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const calculateBtn = document.getElementById('calculateBtn');
    const bmiResult = document.getElementById('bmiResult');
    const statusText = document.getElementById('status');

    calculateBtn.addEventListener('click', calculateBMI);

    function calculateBMI() {
        // 1. Get and clean inputs
        const heightCm = parseFloat(heightInput.value);
        const weightKg = parseFloat(weightInput.value);

        // 2. Input Validation
        if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
            alert('Please enter valid, positive numbers for both height and weight.');
            bmiResult.textContent = '0.0';
            statusText.textContent = '';
            statusText.className = '';
            return;
        }

        // 3. BMI Formula (BMI = kg / m^2)
        // Convert height from cm to meters (m = cm / 100)
        const heightMeters = heightCm / 100;
        
        // Calculate BMI
        const bmi = weightKg / (heightMeters * heightMeters);

        // 4. Display Result
        // Round to one decimal place
        const formattedBMI = bmi.toFixed(1);
        bmiResult.textContent = formattedBMI;

        // 5. Determine and Display Status/Classification
        let status = '';
        let statusClass = '';

        if (bmi < 18.5) {
            status = 'Underweight';
            statusClass = 'underweight';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            status = 'Healthy Weight';
            statusClass = 'healthy';
        } else if (bmi >= 25.0 && bmi <= 29.9) {
            status = 'Overweight';
            statusClass = 'overweight';
        } else { // bmi >= 30.0
            status = 'Obesity';
            statusClass = 'obesity';
        }

        statusText.textContent = `Classification: ${status}`;
        // Apply CSS class for color styling
        statusText.className = statusClass;
    }
});