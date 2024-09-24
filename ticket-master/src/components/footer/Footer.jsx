// TODO: Make footer links change based on login status

export const Footer = () => {
    return (
        <footer className="footer hidden lg:grid p-10 bg-neutral text-neutral-content max-w-[100vw] overflow-hidden">
            <nav>
                <h6 className="footer-title">Copyright</h6>
                <p>This is an academic project.<br></br>Please do not distribute or contribute</p>
            </nav>
            <nav>
                <h6 className="footer-title">Navigation</h6>
            <ul className="flex flex-wrap gap-4 max-w-64">
                <a className="link link-hover" href="/">Dashboard</a>
                <a className="link link-hover" href="/tickets">Issues</a>
                <a className="link link-hover" href="/tickets">EC</a>
                <a className="link link-hover" href="/archive">Archive</a>
                </ul>
            </nav>

        </footer>
    )
}