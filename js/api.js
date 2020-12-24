class Render {
  constructor(results, info) {
    this.data = results;
    this.info = info;
    this.profilesContainer = document.querySelector('.profile-cards');
    this.filtersContainer = document.querySelector('#filters');
  }

  getHtmlProfile(profileData, index) {
    return `
      <div class="user-card">
        <div class="card-info" hidden>
          user${this.info.page}-${index}
        </div>
        <div class="content">
          <div class="profile-header">
            <div class="protocol">
              <div class="id-protocol icon exclamation">
                Protocol
                <div>6520-A44</div>
              </div>
              <img src="img/protocol.png" alt="User protocol" class="profile-protocol">
            </div>
            <div class="user-photo">
              <img src="${profileData.picture.large}" alt="Profile photo" class="profile-photo">
            </div>
          </div>
          <div class="profile-id">
            <div class="id-info block">
              <span>record id</span>
              <div class="record-id">
                ${profileData.id.value}
              </div>
            </div>
            <div class="id-info block">
              <span>type id</span>
              <div class="type-id">${profileData.id.name}</div>
            </div>
          </div>
          <div class="profile-info">
            <div class="name">
              <div class="name-info block">
                <span>first name</span>
                <div class="first-name">${profileData.name.first}</div>
              </div>
              <div class="name-info block">
                <span>last name</span>
                <div class="last-name">${profileData.name.last}</div>
              </div>
            </div>
            <div class="details">
              <div class="details-info block">
                <span>alias</span>
                <div class="alias">V</div>
              </div>
              <div class="details-info block">
                <span>years old</span>
                <div class="age">${profileData.dob.age}</div>
              </div>
              <div class="details-info block">
                <span>gender</span>
                <div class="gender">${profileData.gender}</div>
              </div>
            </div>
            <div class="social">
              <div class="social-info block">
                <span>phone</span>
                <div class="tel">
                  <a href="tel:+${profileData.phone}">+${profileData.phone}</a>
                </div>
              </div>
              <div class="social-info block">
                <span>email</span>
                <div class="mail">
                  <a href="mailto:${profileData.email}">${profileData.email}</a>
                </div>
              </div>
            </div>
            <div class="location">
              <div class="location-info block">
                <span>country</span>
                <div class="country">${profileData.location.country}</div>
              </div>
              <div class="location-info block">
                <span>city</span>
                <div class="city">${profileData.location.city}</div>
              </div>
            </div>
          </div>
          <div class="auth">
              <span>authetication code</span>
              <div class="code">
                <img src="img/code.png" alt="User code" class="profile-code">
              </div>
          </div>
        </div>
      </div>
    `;
  }

  getProfiles() {
    this.data.forEach((result, index) => {
      this.profilesContainer.insertAdjacentHTML(
        'beforeend',
        this.getHtmlProfile(result, index)
      );
    });
  }

  getHtmlFilter() {
    return `   
      <div class="filter-gender">
        <p>filter by gender</p>
        <input type="radio" id="male" name="sort-gender">
        <label for="male">Male</label>
        <input type="radio" id="female" name="sort-gender">
        <label for="female">female</label>
        <input type="radio" id="allGender" name="sort-gender">
        <label for="genderAll">all</label>
      </div>

      <div class="filter-name">
        <p>sort by name</p>
        <input type="radio" id="nameAZ" name="sort-name">
        <label for="nameAZ">A - Z</label>
        <input type="radio" id="nameZA" name="sort-name">
        <label for="nameZA">Z - A</label>
        <input type="radio" id="allName" name="sort-name">
        <label for="allName">default</label>
      </div>
      
      <div class="filter-age">
        <p>sort by age</p>
        <input type="radio" id="age09" name="sort-age">
        <label for="age09">young - old</label>
        <input type="radio" id="age90" name="sort-age">
        <label for="age90">old - young</label>
        <input type="radio" id="allAge" name="sort-age">
        <label for="allAge">default</label>
      </div>

      
      <div class="filter-search">
        <p>Search user by name</p>
        <input type="text" size="40">
      </div>
    `;
  }

  getFilters() {
    this.filtersContainer.insertAdjacentHTML('beforeend', this.getHtmlFilter());
  }
}

