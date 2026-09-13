/* =====================================================
   REQUEST OUTING DEMO
===================================================== */


/* =====================================================
   STORAGE
===================================================== */

const STORAGE_KEY = "outingRequests";


/* =====================================================
   GET TODAY
===================================================== */

function getToday() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


/* =====================================================
   CURRENT DATE + TIME
===================================================== */

function getCurrentDateTime() {
  const now = new Date();

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const year = now.getFullYear();

  const hours = String(
    now.getHours()
  ).padStart(2, "0");

  const minutes = String(
    now.getMinutes()
  ).padStart(2, "0");

  const seconds = String(
    now.getSeconds()
  ).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
}


/* =====================================================
   GET REQUESTS
===================================================== */

function getRequests() {

  const stored =
    localStorage.getItem(
      STORAGE_KEY
    );

  /*
     First time opening the website
  */

  if (!stored) {

    const defaults =
      getDefaultRequests();

    saveRequests(defaults);

    return defaults;
  }


  /*
     Read saved requests
  */

  try {

    return JSON.parse(stored);

  } catch (error) {

    console.error(
      "Error reading outing requests:",
      error
    );

    return [];
  }
}


/* =====================================================
   SAVE REQUESTS
===================================================== */

function saveRequests(requests) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(requests)
  );
}


/* =====================================================
   DEFAULT PAST OUTINGS
===================================================== */

function getDefaultRequests() {

  return [

    {
      id: "old-1",

      room: "101",

      outDate: "2026-09-04",

      outTime: "11:48",

      inDate: "2026-09-04",

      inTime: "15:00",

      reason: "Hospital",

      parentEmail:
        "arvindchaudharybijnor@gmail.com",

      parentPhone:
        "8273524204",

      status: "confirmed",

      confirmedBy: "sarasu",

      handledOn:
        "04/09/2026, 15:06:03",

      handledBy:
        "warden.sannasic.ktr",

      otp: null
    },


    {
      id: "old-2",

      room: "101",

      outDate: "2026-08-30",

      outTime: "17:25",

      inDate: "2026-08-30",

      inTime: "18:30",

      reason: "Food delivery",

      parentEmail:
        "arvindchaudharybijnor@gmail.com",

      parentPhone:
        "8273524204",

      status: "confirmed",

      confirmedBy: "sarasu",

      handledOn:
        "30/08/2026, 19:02:33",

      handledBy:
        "warden.sannasic.ktr",

      otp: null
    },


    {
      id: "old-3",

      room: "101",

      outDate: "2026-08-29",

      outTime: "17:50",

      inDate: "2026-08-29",

      inTime: "18:35",

      reason: "Food delivery",

      parentEmail:
        "arvindchaudharybijnor@gmail.com",

      parentPhone:
        "8273524204",

      status: "confirmed",

      confirmedBy: "sarasu",

      handledOn:
        "29/08/2026, 19:05:24",

      handledBy:
        "warden.sannasic.ktr",

      otp: null
    },


    {
      id: "old-4",

      room: "101",

      outDate: "2026-08-26",

      outTime: "10:35",

      inDate: "2026-08-26",

      inTime: "17:30",

      reason: "Incampus",

      parentEmail:
        "arvindchaudharybijnor@gmail.com",

      parentPhone:
        "8273524204",

      status: "confirmed",

      confirmedBy: "sarasu",

      handledOn:
        "26/08/2026, 18:53:11",

      handledBy:
        "warden.sannasic.ktr",

      otp: null
    },


    {
      id: "old-5",

      room: "101",

      outDate: "2026-08-24",

      outTime: "17:30",

      inDate: "2026-08-24",

      inTime: "18:30",

      reason: "Food delivery",

      parentEmail:
        "arvindchaudharybijnor@gmail.com",

      parentPhone:
        "8273524204",

      status: "confirmed",

      confirmedBy: "sarasu",

      handledOn:
        "24/08/2026, 18:51:36",

      handledBy:
        "warden.sannasic.ktr",

      otp: null
    },


    {
      id: "old-6",

      room: "101",

      outDate: "2026-08-15",

      outTime: "17:15",

      inDate: "2026-08-15",

      inTime: "18:10",

      reason: "Food delivery",

      parentEmail:
        "arvindchaudharybijnor@gmail.com",

      parentPhone:
        "8273524204",

      status: "confirmed",

      confirmedBy: "sarasu",

      handledOn:
        "15/08/2026, 19:00:00",

      handledBy:
        "warden.sannasic.ktr",

      otp: null
    }

  ];
}


