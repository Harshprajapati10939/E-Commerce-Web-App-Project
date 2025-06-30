import React from 'react'

function NoPage() {
  return (
    <div>
      <section className="py-20 bg-white dark:bg-gray-900">
  <div className="container mx-auto px-4 text-center">
    <div className="max-w-xl mx-auto">
      <img src="/lightable/images/error.png" alt="Error 404" className="mx-auto mb-6 w-60" />
      <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Error 404 : Page Not Found</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <a
        href="/"
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all"
      >
        <i className="bx bx-home-circle mr-2 text-lg"></i>
        Back to Home
      </a>
    </div>
  </div>
</section>

    </div>
  )
}

export default NoPage
