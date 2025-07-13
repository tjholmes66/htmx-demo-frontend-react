import { useState } from 'react'
import './App.css'

function App() {
    return (
        <div className="App">
            <div className="header">Header</div>
            <div className="container">
                <aside className="drawer">Drawer</aside>
                <main className="main">Content</main>
            </div>
            <div className="footer">Footer</div>
        </div>
    );
}

export default App
