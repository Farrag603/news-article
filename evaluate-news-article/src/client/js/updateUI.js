const updateUI = (data) => {
  const textElement = document.getElementById("text");
  const agreementElement = document.getElementById("agreement");
  const subjectivityElement = document.getElementById("subjectivity");
  const confidenceElement = document.getElementById("confidence");
  const ironyElement = document.getElementById("irony");
  const scoreTagElement = document.getElementById("score_tag");

  if (textElement) textElement.textContent = `Text: ${data.text}`;
  if (agreementElement)
    agreementElement.textContent = `Agreement: ${data.agreement}`;
  if (subjectivityElement)
    subjectivityElement.textContent = `Subjectivity: ${data.subjectivity}`;
  if (confidenceElement)
    confidenceElement.textContent = `Confidence: ${data.confidence}`;
  if (ironyElement) ironyElement.textContent = `Irony: ${data.irony}`;
  if (scoreTagElement)
    scoreTagElement.textContent = `Score Tag: ${data.score_tag}`;
};

export { updateUI };
