import { Routes, Route, Navigate } from 'react-router-dom'


import Board from './pages/boards/id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/auth/Auth'


function App() {
    return (
        <Routes>
            {/* redirect route */}
            <Route path='/' element={
                // ở đây cần replace giá trị true để nó thay thế route /, có thể hiểu là route / sẽ ko còn lưu trong history Browser
                <Navigate to = '/boards/689c9a5c61e0c9cebc04379f' replace={true} />
            }
            />
            {/* board detail */}
            <Route path='/boards/:boardId' element={<Board />} />

            {/* 404 not found */}
            <Route path='*' element={<NotFound/>} />

            {/*Authentication */}
            <Route path='/login' element={<Auth/>} />
            <Route path='/register' element={<Auth/>} />

        </Routes>
    )
}

export default App