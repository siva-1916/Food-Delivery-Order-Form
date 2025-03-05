function saveToFile(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let address = document.getElementById("address").value.trim();
    let meal = document.getElementById("meal").value.trim();
    let deliveryTime = document.getElementById("delivery_time").value;
    let fileInput = document.getElementById("instructions");

    if (!name || !address || !meal) {
        alert("Please fill out all required fields.");
        return false;
    }

    // Function to generate and download the file
    function generateFile(specialInstructions) {
        let content = `Name: ${name}\nAddress: ${address}\nMeal: ${meal}\nPreferred Delivery Time: ${deliveryTime}\nSpecial Instructions:\n${specialInstructions}`;
        let blob = new Blob([content], { type: "text/plain" });
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "order_details.txt";
        a.click();
        alert("Order submitted successfully!");
    }

    // Check if a file is uploaded
    if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        let reader = new FileReader();

        reader.onload = function (e) {
            generateFile(e.target.result);
        };

        reader.readAsText(file);
    } else {
        generateFile("No special instructions provided.");
    }
}