# SmartRecruit Frontend

### **Backend Repository:** [SmartRecruit Backend](https://github.com/NorpajSucces/backend-cv-screening)

> **SmartRecruit Frontend** is the client-side interface for a modern applicant tracking system. Built with React + Vite, this project provides an extremely smooth user experience for candidates during the *Apply* process, while offering a protected HR Admin Dashboard equipped with a *Real-time Polling* feature for AI evaluation status updates.

## Team 5 Members

| Name | Role | Social Links |
| :--- | :--- | :--- |
| **Zhafran Pradistyatama Kuncoro** | Project Manager + Backend | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/zhafran-kuncoro/) [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/NorpajSucces) |
| **Yusril Ihza Farhan Wijaya** | Backend | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yusril-wijaya/) [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/YusrilIhzaFarhanWijaya) |
| **Lucky Vera Oktavia** | Backend | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luckyoktavia/) [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/luckyokta) |
| **Luthfiana Zahra Firdausi** | Frontend | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luthfiana-zahra-99390a193/) [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/zahrafir) |
| **Aulia Puspa** | Frontend | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aulia-puspa-2a8456279/) [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/auliapuspa) |
| **Valentine Andreas Manurung** | Frontend | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/valentine-andreas-manurung-177282176/) [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/ghoskull) |

---

## 1. Project Overview
SmartRecruit provides two unified systems:
1. **Public Side (Candidates):** A modern, no-login IT Solution mock company profile displaying Job Boards. Applicants can search, filter, and upload PDF CVs seamlessly.
2. **HR Dashboard:** A JWT-protected application allowing HR personnel to manage datasets, review **AI-Screening CV results**, make split-second Accept/Reject decisions, and analyze overall recruitment statistics through interactive charts.

## 2. Frontend Architecture
The frontend is heavily designed around component reusability and global state logic separation.

### Data Fetching Strategy (Progressive Polling)
Since the backend processes AI tasks asynchronously, we intentionally avoid WebSockets to keep the scope scalable. Instead, the frontend implements a **Polling Custom Hook (`usePolling.js`)**.
- The frontend requests the candidates endpoint every 5-10 seconds.
- The UI gracefully updates itself when candidate statuses change from `pending` -> `processed`.
- **Non-Blocking UI:** When HR clicks **"Reject"**, the UI updates instantly and routes the user away, while the backend works continuously on the AI feedback email generation.

### Routing Map (React Router v6)
| URL Path | Component | Access Type | Note |
|---|---|---|---|
| `/` | `LandingPage.jsx` | Public | Homepage showcasing Open Positions |
| `/jobs/:id/apply` | `ApplyForm.jsx` | Public | Multipart strict form for CV uploading |
| `/hr/login`| `Login.jsx` | Public | JWT Auth gateway |
| `/hr/dashboard` | `Dashboard.jsx` | Private | Recharts Data Visualization |
| `/hr/candidates/:id`| `CVSummaryDetail.jsx`| Private | Detailed Breakdown of AI Scoring metrics |

### Redux State Tree Map
Data manipulation flows predictably from the backend straight to the UI components via Redux Slices:
- **`authSlice`**: Stores `{ user, token, isAuthenticated }`
- **`hrJobSlice`**: HR CRUD table properties and states.
- **`jobSlice`**: Publicly exposed jobs for candidate consumption.
- **`candidateSlice`**: Deep candidate pool analytics and applicant tracking logic.
- **`dashboardSlice`**: Chart datasets aggregate metrics.

## 3. Technology Stack

| Role | Technology | Description |
| :--- | :--- | :--- |
| **UI Framework** | React + Vite | Fast frontend build tools |
| **Routing** | React Router DOM v6 | Application navigation |
| **State Management** | Redux Toolkit (Slices & AsyncThunks) | Global data integration |
| **Styling** | Styled Components | CSS-in-JS architecture |
| **Form Management** | React Hook Form | Strict client-side validation |
| **Data Visualization** | Recharts | Analytics dashboards |
| **HTTP Client** | Axios | Backend REST API communication |

## 4. Directory Hierarchy
```text
frontend-cv-screening/
├── src/
│   ├── assets/         # Graphic resources (Icons, Images)
│   ├── components/     # Reusable Elements
│   │   ├── common/     # Sidebar, Header, Modal, Cards
│   │   └── hr/         # HR-specific evaluation components
│   ├── pages/          
│   │   ├── public/     # Job list board, Public CV Application Form
│   │   └── hr/         # Analytics Dashboard, Candidate Management Panel
│   ├── services/       # axiosInstance configurations
│   ├── store/          # Redux slices (authSlice, jobSlice, candidateSlice)
│   └── utils/          # Data formatting utilities
├── .env                # Backend Base URL
├── package.json        
└── vite.config.js      # Module Bundler Configuration
```

## 5. How to Use the System

### For Applicants (Candidates)
1. **Browse Jobs:** Navigate to the main Landing Page (`/`) to browse currently open job positions.
2. **Apply:** Click on a job to view the description and requirements, then click **"Apply"**.
3. **Submit Form:** Fill out your Name, Email, Phone Number, and upload your CV (must be in PDF format).
4. **Processing:** Submit your application. The system will handle your CV, extract the text, and score your profile against the job requirements asynchronously.

### For HR Administrator
1. **Login:** Navigate to `/hr/login` and log in using the administrator credentials. *(Note: These credentials are created by running `node seed.js` in the backend).*
2. **Dashboard Overview:** View live recruitment analytics and general statistics on the Dashboard (`/hr/dashboard`).
3. **Manage Jobs:** Navigate to "Job Postings" to create, update, delete, or toggle the status of job vacancies.
4. **Evaluate Candidates:** Navigate to "Candidates" to view incoming applications. 
   - The application utilizes *progressive polling*, meaning you will see the candidate's status automatically change from `pending` to `processed` once the AI finishes the screening.
5. **AI Insights:** Click "Detail" on a `processed` candidate to review the AI-Screening results, which include the Candidate's Score (0-100), key Strengths, and critical Weaknesses.
6. **Decision Making:** Make a swift decision by clicking **"Accept"** or **"Reject"**. 
   - *Accepting* sends an automated confirmation email. 
   - *Rejecting* triggers the AI to write constructive, personalized feedback, which is then emailed to the candidate in the background.

## 6. Setup & Local Development

**1. Clone Repo & Install Modules:**
```bash
git clone https://github.com/NorpajSucces/frontend-cv-screening.git
cd frontend-cv-screening
npm install
```

**2. Configure Main API URL (`.env`):**
Create an `.env` file in the root directory and map it to your local node.js API instance:
```env
VITE_API_URL=http://localhost:5000/api
```
*(Note: Because this is a Vite app, frontend environment variables must be strictly prefixed with `VITE_`)*

**3. Run the App in Development Mode:**
```bash
npm run dev
```

Visit `http://localhost:5173` on your browser to start exploring.

---
*Crafted by Team 5, KADA Batch 3*
