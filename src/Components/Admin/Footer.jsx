function footer() {
    return (
        <>
            <footer className="bg-gray-900 text-white py-4">
                <div className="container mx-auto px-4">
                    <div className="flex justify-end">
                        <ul className="flex space-x-4">
                            <li><a href="/dashboard" className="hover:text-gray-400">Home</a></li>
                            <li><a href="https://pcoded.gitbook.io/light-able/" target="_blank" className="hover:text-gray-400">Documentation</a></li>
                            <li><a href="https://phoenixcoded.support-hub.io/" target="_blank" className="hover:text-gray-400">Support</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default footer;
