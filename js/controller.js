'use strict'

$(onInit)



function onInit() {
  renderProtfolioProjs()
  renderProtfolioModals()
}

function renderProtfolioProjs() {
  var projs = getProjs()
  var strHtmls = projs.map(function (proj, idx) {
    return `
    <div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${idx + 1}">
    <div class="portfolio-hover">
    <div class="portfolio-hover-content">
    <i class="fa fa-plus fa-3x"></i>
    </div>
    </div>
    <img class="img-fluid-modal" src="${proj.url}" >
    </a>
    <div class="portfolio-caption">
    <h4>${proj.title}</h4>
    <p class="text-muted">${proj.name}</p>
    </div>
    </div>
      `
  })
  $('#rendered-row').html(strHtmls)
}

function renderProtfolioModals() {
  var projs = getProjs()
  var strHtmls = projs.map(function (proj, idx) {
    return `
    <div class="portfolio-modal modal fade" id="portfolioModal${idx + 1}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${proj.name}</h2>
                <p class="item-intro text-muted">${proj.title}</p>
                <a href="${proj.link}"><img class="img-fluid d-block mx-auto" src="${proj.url}" alt=""></a>
                <p>${proj.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${proj.publishedAt}</li>
                  <li>Client: Threads</li>
                  <li>Category: Illustration</li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i>
                  Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
      `
  })
  $('.modals-container').html(strHtmls)
}

function onSubmit() {
  var phoneNum = document.querySelector('#number').value
  var email = document.querySelector('#email').value
  var messege = document.querySelector('#msg').value

  console.log('phone num ' + phoneNum + ' email ' + email + ' messge ' + messege);
  contactStorage(phoneNum, email, messege)
}