import { useState } from "react";

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const contactData = { email, message };

    try {
      // Envoi des données du formulaire à l'API Symfony
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message.");
      }

      const data = await response.json();
      setSuccessMessage(data.success || "Message envoyé avec succès !");
      setEmail("");
      setMessage("");
    } catch (error) {
      setErrorMessage(error.message || "Une erreur est survenue.");
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col items-center justify-center py-10 mt-[0px] md:mt-[30px] pt-[60px] mr-[10px] ml-[10px]">
      <div className="bg-[#222222] p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Contact</h1>
        <p className="text-center mb-6">
          Si vous avez des questions ou des problèmes, n'hésitez pas à nous
          contacter. Nous sommes là pour vous aider !
        </p>

        {/* Message de succès */}
        {successMessage && (
          <div className="bg-green-600 text-white p-4 rounded-lg mb-6 text-center">
            {successMessage}
          </div>
        )}

        {/* Message d'erreur */}
        {errorMessage && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-6 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Votre Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#333333] border border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Champ Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Votre Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="5"
              className="w-full px-4 py-2 rounded-lg bg-[#333333] border border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Bouton Soumettre */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
