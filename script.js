input.addEventListener("keyup", debounce(autocomplete, 400));

const listOfRepos = createElement("ul", "selected-repositories");
function autocomplete () {

}

const debounce = (fn, debounceTime) => {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(fn, debounceTime);
    };
  };