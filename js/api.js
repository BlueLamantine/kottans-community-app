
class Render {
  constructor(data) {
    this.data = data;
    this.profilesContainer = document.querySelector('.profile-cards');
  }

  getHtml(profileData) {
    const html = `
    <div class="card">
        <div class="content">
            <div class="post main">
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
                <div class="detail">${profileData.dob.age} yers</div>
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
                <div class="icon loc">
                    <i class="fa fa-map-marker"></i>
                </div>
                <div class="detail">${profileData.location.city}, 
                ${profileData.location.country}</div>
            </div>
            <div class="post ter">
                <div class="preview">Nation</div>
                <div class="icon nat">
                    <i class="fa fa-users"></i>
                </div>
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

  getProfile() {
    this.data.forEach(result => {
      console.log(result);
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

  async getData(pageNum = 1, resNum = 9) {
    try {
      const response = await fetch(
        this.apiURL + `?page=${pageNum}&results=${resNum}&seed=abc`
      );
      if (!response.ok) throw new Error(errorMessage);
      const data = await response.json();
      new Render(data.results).getProfile();
    } catch (err) {
      console.error(err);
    }
  }
}
new Api().getData();
