
class Render {
  constructor(data) {
    this.data = data;
    this.profilesContainer = document.querySelector('.profile-cards');
  }

  getHtml (profileData) {
    return `
      <div class="user-card">
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
            <div class="record-id">${profileData.id.value}</div>
            <div class="type-id">Not applicable</div>
          </div>
          <div class="profile-info">
            <div class="name">
              <div class="first-name">${profileData.name.first}</div>
              <div class="last-name">${profileData.name.last}</div>
            </div>
            <div class="details">
              <div class="alias">V</div>
              <div class="age">${profileData.dob.age}</div>
              <div class="gender">${profileData.gender}</div>
            </div>
            <div class="social">
              <div class="tel">
                <a href="tel:+${profileData.phone}">+${profileData.phone}</a>
              </div>
              <div class="mail">
                <a href="mailto:${profileData.email}">${profileData.email}</a>
              </div>
            </div>
            <div class="location">
              <div class="country">${profileData.location.country}</div>
              <div class="city">${profileData.location.city}</div>
            </div>
          </div>
          <div class="auth">
              <div class="code">
                <img src="img/code.png" alt="User code" class="profile-code">
              </div>
          </div>
        </div>
      </div>
    `;
  }


 /* getHtml (profileData) {
    const html = `
    <div class="card">
        <div class="content">
            <div class="main-info">
                <div class="preview">
                    <img src="${profileData.picture.large}" alt="Profile photo" class="profile-photo">
                </div>
                <div class="icon">
                    <i class="fa fa-user"></i>
                </div>
                <div class="details">
                    <span class="first-name">${profileData.name.first}<span>
                    <span class="last-name">${profileData.name.last}<span>
                </div>
            </div>
            <div class="post sec">
                <div class="preview">Gender</div>
                <div class="icon">
                    <i class="fa fa-venus-mars"></i>
                </div>
                <div class="detail">${profileData.gender}</div>
            </div>
            <div class="post sec">
                <div class="preview">Age</div>
                <div class="icon">
                    <i class="fa fa-birthday-cake"></i>
                </div>
                <div class="detail">${profileData.dob.age} years</div>
            </div>
            <div class="post ter">
                <div class="preview">Email</div>
                <div class="icon email">
                    <i class="fa fa-envelope"></i>
                </div>
                <div class="detail">${profileData.email}</div>
            </div>
            <div class="post ter">
                <div class="preview">Location</div>
                <div class="detail">${profileData.location.city}, 
                ${profileData.location.country}</div>
            </div>
            <div class="post ter">
                <div class="preview">Nation</div>
                <div class="detail">${profileData.nat}</div>
            </div>
            <div class="post ter">
                <div class="preview">Phone</div>
                <div class="icon loc">
                    <i class="fa fa-phone"></i>
                </div>
                <div class="detail">${profileData.phone}</div>
            </div>
        </div>
        <div class="fabs">
            <div class="fab"></div>
                <i class="avatar fa fa-info"></i>
            </div>
        </div>
    </div>
        `;
    return html;
  }
*/
  getProfile() {
    this.data.forEach(result => {
      this.profilesContainer.insertAdjacentHTML(
        'beforeend',
        this.getHtml(result)
      );
    });
  }
}

class Api {
  constructor() {
    this.apiURL = `https://randomuser.me/api/`;
    this.errorMessage = `Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you.`;
  }

  async getData (pageNum = 1) {
    try {
      const response = await fetch(
        this.apiURL + `?page=${pageNum}&results=9&seed=abc`
      );
      if (!response.ok) throw new Error(errorMessage);
      const data = await response.json();
      new Render(data.results).getProfile();
      console.log(data);
      document.querySelector('.loading').classList.remove('active');

    } catch (err) {
      console.error(err);
    }
    this.dataObserver();
  }

    dataObserver () {
    let pageNum = 1;
    
    let loadByScroll = () => {
        if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5) {
            document.querySelector('.loading').classList.add('active');
            this.getData(++pageNum);
        }
    }
    window.addEventListener('scroll', loadByScroll, false);

   // document.querySelector('aside').addEventListener('click', () => {
        //  console.log('stop');
     //   window.removeEventListener('scroll', loadByScroll, false);
       
    //  });
  }
}
new Api().getData();
