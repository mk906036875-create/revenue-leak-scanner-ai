 const scannerForm = document.getElementById("scannerForm");
const result = document.getElementById("result");

let businessData = null;

scannerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const leads = Number(document.getElementById("leads").value);
  const dealValue = Number(document.getElementById("dealValue").value);
  const responseTime = Number(
    document.getElementById("responseTime").value
  );
  const followUpRate = Number(
    document.getElementById("followUpRate").value
  );

  if (
    leads <= 0 ||
    dealValue <= 0 ||
    responseTime < 0 ||
    followUpRate < 0 ||
    followUpRate > 100
  ) {
    alert("Please enter valid business numbers.");
    return;
  }

  // ==============================
  // REVENUE RISK CALCULATION
  // ==============================

  let responseRisk = 0;

  if (responseTime <= 1) {
    responseRisk = 5;
  } else if (responseTime <= 3) {
    responseRisk = 12;
  } else if (responseTime <= 6) {
    responseRisk = 22;
  } else if (responseTime <= 12) {
    responseRisk = 30;
  } else {
    responseRisk = 38;
  }

  const followUpRisk = Math.max(
    0,
    35 - followUpRate * 0.35
  );

  let leadRisk = 5;

  if (leads >= 1000) {
    leadRisk = 15;
  } else if (leads >= 500) {
    leadRisk = 12;
  } else if (leads >= 200) {
    leadRisk = 8;
  }

  let riskScore = Math.round(
    responseRisk + followUpRisk + leadRisk
  );

  riskScore = Math.min(100, Math.max(1, riskScore));

  let riskLevel = "LOW";

  if (riskScore >= 70) {
    riskLevel = "HIGH";
  } else if (riskScore >= 40) {
    riskLevel = "MEDIUM";
  }

  // ==============================
  // OPPORTUNITY ESTIMATION
  // ==============================

  const missedFollowUps = Math.round(
    leads * ((100 - followUpRate) / 100)
  );

  const estimatedRecoveredLeads = Math.max(
    1,
    Math.round(missedFollowUps * 0.25)
  );

  const estimatedLeakage =
    estimatedRecoveredLeads * dealValue;

  const lowEstimate = Math.round(
    estimatedLeakage * 0.7
  );

  const highEstimate = Math.round(
    estimatedLeakage * 1.3
  );

  const recoveryLow = Math.round(
    lowEstimate * 0.25
  );

  const recoveryHigh = Math.round(
    highEstimate * 0.4
  );

  const formatCurrency = (amount) => {
    return "$" + amount.toLocaleString("en-US");
  };

  // ==============================
  // REVENUE LEAKS
  // ==============================

  const leaks = [];

  if (responseTime > 3) {
    leaks.push(
      "⚡ Slow lead response may be causing high-intent prospects to cool down."
    );
  }

  if (followUpRate < 80) {
    leaks.push(
      "🔁 Missed follow-ups are leaving potential opportunities unattended."
    );
  }

  if (missedFollowUps > 0) {
    leaks.push(
      `📉 Approximately ${missedFollowUps.toLocaleString(
        "en-US"
      )} leads may need additional follow-up.`
    );
  }

  if (leads >= 500) {
    leaks.push(
      "📊 High lead volume increases the risk of manual follow-up gaps."
    );
  }

  while (leaks.length < 3) {
    leaks.push(
      "🎯 Your sales process may have opportunities for additional automation."
    );
  }

  // ==============================
  // AI RECOMMENDATION
  // ==============================

  let recommendation =
    "Recover existing opportunities before increasing advertising spend.";

  if (responseTime > 6) {
    recommendation =
      "Prioritize faster lead response and trigger an immediate follow-up workflow for new inquiries.";
  } else if (followUpRate < 60) {
    recommendation =
      "Build a structured multi-step follow-up sequence so older leads do not disappear from your pipeline.";
  } else if (followUpRate < 80) {
    recommendation =
      "Automate follow-up reminders and prioritize leads with the highest potential deal value.";
  } else {
    recommendation =
      "Your follow-up process looks relatively healthy. Focus on high-value leads and response-time optimization.";
  }

  // ==============================
  // SAVE DATA FOR RECOVERY PLAN
  // ==============================

  businessData = {
    leads,
    dealValue,
    responseTime,
    followUpRate,
    riskScore,
    riskLevel,
    missedFollowUps,
    lowEstimate,
    highEstimate,
    recoveryLow,
    recoveryHigh
  };

  // ==============================
  // UPDATE RESULT
  // ==============================

  document.getElementById("riskLevel").textContent =
    riskLevel;

  document.getElementById("riskScore").textContent =
    riskScore;

  document.getElementById("leakAmount").textContent =
    `${formatCurrency(lowEstimate)} – ${formatCurrency(highEstimate)}`;

  document.getElementById("recommendationText").textContent =
    recommendation;

  const leaksList =
    document.getElementById("leaksList");

  leaksList.innerHTML = "";

  leaks.slice(0, 4).forEach((leak) => {
    const item = document.createElement("div");

    item.className = "leak-item";
    item.textContent = leak;

    leaksList.appendChild(item);
  });

  result.classList.remove("hidden");

  setTimeout(() => {
    result.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
});