/* =====================================================
   GENERATE OTP
===================================================== */

function generateOTP() {

  return String(
    Math.floor(
      100000 +
      Math.random() * 900000
    )
  );
}


/* =====================================================
   RENDER EVERYTHING
===================================================== */

function renderPage() {

  renderOTP();

  renderHistory();
}


/* =====================================================
   CURRENT REQUEST + OTP
===================================================== */

function renderOTP() {

  const otpSection =
    document.getElementById(
      "otpSection"
    );


  if (!otpSection) {
    return;
  }


  const today =
    getToday();


  const requests =
    getRequests();


  /*
     Find today's requests
  */

  const todayRequests =
    requests.filter(
      request =>
        request.outDate === today
    );


  /* =================================================
     NO CURRENT REQUEST
  ================================================= */

  if (
    todayRequests.length === 0
  ) {

    otpSection.innerHTML = `

      <div class="no-otp">

        <strong>
          No outing scheduled for today.
        </strong>

        <br><br>

        Submit an outing request with
        today's date to create a
        Current Request.

      </div>

    `;

    return;
  }


  /* =================================================
     GET LATEST TODAY'S REQUEST
  ================================================= */

  const request =
    todayRequests[
      todayRequests.length - 1
    ];


  /* =================================================
     DEFAULT STATUS
  ================================================= */

  const status =
    request.status ||
    "still_out";


  /* =================================================
     CONFIRMED BY
     
     THIS IS USED ONLY IN OTP CARD
  ================================================= */

  const confirmedBy =
    request.confirmedBy ||
    "sarasu";


  /* =================================================
     CURRENT REQUEST CARD
  ================================================= */

  let currentRequestHTML = `

    <section class="current-request-card">


      <!-- HEADER -->

      <div class="current-request-header">

        <h2>
          Current Request
        </h2>


        <span class="current-status">

          ${escapeHTML(
            status.toUpperCase()
          )}

        </span>

      </div>


      <!-- DETAILS -->

      <div class="current-request-details">


        <p>

          <strong>
            Out Date:
          </strong>

          ${escapeHTML(
            request.outDate
          )}

        </p>


        <p>

          <strong>
            Out Time:
          </strong>

          ${escapeHTML(
            request.outTime
          )}

        </p>


        <p>

          <strong>
            In Date:
          </strong>

          ${escapeHTML(
            request.inDate
          )}

        </p>


        <p>

          <strong>
            In Time:
          </strong>

          ${escapeHTML(
            request.inTime
          )}

        </p>


        <p>

          <strong>
            Reason:
          </strong>

          ${escapeHTML(
            request.reason
          )}

        </p>


        <p>

          <strong>
            Status:
          </strong>

          ${escapeHTML(
            status
          )}

        </p>


      </div>


      <!-- HANDLED INFORMATION -->

      <div class="current-handled">


        <p>

          <strong>
            Handled on:
          </strong>

          ${escapeHTML(
            request.handledOn || ""
          )}

        </p>


        <p>

          <strong>
            Handled by:
          </strong>

          ${escapeHTML(
            request.handledBy ||
            "Sarasu supervisor"
          )}

        </p>


      </div>

  `;


  /* =================================================
     GENERATE OTP BUTTON

     Show ONLY if OTP doesn't exist.
  ================================================= */

  if (!request.otp) {

    currentRequestHTML += `

      <button
        type="button"
        class="generate-otp-btn"
        onclick="generateCurrentOTP('${escapeHTML(request.id)}')"
      >

        Generate OTP

      </button>

    `;
  }


  currentRequestHTML += `

    </section>

  `;


  /* =================================================
     OTP CARD

     Show ONLY after OTP is generated.
  ================================================= */

  let otpHTML = "";


  if (request.otp) {

    otpHTML = `

      <section class="otp-card">


        <h2>
          OTP for Arch Gate
        </h2>


        <div class="rule"></div>


        <p class="otp-dates">

          Out Date:
          ${escapeHTML(
            request.outDate
          )}

          &nbsp;|&nbsp;

          In Date:
          ${escapeHTML(
            request.inDate
          )}

        </p>


        <div class="otp">

          ${escapeHTML(
            request.otp
          )}

        </div>


        <p class="otp-note">

          Please present this OTP at the
          Arch Gate when returning to SRM.

        </p>


        <!-- OTP INFORMATION -->

        <div class="otp-info">


          <div class="otp-info-row">

            <strong>
              Reason:
            </strong>

            <span>

              ${escapeHTML(
                request.reason
              )}

            </span>

          </div>


          <div class="otp-info-row">

            <strong>
              Status:
            </strong>

            <span>

              ${escapeHTML(
                status
              )}

            </span>

          </div>


          <!-- CONFIRMED BY ONLY HERE -->

          <div class="otp-info-row">

            <strong>
              Confirmed by:
            </strong>

            <span>

              ${escapeHTML(
                confirmedBy
              )}

            </span>

          </div>


        </div>


      </section>

    `;
  }


  /* =================================================
     DISPLAY CURRENT REQUEST FIRST
     THEN OTP
  ================================================= */

  otpSection.innerHTML =
    currentRequestHTML +
    otpHTML;
}