class Filter {
  constructor() {
    this.profilesContainer = document.querySelector('.profile-cards');
    new Render().getFilters();
    this.filtersPanel = document.querySelector('#filters');
    this.startFilter();
    this.sortByNameTypes = {
      type1: 'nameAZ',
      type2: 'nameZA',
      type3: 'allName',
    };
    this.sortByAgeTypes = {
      type1: 'age09',
      type2: 'age90',
      type3: 'allAge',
    };
  }

  unckeckedRadioButton(nodeName) {
    const activeRadioButtons = document.querySelectorAll(
      'input[type=radio]:checked'
    );
    const checkedRadio = Array.from(activeRadioButtons).find(
      node => node.name === nodeName
    );
    if (checkedRadio) checkedRadio.checked = false;
  }

  selectSort(radio) {
    const sort = {
      'sort-gender': () => this.sortByGender(radio.id),
      'sort-name': () => {
        this.unckeckedRadioButton('sort-age');
        this.sortByContent('.first-name', radio.id, this.sortByNameTypes);
      },
      'sort-age': () => {
        this.unckeckedRadioButton('sort-name');

        this.sortByContent('.age', radio.id, this.sortByAgeTypes);
      },
      default: () => false,
    };
    return (sort[radio.name] || sort['default'])();
  }

  startFilter() {
    this.filtersPanel.addEventListener('click', ({ target }) => {
      if (target.type === 'radio') {
        loadMoreData.loadByScroll(true);
        this.selectSort(target);
      }
    });
  }

  sortByGender(key) {
    const cards = document.querySelectorAll('.user-card');
    if (key === 'allGender') {
      Array.from(cards).map(node => node.classList.remove('hidden'));
    } else {
      Array.from(cards).find(node => {
        const currentGender = node.querySelector('.gender');
        if (currentGender.textContent !== key) {
          currentGender.closest('.user-card').classList.add('hidden');
        } else {
          currentGender.closest('.user-card').classList.remove('hidden');
        }
      });
    }
  }

  insertSortedProfiles(sortedCards, param) {
    sortedCards.forEach(card =>
      this.profilesContainer.insertBefore(card, this.profilesContainer[param])
    );
  }

  sortBySelector(selectorName) {
    const cards = document.querySelectorAll('.user-card');
    return Array.from(cards).sort((a, b) =>
      a
        .querySelector(selectorName)
        .textContent.localeCompare(b.querySelector(selectorName).textContent)
    );
  }

  sortByDefault() {
    const sortedCards = this.sortBySelector('.card-info');
    this.insertSortedProfiles(sortedCards, 'lastChild');
  }

  sortByContent(sortSelector, sortType, sortTypes) {
    const sortedCards = this.sortBySelector(sortSelector);
    const typeOfSort = {
      [sortTypes.type1]: () =>
        this.insertSortedProfiles(sortedCards, 'lastChild'),
      [sortTypes.type2]: () =>
        this.insertSortedProfiles(sortedCards, 'firstChild'),
      [sortTypes.type3]: () => this.sortByDefault(),
      default: () => false,
    };
    return (typeOfSort[sortType] || typeOfSort['default'])();
  }
}

class Api {
  constructor() {
    this.apiURL = `https://randomuser.me/api/`;
    this.errorMessage = `Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you.`;
  }

  async getData(pageNum = 1) {
    try {
      const response = await fetch(
        this.apiURL + `?page=${pageNum}&results=10&seed=abc`
      );
      if (!response.ok) throw new Error(errorMessage);
      const data = await response.json();
      new Render(data.results, data.info).getProfiles();
      console.log(data);
      document.querySelector('.loading').classList.remove('active');
    } catch (err) {
      console.error(err);
    }
  }
}

class Observer {
  constructor() {
    this.startPage = 1;
    this.loading = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 5
      ) {
        document.querySelector('.loading').classList.add('active');
        new Api().getData(++this.startPage);
      }
    };
  }

  loadByScroll(loadingStop) {
    if (loadingStop) {
      window.removeEventListener('scroll', this.loading);
      return;
    }
    window.addEventListener('scroll', this.loading);
  }
}

new Api().getData();
new Filter();
const loadMoreData = new Observer();
loadMoreData.loadByScroll();
