# Koktajlownik 🍹

An elegant and high-performance cocktail discovery application built for the **Solvro** recruitment process. This app allows users to browse an extensive database of drinks, search, and manage a personalized list of favorites.

> [!NOTE]
> Public link to page: https://koktajlownik.netlify.app/

## ✨ Features
* 🔍 Search cocktails by name
* 🍸 Filter by alcohol type, category or glass type
* ❤️ Add / remove favorites
* 🔁 Switch view between all cocktails and your favorites
* 📑 Read all details of cocktails
* 🖥️ Fully responsive design
* 💰 Premium Bar Aesthetic

## 🛠️ Tech Stack

* **React** (TypeScript)
* **TanStack Query** (Data fetching & Caching)
* **CSS** (Custom bar-themed styling)

## 💾 API

The project uses public Solvro Cocktails API:
https://cocktails.solvro.pl/

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jakub206/Koktajlownik
    ```
2.  **Navigate to the project folder:**
    ```bash
    cd react-app
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the app locally:**
    ```bash
    npm run dev
    ```

## 📂 Project Structure

* `src/api/` – Contains `cocktailApi.ts` for handling all fetch requests to the Solvro API.
* `src/components/` – Reusable UI components like `CocktailCard.tsx`.
* `src/App.tsx` – The main application logic, including search filtering and favorites management.
* `src/types/` – TypeScript interfaces defining the `Cocktail` data structure.