/* =====================================================
   GENERATE CURRENT OTP
===================================================== */

function generateCurrentOTP(id) {

  const requests =
    getRequests();


  const request =
    requests.find(
      item =>
        item.id === id
    );


  if (!request) {

    alert(
      "Request not found."
    );

    return;
  }


  /* Already has OTP */

  if (request.otp) {
    return;
  }


  /* Generate */

  request.otp =
    generateOTP();


  /* Keep status */

  request.status =
    request.status ||
    "still_out";


  /* Keep confirmer */

  request.confirmedBy =
    request.confirmedBy ||
    "sarasu";


  /* Save */

  saveRequests(
    requests
  );


  /* Refresh page */

  renderPage();


  /* Confirmation */

  alert(
    "OTP generated successfully."
  );
}


/* =====================================================
   RENDER PAST OUTINGS
===================================================== */

function renderHistory() {

  const historyGrid =
    document.getElementById(
      "historyGrid"
    );


  if (!historyGrid) {
    return;
  }


  const today =
    getToday();


  const requests =
    getRequests();


  /* =================================================
     ONLY OLD DATES

     Today's request is NOT history.
  ================================================= */

  const pastRequests =
    requests
      .filter(
        request =>
          request.outDate < today
      )
      .sort(
        (a, b) => {

          const dateCompare =
            b.outDate.localeCompare(
              a.outDate
            );


          if (
            dateCompare !== 0
          ) {

            return dateCompare;
          }


          return b.outTime.localeCompare(
            a.outTime
          );
        }
      );


  /* =================================================
     NO HISTORY
  ================================================= */

  if (
    pastRequests.length === 0
  ) {

    historyGrid.innerHTML = `

      <div class="empty-history">

        No past outings yet.

      </div>

    `;

    return;
  }


  /* =================================================
     CREATE HISTORY CARDS
  ================================================= */

  historyGrid.innerHTML =
    pastRequests
      .map(
        request =>
          createBookingHTML(
            request
          )
      )
      .join("");


  /* =================================================
     TRIPLE CLICK DELETE
  ================================================= */

  document
    .querySelectorAll(".booking")
    .forEach(card => {

      let clickCount = 0;

      let clickTimer = null;


      card.addEventListener(
        "click",
        function(event) {


          /*
             Don't count clicks
             on delete button.
          */

          if (
            event.target.classList
              .contains("remove-btn")
          ) {

            return;
          }


          clickCount++;


          clearTimeout(
            clickTimer
          );


          clickTimer =
            setTimeout(
              () => {

                clickCount = 0;

              },
              500
            );


          /*
             Triple click
          */

          if (
            clickCount === 3
          ) {

            this.classList.add(
              "delete-unlocked"
            );


            clickCount = 0;
          }

        }
      );

    });


  /* =================================================
     DELETE BUTTONS
  ================================================= */

  document
    .querySelectorAll(".remove-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        function(event) {


          /*
             Don't trigger card click
          */

          event.stopPropagation();


          const id =
            this.dataset.id;


          removeRequest(id);

        }
      );

    });
}


