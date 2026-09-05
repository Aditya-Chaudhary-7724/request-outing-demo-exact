/* =====================================================
   REQUEST OUTING DEMO
===================================================== */


/* =====================================================
   STORAGE
===================================================== */

const STORAGE_KEY = "outingRequests";


/* =====================================================
   TODAY
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
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    const defaults = getDefaultRequests();

    saveRequests(defaults);

    return defaults;
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error(error);

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
   DEFAULT HISTORY
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

      confirmedBy:
        "sarasu",

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

      confirmedBy:
        "sarasu",

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

      confirmedBy:
        "sarasu",

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

      confirmedBy:
        "sarasu",

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

      confirmedBy:
        "sarasu",

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

      confirmedBy:
        "sarasu",

      handledOn:
        "15/08/2026, 19:00:00",

      handledBy:
        "warden.sannasic.ktr",

      otp: null
    }
  ];
}


/* =====================================================
   OTP
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
   RENDER OTP
===================================================== */

function renderOTP() {
  const otpSection =
    document.getElementById("otpSection");

  if (!otpSection) {
    return;
  }

  const today = getToday();

  const requests = getRequests();

  const todayRequests =
    requests.filter(
      request =>
        request.outDate === today
    );


  /* ---------------------------------------------
     NO OUTING TODAY
  --------------------------------------------- */

  if (todayRequests.length === 0) {

    otpSection.innerHTML = `
      <div class="no-otp">

        <strong>
          No outing scheduled for today.
        </strong>

        <br><br>

        Submit an outing request with
        today's date to generate an
        Arch Gate OTP.

      </div>
    `;

    return;
  }


  /* ---------------------------------------------
     GET LATEST TODAY'S OUTING
  --------------------------------------------- */

  const request =
    todayRequests[
      todayRequests.length - 1
    ];


  /* ---------------------------------------------
     GENERATE OTP IF NEEDED
  --------------------------------------------- */

  if (!request.otp) {

    request.otp =
      generateOTP();

    saveRequests(requests);
  }


  /* ---------------------------------------------
     DEFAULT STATUS
  --------------------------------------------- */

  const status =
    request.status ||
    "still_out";


  /* ---------------------------------------------
     CONFIRMED BY
     
     IMPORTANT:
     This is ONLY used in the OTP section.
     It is NOT displayed in Past Outings.
  --------------------------------------------- */

  const confirmedBy =
    request.confirmedBy ||
    "sarasu";


  /* ---------------------------------------------
     OTP HTML
  --------------------------------------------- */

  otpSection.innerHTML = `

    <section class="otp-card">

      <h2>
        OTP for Arch Gate
      </h2>

      <div class="rule"></div>

      <p class="otp-dates">

        Out Date:
        ${request.outDate}

        &nbsp;|&nbsp;

        In Date:
        ${request.inDate}

      </p>

      <div class="otp">
        ${request.otp}
      </div>

      <p class="otp-note">

        Please present this OTP at the
        Arch Gate when returning to SRM.

      </p>


      <!-- =========================================
           CURRENT OTP INFORMATION

           Confirmed by is shown ONLY HERE.
      ========================================== -->

      <div class="otp-info">

        <div class="otp-info-row">

          <strong>
            Reason:
          </strong>

          <span>
            ${escapeHTML(request.reason)}
          </span>

        </div>


        <div class="otp-info-row">

          <strong>
            Status:
          </strong>

          <span>
            ${escapeHTML(status)}
          </span>

        </div>


        <div class="otp-info-row">

          <strong>
            Confirmed by:
          </strong>

          <span>
            ${escapeHTML(confirmedBy)}
          </span>

        </div>

      </div>

    </section>

  `;
}


/* =====================================================
   RENDER HISTORY
===================================================== */

function renderHistory() {

  const historyGrid =
    document.getElementById(
      "historyGrid"
    );

  if (!historyGrid) {
    return;
  }


  const today = getToday();

  const requests = getRequests();


  /* ---------------------------------------------
     ONLY SHOW DATES BEFORE TODAY
     
     Today's outing stays in OTP.
  --------------------------------------------- */

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

          if (dateCompare !== 0) {
            return dateCompare;
          }

          return b.outTime.localeCompare(
            a.outTime
          );
        }
      );


  /* ---------------------------------------------
     EMPTY HISTORY
  --------------------------------------------- */

  if (pastRequests.length === 0) {

    historyGrid.innerHTML = `
      <div class="empty-history">

        No past outings yet.

      </div>
    `;

    return;
  }


  /* ---------------------------------------------
     CREATE CARDS
  --------------------------------------------- */

  historyGrid.innerHTML =
    pastRequests
      .map(
        request =>
          createBookingHTML(request)
      )
      .join("");


  /* ---------------------------------------------
     TRIPLE CLICK DELETE
     
     Delete button stays hidden until
     the individual card is triple-clicked.
  --------------------------------------------- */

  document
    .querySelectorAll(".booking")
    .forEach(card => {

      let clickCount = 0;

      let clickTimer = null;


      card.addEventListener(
        "click",
        function(event) {

          /*
             Don't count clicks on
             Delete button itself.
          */

          if (
            event.target.classList
              .contains("remove-btn")
          ) {
            return;
          }


          clickCount++;


          clearTimeout(clickTimer);


          clickTimer =
            setTimeout(
              () => {

                clickCount = 0;

              },
              500
            );


          /* ----------------------------------
             TRIPLE CLICK
          ---------------------------------- */

          if (clickCount === 3) {

            this.classList.add(
              "delete-unlocked"
            );

            clickCount = 0;
          }

        }
      );

    });


  /* ---------------------------------------------
     DELETE BUTTONS
  --------------------------------------------- */

  document
    .querySelectorAll(".remove-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        function(event) {

          event.stopPropagation();

          const id =
            this.dataset.id;

          removeRequest(id);

        }
      );

    });
}


