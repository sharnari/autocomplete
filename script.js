const input = document.querySelector("input");

const debounce = (fn, debounceTime) => {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(fn, debounceTime);
    };
  };

input.addEventListener("keyup", debounce(autocomplete, 400));

function autocomplete () {
    if (listBableFinded.firstChild) {
        listBableFinded.innerHTML = "";
        addInList();
      } else {
        addInList();
      }
      return listBableFinded;
}


const listBableFinded = document.createElement("ul");
const selectedRepos = document.createElement("ul");
listBableFinded.classList.add("repos-was-find");
selectedRepos.classList.add("selected-repos");
const section = document.querySelector("section");
section.append(listBableFinded);
section.append(selectedRepos);

async function queryRepositories() {
    let arr = [];
    try {
      const resp = await fetch(`https://api.github.com/search/repositories?q=${input.value}`);
      const result = await resp.json();
      const reposFinded = result.items;
      for (let i = 0; i < 5; i++) {
        arr.push(reposFinded[i]);
      }
      return arr;
    } catch (error) {
      throw error;
    }
  }

  function liGeneration(obj) {
    const elem = document.createElement("li");
    elem.classList.add('sel-rep');
    const container = document.createElement("div");
    container.classList.add("container");
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("delete-elem");
    const name = document.createElement("p");
    name.textContent = `name: ${obj.name}`;
    const owner = document.createElement("p");
    owner.textContent = `owner: ${obj.owner.login}`;
    const stars = document.createElement("p");
    stars.textContent = `stars: ${obj.stargazers_count}`;
    container.append(name);
    container.append(owner);
    container.append(stars);
    elem.append(container);
    elem.append(removeBtn);
    removeBtn.addEventListener("click", () => {
      elem.remove();
    });
  
    return elem;
  }

  async function addInList() {
    const arr = await queryRepositories();
    for (let i = 0; i < arr.length; i++) {
      const listElem = document.createElement("li");
      listElem.classList.add("selected-elemLi");
      listElem.textContent = arr[i].name;
      listBableFinded.append(listElem);
      listElem.addEventListener("click", () => {
        input.value = "";
        listBableFinded.innerHTML = "";
        const selectedli = liGeneration(arr[i]);
        selectedRepos.append(selectedli);
      });
    }
  }