/* =====================================================
   CREATE PAST OUTING CARD
===================================================== */

function createBookingHTML(
  request
) {

  const status =
    request.status ||
    "confirmed";


  /*
     IMPORTANT:

     confirmedBy is intentionally NOT
     displayed here.

     "Confirmed by: sarasu" appears
     ONLY in the current OTP card.
  */


  return `

    <article
      class="booking"
    >


      <!-- HEADER -->

      <div class="booking-top">

        <h3>
          Booking Details
        </h3>


        <span>

          ${escapeHTML(
            status.toUpperCase()
          )}

        </span>

      </div>


      <!-- OUT DATE -->

      <p>

        <b>
          Out Date:
        </b>

        ${escapeHTML(
          request.outDate
        )}

      </p>


      <!-- OUT TIME -->

      <p>

        <b>
          Out Time:
        </b>

        ${escapeHTML(
          request.outTime
        )}

      </p>


      <!-- IN DATE -->

      <p>

        <b>
          In Date:
        </b>

        ${escapeHTML(
          request.inDate
        )}

      </p>


      <!-- IN TIME -->

      <p>

        <b>
          In Time:
        </b>

        ${escapeHTML(
          request.inTime
        )}

      </p>


      <!-- REASON -->

      <p>

        <b>
          Reason:
        </b>

        ${escapeHTML(
          request.reason
        )}

      </p>


      <!-- STATUS -->

      <p>

        <b>
          Status:
        </b>

        ${escapeHTML(
          status
        )}

      </p>


      <!-- =========================================
           HANDLED INFORMATION

           NO CONFIRMED BY HERE
      ========================================== -->

      <div class="handled">


        <b>
          Handled on:
        </b>

        ${escapeHTML(
          request.handledOn || ""
        )}


        <br />


        <b>
          Handled by:
        </b>

        ${escapeHTML(
          request.handledBy ||
          "warden.sannasic.ktr"
        )}


      </div>


      <!-- =========================================
           DELETE BUTTON

           Hidden until triple-click
      ========================================== -->

      <button
        class="remove-btn"
        data-id="${escapeHTML(
          request.id
        )}"
        type="button"
      >

        Delete Outing

      </button>


    </article>

  `;
}


/* =====================================================
   SUBMIT REQUEST
===================================================== */

