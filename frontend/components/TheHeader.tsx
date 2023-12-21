
import Container from "./Container"

import Link from "next/link"

const TheHeader = () => {
    return (
        <header className="bg-slate-700 mb-5">
            <Container>
                <nav className="flex justify-between items-center">
                    <Link href="/" className="text-white">Блюдо на бис</Link>3123131321
                    <ul className="flex gap-10 py-5">
                        <li>
                            <Link href="/signup" className="text-white">Регистрация</Link>
                        </li>
                        <li>
                            <Link href="/login" className="text-white">Логин</Link>
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default TheHeader