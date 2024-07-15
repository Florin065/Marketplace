import { ref, watch } from 'vue';

export const locationData = ref({
  optionsStates: [],
  allStates: [],
  optionsCities: [],
  allCities: [],
  optionsCountries: [],
  allCountries: [],
});

export const fetchCountries = () => {
    return fetch('https://countriesnow.space/api/v0.1/countries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => data.data.map((country) => ({
      country: country.country,
    })));
  };

export const fetchStates = (country) => {
  return fetch('https://countriesnow.space/api/v0.1/countries/states', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ country }),
  })
  .then((response) => response.json())
  .then((data) => {
    // Check if the states property exists
    if (!data.data || !data.data.states) {
      console.error('States data is missing');
      return []; // Return an empty array if states data is missing
    }
    return data.data.states.map((state) => ({
      name: state.name,
    }));
  })
  .catch((error) => {
    console.error('Error fetching states:', error);
    return []; // Return an empty array in case of error
  });
};

export const watchCountryChanges = (formData) => {
  watch(() => formData.value.tara, (newVal) => {
    if (!newVal) return;

    fetch('https://countriesnow.space/api/v0.1/countries/states', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "country": newVal.country }),
    })
    .then((response) => response.json())
    .then((data) => {
      locationData.value.optionsStates = data.data.states.map((state) => ({
        name: state.name,
      }));
      locationData.value.allStates = [...locationData.value.optionsStates];
    })
    .catch((error) => console.error('Error fetching states:', error));
  }, { immediate: false, deep: true });
};

export const watchStateChanges = (formData) => {
  watch(() => formData.value.judet, (newVal) => {
    if (!newVal) return;

    fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "country": formData.value.tara.country, "state": newVal.name }),
    })
    .then((response) => response.json())
    .then((data) => {
      locationData.value.optionsCities = data.data.map((city) => ({
        name: city,
      }));
      locationData.value.allCities = [...locationData.value.optionsCities];
    })
    .catch((error) => console.error('Error fetching cities:', error));
  }, { immediate: false, deep: true });
};

export const filterCountries = (val, update) => {
  update(() => {
    if (val.trim() === '') {
      locationData.value.optionsCountries = [...locationData.value.allCountries];
    } else {
      const needle = val.toLowerCase();
      locationData.value.optionsCountries = locationData.value.allCountries.filter((country) =>
        country.country.toLowerCase().includes(needle)
      );
    }
  });
};

export const filterCounties = (val, update) => {
  update(() => {
    if (val.trim() === '') {
      locationData.value.optionsStates = [...locationData.value.allStates];
    } else {
      const needle = val.toLowerCase();
      locationData.value.optionsStates = locationData.value.allStates.filter((state) =>
        state.name.toLowerCase().includes(needle)
      );
    }
  });
};

export const filterCities = (val, update) => {
  update(() => {
    if (val.trim() === '') {
      locationData.value.optionsCities = [...locationData.value.allCities];
    } else {
      const needle = val.toLowerCase();
      locationData.value.optionsCities = locationData.value.allCities.filter((city) =>
        city.name.toLowerCase().includes(needle)
      );
    }
  });
};