// ==========================================
// GENERATE RECOVERY PLAN — V2
// ==========================================

function generateRecoveryPlan() {

  if (!businessData) {
    alert("Please run the Revenue Scan first.");
    return;
  }

  const data = businessData;

  const formatCurrency = (amount) => {
    return "$" + amount.toLocaleString("en-US");
  };

  let priorityOne = "";
  let priorityTwo = "";
  let priorityThree = "";

  // Priority #1
  if (data.responseTime > 6) {
    priorityOne =
      "Reduce lead response time. Prioritize new inquiries and high-intent prospects immediately.";
  } else if (data.followUpRate < 60) {
    priorityOne =
      "Recover missed follow-ups. Re-engage older leads that have not received a recent response.";
  } else {
    priorityOne =
      "Prioritize high-value leads using deal size and engagement signals.";
  }

  // Priority #2
  if (data.followUpRate < 80) {
    priorityTwo =
      "Create a structured 7-day follow-up sequence for leads that do not respond.";
  } else {
    priorityTwo =
      "Create automated reminders for sales representatives before opportunities go cold.";
  }

  // Priority #3
  if (data.leads >= 500) {
    priorityThree =
      "Automate lead prioritization so your sales team focuses on the highest-value opportunities first.";
  } else {
    priorityThree =
      "Track every lead's next action, last contact and opportunity value in one dashboard.";
  }

  // ==========================================
  // CREATE RECOVERY PLAN
  // ==========================================

  const recoveryHTML = `
    <div id="recoveryPlan" class="recovery-plan">

      <div class="recovery-header">

        <div>
          <div class="result-label">
            AI RECOVERY PLAN
          </div>

          <h2>
            Your Revenue Recovery Roadmap
          </h2>

          <p>
            Based on the business information you entered,
            here are the highest-priority actions to reduce
            revenue leakage.
          </p>
        </div>

        <div class="recovery-badge">
          ${data.riskLevel} RISK
        </div>

      </div>


      <div class="recovery-metrics">

        <div class="recovery-metric">
          <span>Leads / Month</span>
          <strong>
            ${data.leads.toLocaleString("en-US")}
          </strong>
        </div>

        <div class="recovery-metric">
          <span>Missed Follow-ups</span>
          <strong>
            ${data.missedFollowUps.toLocaleString("en-US")}
          </strong>
        </div>

        <div class="recovery-metric">
          <span>Potential Recovery</span>
          <strong>
            ${formatCurrency(data.recoveryLow)}
            – ${formatCurrency(data.recoveryHigh)}
          </strong>
        </div>

      </div>


      <div class="priority-list">

        <div class="priority-item">

          <div class="priority-number">
            01
          </div>

          <div>
            <h3>
              Fix the Biggest Leak
            </h3>

            <p>
              ${priorityOne}
            </p>
          </div>

        </div>


        <div class="priority-item">

          <div class="priority-number">
            02
          </div>

          <div>
            <h3>
              Build the Follow-up Engine
            </h3>

            <p>
              ${priorityTwo}
            </p>
          </div>

        </div>


        <div class="priority-item">

          <div class="priority-number">
            03
          </div>

          <div>
            <h3>
              Prioritize Revenue
            </h3>

            <p>
              ${priorityThree}
            </p>
          </div>

        </div>

      </div>


      <div class="recovery-workflow">

        <div class="workflow-title">
          RECOMMENDED WORKFLOW
        </div>

        <div class="workflow">

          <span>Lead</span>

          <b>→</b>

          <span>AI Score</span>

          <b>→</b>

          <span>Priority</span>

          <b>→</b>

          <span>Follow-up</span>

          <b>→</b>

          <span>Appointment</span>

        </div>

      </div>


      <div class="recovery-cta">

        <h3>
          Ready to recover more of your existing opportunities?
        </h3>

        <p>
          Connect your lead sources and turn this recovery plan
          into an automated workflow.
        </p>

        <button
          onclick="requestAutomationDemo()"
          class="automation-btn"
        >
          Build My Recovery System →
        </button>

      </div>

    </div>
  `;

  // Remove old plan
  const oldPlan =
    document.getElementById("recoveryPlan");

  if (oldPlan) {
    oldPlan.remove();
  }

  // Add new plan after scanner result
  result.insertAdjacentHTML(
    "afterend",
    recoveryHTML
  );

  // Scroll to plan
  setTimeout(() => {

    document
      .getElementById("recoveryPlan")
      .scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

  }, 150);
}


// ==========================================
// AUTOMATION CTA
// ==========================================

function requestAutomationDemo() {

  const message =
    "Hi, I just completed the Revenue Leak Scanner. " +
    "I'd like to discuss building a customized lead recovery system for my business.";

  const whatsappURL =
    "https://wa.me/?text=" +
    encodeURIComponent(message);

  window.open(
    whatsappURL,
    "_blank"
  );
                                     }