/* =====================================================
   BOOKING HTML
===================================================== */

function createBookingHTML(request) {

  const status =
    request.status ||
    "confirmed";


  /*
     IMPORTANT:

     confirmedBy is deliberately NOT used here.

     It should NOT appear in Past Outings.
  */


  return `

    <article
      class="booking"
    >

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


      <p>

        <b>
          Out Date:
        </b>

        ${escapeHTML(
          request.outDate
        )}

      </p>


      <p>

        <b>
          Out Time:
        </b>

        ${escapeHTML(
          request.outTime
        )}

      </p>


      <p>

        <b>
          In Date:
        </b>

        ${escapeHTML(
          request.inDate
        )}

      </p>


      <p>

        <b>
          In Time:
        </b>

        ${escapeHTML(
          request.inTime
        )}

      </p>


      <p>

        <b>
          Reason:
        </b>

        ${escapeHTML(
          request.reason
        )}

      </p>


      <p>

        <b>
          Status:
        </b>

        ${escapeHTML(
          status
        )}

      </p>


      <!-- =========================================
           HISTORY HANDLED INFORMATION

           NO "Confirmed by: sarasu" HERE.
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
           HIDDEN DELETE BUTTON
           
           CSS makes this visible after
           triple-clicking the card.
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


  /* ---------------------------------------------
     GET FORM VALUES
  --------------------------------------------- */

  const room =
    document
      .getElementById("roomNumber")
      .value
      .trim();


  const outDate =
    document
      .getElementById("outDate")
      .value;


  const outTime =
    document
      .getElementById("outTime")
      .value;


  const inDate =
    document
      .getElementById("inDate")
      .value;


  const inTime =
    document
      .getElementById("inTime")
      .value;


  const reason =
    document
      .getElementById("reason")
      .value
      .trim();


  const parentEmail =
    document
      .getElementById("parentEmail")
      .value
      .trim();


  const parentPhone =
    document
      .getElementById("parentPhone")
      .value
      .trim();


  /* ---------------------------------------------
     VALIDATION
  --------------------------------------------- */

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


  /* ---------------------------------------------
     CHECK DATE/TIME
  --------------------------------------------- */

  const outDateTime =
    new Date(
      `${outDate}T${outTime}`
    );


  const inDateTime =
    new Date(
      `${inDate}T${inTime}`
    );


  if (inDateTime < outDateTime) {

    alert(
      "In Date/Time cannot be before Out Date/Time."
    );

    return;
  }


  /* ---------------------------------------------
     CHECK IF OUT DATE IS TODAY
  --------------------------------------------- */

  const isToday =
    outDate === getToday();


  /* ---------------------------------------------
     CREATE REQUEST
  --------------------------------------------- */

  const newRequest = {

    id:
      Date.now().toString(),

    room,

    outDate,

    outTime,

    inDate,

    inTime,

    reason,

    parentEmail,

    parentPhone,


    /*
       Today's request:
       still_out

       Older request:
       confirmed
    */

    status:
      isToday
        ? "still_out"
        : "confirmed",


    /*
       This is kept in the data because
       the OTP section uses it.

       It is NOT displayed in history.
    */

    confirmedBy:
      "sarasu",


    handledOn:
      getCurrentDateTime(),


    handledBy:
      "warden.sannasic.ktr",


    /*
       Generate OTP immediately
       if outing is today.
    */

    otp:
      isToday
        ? generateOTP()
        : null

  };


  /* ---------------------------------------------
     SAVE
  --------------------------------------------- */

  const requests =
    getRequests();


  requests.push(
    newRequest
  );


  saveRequests(
    requests
  );


  /* ---------------------------------------------
     RESET FORM
  --------------------------------------------- */

  const form =
    document.getElementById(
      "outingForm"
    );

  if (form) {
    form.reset();
  }


  /* ---------------------------------------------
     REFRESH
  --------------------------------------------- */

  renderPage();


  /* ---------------------------------------------
     SUCCESS MESSAGE
  --------------------------------------------- */

  if (isToday) {

    alert(
      "Outing request submitted successfully! Your Arch Gate OTP has been generated."
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

  return String(value)

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