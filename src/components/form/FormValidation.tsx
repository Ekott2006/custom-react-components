import React, { FormEvent, useState } from "react";

const EmailForm = () => {
  const [emails, setEmails] = useState([""]); // Start with one empty email field
  const [isTouched, setIsTouched] = useState(false); // Track if the user has interacted
  const [error, setError] = useState(""); // Store error message

  // Handle input change
  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);

    // Validate after user interaction
    if (!isTouched) setIsTouched(true);
    validateEmails(newEmails);
  };

  // Add a new email field
  const addEmailField = () => {
    setEmails([...emails, ""]);
  };

  // Validate emails
  const validateEmails = (emails: string[]) => {
    const hasValidEmail = emails.some((email) => email.trim() !== "");
    if (!hasValidEmail) {
      setError("At least one email must be provided.");
    } else {
      setError("");
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) return; // Prevent submission if there's an error
    alert("Form submitted successfully!");
  };

  // Disable button if no valid email or form hasn't been touched
  const isButtonDisabled = !isTouched || error;

  return (
    <form onSubmit={handleSubmit} className="mx-5">
      <div>
        {emails.map((email, index) => (
          <div key={index}>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              placeholder="Enter email"
               className="border p-1 rounded "
            />
          </div>
        ))}
        <button type="button" onClick={addEmailField}>
          Add Another Email
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={isButtonDisabled }>
        Submit
      </button>
    </form>
  );
};

export default EmailForm;