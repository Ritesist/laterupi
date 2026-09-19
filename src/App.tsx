import { Navigate, Route, Routes } from 'react-router-dom'
import { Create } from './pages/Create'
import { Home } from './pages/Home'
import { Receipt } from './pages/Receipt'
import { Share } from './pages/Share'
import { Status } from './pages/Status'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/promise/:id" element={<Status />} />
      <Route path="/promise/:id/share" element={<Share />} />
      <Route path="/promise/:id/receipt" element={<Receipt />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
