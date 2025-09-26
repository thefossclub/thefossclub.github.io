# The FOSS Club Website

This is the official website for The FOSS Club at Delhi Technical Campus, a community focused on Free and Open Source Software.

## 🚀 GitHub Pages Deployment

This website is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Deployment Process

1. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the site and deploys it to GitHub Pages.
2. The site is built as a static export using Next.js's export feature.
3. The output in the `out` directory is deployed to GitHub Pages.

### Manual Deployment

If you need to deploy manually:

1. Clone the repository
   ```bash
   git clone https://github.com/thefossclub/thefossclub.github.io.git
   cd thefossclub.github.io
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Build the site
   ```bash
   npm run build
   ```

4. The static site will be generated in the `out` directory

## 🧑‍💻 Local Development

To develop this website locally:

1. Clone the repository
   ```bash
   git clone https://github.com/thefossclub/thefossclub.github.io.git
   cd thefossclub.github.io
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Backend API (Optional)

This project includes an optional NestJS backend API for modular content delivery, located in the `backend/` directory.

### Backend Features
- RESTful APIs for content management
- Modular architecture with NestJS
- Type-based content organization
- CORS support for frontend integration

### Running the Backend

1. Navigate to the backend directory
   ```bash
   cd backend
   ```

2. Install backend dependencies
   ```bash
   npm install
   ```

3. Start the backend server
   ```bash
   npm run start:dev
   ```

4. The backend API will be available at [http://localhost:3001](http://localhost:3001)

For detailed backend documentation, see [backend/README.md](./backend/README.md)

## 📄 License

This project is open source. 