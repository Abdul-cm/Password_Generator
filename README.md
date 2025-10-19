# 🔐 Password Generator

A modern, secure, and user-friendly password generator application built with React, TypeScript, and Tailwind CSS. Generate strong, random passwords with customizable options to enhance your online security.

## 🌐 Live Demo

**Try it online:** [https://id-generator-app-a4mp.bolt.host/](https://id-generator-app-a4mp.bolt.host/)

## ✨ Features

- **Customizable Password Length**: Generate passwords from 8 to 64 characters
- **Character Type Options**: 
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Special symbols (!@#$%^&*)
- **Password Strength Indicator**: Real-time visual feedback on password security level
- **One-Click Copy**: Copy generated passwords to clipboard instantly
- **Security Tips**: Built-in recommendations for password best practices
- **Modern User Interface**: Clean, responsive design that works on all devices
- **Guaranteed Character Inclusion**: Ensures selected character types are included in the generated password

## 🛠️ Tech Stack

- **React 18** - User interface library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Abdul-cm/Password_Generator.git
cd Password_Generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🚀 Usage

1. **Adjust Password Length**: Use the slider to set your desired password length (8-64 characters)
2. **Select Character Types**: Check or uncheck options to include:
   - Uppercase letters
   - Lowercase letters
   - Numbers
   - Symbols
3. **Generate Password**: Click the "Generate Password" button
4. **View Strength**: See the password strength indicator (Weak, Fair, Good, Strong, Excellent)
5. **Copy Password**: Click "Copy to Clipboard" to copy your new password

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Type check with TypeScript

## 🔒 Security Features

- **Client-Side Generation**: All passwords are generated locally in your browser
- **No Data Storage**: Passwords are never stored or transmitted
- **Cryptographic Randomness**: Uses secure random number generation
- **Strength Analysis**: Multi-factor password strength calculation including:
  - Length scoring
  - Character variety
  - Unique character count

## 🎨 Password Strength Levels

| Level | Score | Color | Description |
|-------|-------|-------|-------------|
| Weak | < 30 | Red | Consider adding more character types or length |
| Fair | 30-49 | Orange | Acceptable but could be stronger |
| Good | 50-69 | Yellow | Good password security |
| Strong | 70-84 | Green | Strong password security |
| Excellent | 85+ | Emerald | Excellent password security |

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Abdul-cm**

- GitHub: [@Abdul-cm](https://github.com/Abdul-cm)
- Project Link: [https://github.com/Abdul-cm/Password_Generator](https://github.com/Abdul-cm/Password_Generator)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Built with [Vite](https://vitejs.dev/)

---

**Stay secure! 🔐** Remember to use unique passwords for each account and enable two-factor authentication whenever possible.

