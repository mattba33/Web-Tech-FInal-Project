/* jshint esversion: 8 */

const Api_Key = "GGZqrflAcWgdpq0gA1M3U1m3zCXR674CVnRwPzmd";
const ApiForm = document.getElementById("api-form");
const CheckBoxes = ApiForm.querySelectorAll('input[type="checkbox"]');
const ApiResult = document.getElementById("api-result");

CheckBoxes.forEach(function(checkbox) 
{
    checkbox.addEventListener("change", function() 
    {
        if (checkbox.checked)
        {
            CheckBoxes.forEach(function(otherCheckbox)
            {

                if (otherCheckbox !== checkbox) 
                {
                    otherCheckbox.checked = false;
                }
            });
        }
    });
});

ApiForm.addEventListener("submit", (event) => 
{
    event.preventDefault();

    const StarChecked = document.querySelector('.star-checkbox').checked;
    const PlanetChecked = document.querySelector('.planet-checkbox').checked;

    if (!StarChecked && !PlanetChecked) return;

    if (StarChecked && PlanetChecked) 
    {
    console.warn("Select only one option");
    return;
    }

    if (StarChecked) 
    {
        const StarName = document.querySelector(".star-input").value;
        GetStars(StarName);
    } 
    else if (PlanetChecked) 
    {
        const PlanetName = document.querySelector(".planet-input").value;
        GetPlanets(PlanetName);
    }
});

async function GetStars(StarName)
{
    try
    {
        ApiResult.textContent = "Loading...";

        let response = await fetch(`https://api.api-ninjas.com/v1/stars?name=${StarName}`, {
            method: "GET",
            headers: {
                "X-Api-Key": Api_Key
            }
        });
        let data = await response.json();

        if (!response.ok) 
        {
            throw new Error(data.error || "Failed fetching star data");
        }

        if (!Array.isArray(data) || data.length === 0) 
        {
            throw new Error("Star not found");
        }
        ApiResult.textContent = `Name: ${data[0].name}
            Constellation: ${data[0].constellation}
            Right Ascension: ${data[0].right_ascension}
            Declination: ${data[0].declination}
            Apparent Magnitude: ${data[0].apparent_magnitude}
            Absolute Magnitude: ${data[0].absolute_magnitude}
            Distance in Lightyears: ${data[0].distance} 
            Spectral Class: ${data[0].spectral_class}`;

        console.log(data)
    }

    catch (error)
    {
        ApiResult.textContent = error.message;
        console.error("Error:", error);
    }
}

async function GetPlanets(PlanetName) 
{
    try
    {
        ApiResult.textContent = "Loading...";

        let response = await fetch(`https://api.api-ninjas.com/v1/planets?name=${PlanetName}`, {
            method: "GET",
            headers: {
                "X-Api-Key": Api_Key
            }
        });
        let data = await response.json();

        if (!response.ok) 
        {
            throw new Error(data.error || "Failed fetching planet data");
        }

        if (!Array.isArray(data) || data.length === 0) 
        {
            throw new Error("Planet not found");
        }

        ApiResult.textContent = `Name: ${data[0].name}
            Mass: ${data[0].mass}
            Radius: ${data[0].radius}
            Period: ${data[0].period}
            Semi Major Axis: ${data[0].semi_major_axis}
            `;

        console.log(data)
    }

    catch (error)
    {
        ApiResult.textContent = error.message;
        console.error("Error:", error);
    }
}