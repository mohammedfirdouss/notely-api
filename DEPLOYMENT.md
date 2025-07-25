# Deployment Configuration
This document provides a step-by-step guide to deploy the Notely API on Render.com, including MongoDB Atlas setup and environment variable configuration.

### 1. Repository Setup
- Ensure your code is pushed to GitHub
- Make sure all environment variables are properly configured

### 2. Render.com Configuration

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Environment Variables to set in Render:**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notely-api
JWT_SECRET=your-super-secure-jwt-secret-for-production
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### 3. MongoDB Atlas Configuration

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://mongodb.com/atlas)
   - Create a free cluster

2. **Database Setup**
   - Create a database user with read/write permissions
   - Whitelist all IP addresses (0.0.0.0/0) or specific ones
   - Get the connection string

3. **Connection String Format**
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
   ```

### 4. Deployment Steps

1. **Fork/Clone this repository**

2. **Connect to Render**
   - Go to [Render.com](https://render.com)
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"
   - Connect your repository

3. **Configure Build Settings**
   - **Name**: `notely-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Set Environment Variables**
   - Add all the environment variables listed above
   - Make sure to use your actual MongoDB Atlas connection string
   - Generate a secure JWT secret (you can use online tools)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for the build to complete
   - Your API will be available at `https://your-service-name.onrender.com`

### 5. Testing Deployment

Once deployed, test your endpoints:

```bash
# Health check
curl https://your-service-name.onrender.com/health

# Register user
curl -X POST https://your-service-name.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

## Alternative Deployment Options

### Heroku
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-connection-string
heroku config:set JWT_SECRET=your-jwt-secret
git push heroku main
```

### Railway
```bash
# Install Railway CLI
railway login
railway init
railway add
railway deploy
```

### Vercel (for serverless)
```bash
# Install Vercel CLI
vercel
# Follow the prompts
```
