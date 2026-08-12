 document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("scannerForm");
  const results = document.getElementById("results");

  const lostRevenue = document.getElementById("lostRevenue");
  const missedLeads = document.getElementById("missedLeads");
  const potentialDeals = document.getElementById("potentialDeals");
  const currentDeals = document.getElementById("currentDeals");

  const recoveryBtn = document.getElementById("recoveryBtn");
  const recoveryPlan = document.getElementById("recoveryPlan");
  const planContent = document.getElementById("planContent");

  const recoveryText = document.getElementById("recoveryText");
  const resetBtn = document.getElementById("resetBtn");


  form.addEventListener("submit", function (e) {

    e.preventDefault();

    const leads = Number(document.getElementById("leads").value);
    const response = Number(document.getElementById("response").value);
    const conversion = Number(document.getElementById("conversion").value);
    const dealValue = Number(document.getElementById("dealValue").value);

    if (!leads || !dealValue) {
      alert("Please enter all values.");
      return;
    }

    const respondingLeads = leads * (response / 100);

    const missed = leads - respondingLeads;

    const current = respondingLeads * (conversion / 100);

    const recoverable = missed * 0.50;

    const extraDeals = recoverable * (conversion / 100);

    const revenue = extraDeals * dealValue;


    missedLeads.textContent = Math.round(missed);

    currentDeals.textContent = Math.round(current);

    potentialDeals.textContent = Math.round(extraDeals);

    lostRevenue.textContent =
      Math.round(revenue).toLocaleString("en-US");


    recoveryText.innerHTML =
      "Estimated recoverable revenue: <strong>$" +
      Math.round(revenue).toLocaleString("en-US") +
      "</strong> per month.";


    results.style.display = "block";

    recoveryPlan.style.display = "none";

    results.scrollIntoView({
      behavior: "smooth"
    });

  });


  recoveryBtn.addEventListener("click", function () {

    planContent.innerHTML = `

      <ul>

        <li>
          Respond to new leads faster.
        </li>

        <li>
          Automatically follow up with missed leads.
        </li>

        <li>
          Prioritize high-value prospects.
        </li>

        <li>
          Create a multi-step follow-up sequence.
        </li>

        <li>
          Track every lead inside your CRM.
        </li>

      </ul>

      <p style="margin-top:20px;">
        🚀 Recommended action:
        automate your lead response and follow-up process.
      </p>

    `;

    recoveryPlan.style.display = "block";

    recoveryPlan.scrollIntoView({
      behavior: "smooth"
    });

  });


  resetBtn.addEventListener("click", function () {

    form.reset();

    results.style.display = "none";

    recoveryPlan.style.display = "none";

    window.scrollTo({
      top: document.getElementById("scanner").offsetTop,
      behavior: "smooth"
    });

  });

});