function submitRequest(event) {

  event.preventDefault();


  /* =================================================
     GET FORM VALUES
  ================================================= */

  const room =
    document
      .getElementById(
        "roomNumber"
      )
      .value
      .trim();


  const outDate =
    document
      .getElementById(
        "outDate"
      )
      .value;


  const outTime =
    document
      .getElementById(
        "outTime"
      )
      .value;


  const inDate =
    document
      .getElementById(
        "inDate"
      )
      .value;


  const inTime =
    document
      .getElementById(
        "inTime"
      )
      .value;


  const reason =
    document
      .getElementById(
        "reason"
      )
      .value
      .trim();


  const parentEmail =
    document
      .getElementById(
        "parentEmail"
      )
      .value
      .trim();


  const parentPhone =
    document
      .getElementById(
        "parentPhone"
      )
      .value
      .trim();


  /* =================================================
     VALIDATION
  ================================================= */

  if (
    !room ||
    !outDate ||
    !outTime ||
    !inDate ||
    !inTime ||
    !reason
  ) {

    alert(
      "Please fill in all required fields."
    );

    return;
  }


  /* =================================================
     CHECK DATE / TIME
  ================================================= */

  const outDateTime =
    new Date(
      `${outDate}T${outTime}`
    );


  const inDateTime =
    new Date(
      `${inDate}T${inTime}`
    );


  if (
    inDateTime <
    outDateTime
  ) {

    alert(
      "In Date/Time cannot be before Out Date/Time."
    );

    return;
  }


  /* =================================================
     IS IT TODAY?
  ================================================= */

  const isToday =
    outDate === getToday();


  /* =================================================
     CREATE NEW REQUEST
     
     IMPORTANT:
     OTP starts as NULL.

     User must click
     Generate OTP.
  ================================================= */

  const newRequest = {

    id:
      Date.now().toString(),


    room:


      room,


    outDate:


      outDate,


    outTime:


      outTime,


    inDate:


      inDate,


    inTime:


      inTime,


    reason:


      reason,


    parentEmail:


      parentEmail,


    parentPhone:


      parentPhone,


    /* Today's request */

    status:
      isToday
        ? "still_out"
        : "confirmed",


    /*
       Stored for OTP section only.
    */

    confirmedBy:
      "sarasu",


    handledOn:
      getCurrentDateTime(),


    handledBy:
      isToday
        ? "Sarasu supervisor"
        : "warden.sannasic.ktr",


    /*
       IMPORTANT:

       Do NOT generate OTP here.

       It will be generated by
       Generate OTP button.
    */

    otp: null

  };


  /* =================================================
     SAVE REQUEST
  ================================================= */

  const requests =
    getRequests();


  requests.push(
    newRequest
  );


  saveRequests(
    requests
  );


  /* =================================================
     RESET FORM
  ================================================= */

  const form =
    document.getElementById(
      "outingForm"
    );


  if (form) {

    form.reset();
  }


  /* =================================================
     REFRESH PAGE
  ================================================= */

  renderPage();


  /* =================================================
     SUCCESS MESSAGE
  ================================================= */

  if (isToday) {

    alert(
      "Outing request submitted successfully. Click Generate OTP to generate your Arch Gate OTP."
    );

  } else if (
    outDate < getToday()
  ) {

    alert(
      "Outing added to Past Outings."
    );

  } else {

    alert(
      "Outing request submitted successfully."
    );
  }
}


/* =====================================================
   DELETE REQUEST
===================================================== */

function removeRequest(id) {

  const confirmed =
    confirm(
      "Are you sure you want to delete this outing?"
    );


  if (!confirmed) {

    return;
  }


  const requests =
    getRequests();


  const updated =
    requests.filter(
      request =>
        request.id !== id
    );


  saveRequests(
    updated
  );


  renderPage();
}


/* =====================================================
   DARK MODE
===================================================== */

function toggleDarkMode() {

  document.body
    .classList
    .toggle("dark");
}


/* =====================================================
   FAKE LOGOUT
===================================================== */

function fakeLogout() {

  alert(
    "Demo only — logout is not connected to a real authentication system."
  );
}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

  return String(
    value ?? ""
  )

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );
}


/* =====================================================
   FORM SUBMIT
===================================================== */

const outingForm =
  document.getElementById(
    "outingForm"
  );


if (outingForm) {

  outingForm.addEventListener(
    "submit",
    submitRequest
  );
}


/* =====================================================
   INITIAL LOAD
===================================================== */

renderPage();