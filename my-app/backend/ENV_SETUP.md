# Backend Environment Variables Setup

Copy `.env.example` to `.env` in `my-app/backend` and set the values for your local environment:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/tibetan-restaurant
PORT=5000
```

For MongoDB Atlas, use the connection string from your Atlas dashboard and replace its password locally. Keep the real connection string only in `.env`; do not put it in source code or frontend variables.

## Important

- Never commit `.env` files. This repository ignores them; the committed `.env.example` is a safe template.
- Keep database credentials and any future payment-provider secret keys in backend-only environment variables.
- Restart the backend server after changing `.env`.

## Quick setup checklist

- [ ] Copy `.env.example` to `.env`
- [ ] Set `MONGODB_URI` to your local or Atlas connection string
- [ ] Set `PORT` if you want a port other than the default
- [ ] Restart the backend server
