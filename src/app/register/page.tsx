"use client";

export default function Register() {


  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        // Puoi anche reindirizzare l'utente alla pagina di login o alla dashboard
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <form
        action="#"
        className="flex flex-col gap-4 rounded-3xl border-2 border-gray-700 p-5"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className=" bg-gray-700 outline-0 border-0 rounded-md p-2 text-gray-200"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className=" bg-gray-700 outline-0 border-0 rounded-md p-2 text-gray-200"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className=" bg-gray-700 outline-0 border-0 rounded-md p-2 text-gray-200"
        />
        <button
          type="submit"
          className="bg-blue-500 p-3 text-lg mt-5 rounded-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
}
