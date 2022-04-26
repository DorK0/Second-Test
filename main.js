$(function () {
    $("#worldWide").on("click", () => {
        $.ajax({
            url: "https://restcountries.com/v3.1/all",
            success: countries => { displayContriesCards(countries); regionCheck(countries); calcStats(countries); }
        })
    });

    $("#letsGo").on("click", () => {
        const name = $("input[type='search']").val();
        if(!isNaN(name)){
        throw new Error("You can only insert STRING!");
    }
        else{
        $.ajax({
            url: `https://restcountries.com/v3.1/name/${name}`,
            success: countries => { displayContriesCards(countries); regionCheck(countries); calcStats(countries); }
        })
        }
    });

    function displayContriesCards(countries) {

        $("#mainDiv").empty();
        for (const country of countries) {
            $("#mainDiv").append(`
            <div class="col">
            <div class="card shadow-sm">
              <img class="bd-placeholder-img card-img-top" width="419px" height="225px" src="${country.flags.png}" alt=""/>
              <div class="card-body">
              <h2>${country.name.common}</h2>
                <p class="card-text"><strong>population:</strong> ${country.population}</p>
                <p class="card-text"><strong>Region:</strong> ${country.region}</p>
                <div class="d-flex justify-content-between align-items-center">
                </div>
              </div>
            </div>
          </div>`)

        }

    }

    function calcStats(countries) {
        let totalCountriesPopulation = 0;
        for (const country of countries) {
            totalCountriesPopulation += country.population;
        }
        let selectedCountreisPopulationAvg = totalCountriesPopulation / countries.length;
        displayStats(countries.length, totalCountriesPopulation, selectedCountreisPopulationAvg)
    }



    function displayStats(totalContries, totalCountriesPopulation, selectedCountreisPopulationAvg) {
        $("#statisticsDiv").empty();
        $("#statisticsDiv").append(`<strong>Total Countries:</strong>  ${totalContries} <hr> <strong>Total Countries Population:</strong>  ${totalCountriesPopulation} <hr> <strong>Average Population:</strong>  ${selectedCountreisPopulationAvg.toFixed(0)} <hr>`);
    }

    function regionCheck(countries) {
        let Americas = 0;
        let Asia = 0;
        let Europe = 0;
        let Africa = 0;
        let Oceania = 0;
        for (const country of countries) {
            if (country.region === "Americas") { Americas++ };
            if (country.region === "Asia") { Asia++ };
            if (country.region === "Europe") { Europe++ };
            if (country.region === "Africa") { Africa++ };
            if (country.region === "Oceania") { Oceania = 1 };
        }
        displayRegions(Americas, Asia, Europe, Africa, Oceania)
    }

    function displayRegions(Americas, Asia, Europe, Africa, Oceania) {
        $("#regionsDiv").empty();
        if (Americas !== 0) {
            $("#regionsDiv").append(`<strong>Americas:</strong> ${Americas} <hr>`)
        }
        if (Asia !== 0) {
            $("#regionsDiv").append(`<strong>Asia:</strong> ${Asia} <hr>`)
        }
        if (Europe !== 0) {
            $("#regionsDiv").append(`<strong>Europe:</strong> ${Europe} <hr>`)
        }
        if (Africa !== 0) {
            $("#regionsDiv").append(`<strong>Africa:</strong> ${Africa} <hr>`)
        }
        if (Oceania !== 0) {
            $("#regionsDiv").append(`<strong>Australia:</strong> ${Oceania} <hr>`)
        }
    }

});






